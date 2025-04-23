const db = require("../db");

const parseIdParam = (idParam) => {
  let id = idParam;

  // Check if it's a stringified JSON object
  if (typeof id === "string" && id.includes("{")) {
    try {
      const parsedObj = JSON.parse(id);
      id = parsedObj.idPhieuNhap;
    } catch (e) {
      // If parsing fails, continue with the original value
    }
  }

  return parseInt(id, 10);
};

// Get all stock imports
const getAllStockImports = async (req, res) => {
  try {
    const stockImports = await db("StockImport")
      .join(
        "Contractor",
        "StockImport.idContractor",
        "=",
        "Contractor.idContractor"
      )
      .select("StockImport.*", "Contractor.field as tenNhaCungCap");

    // Format numeric values
    const formattedImports = stockImports.map((item) => ({
      ...item,
      tongTien: Number(item.tongTien),
    }));

    res.json(formattedImports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get stock import by ID
const getStockImportById = async (req, res) => {
  try {
    // Parse the ID properly
    const importId = parseIdParam(req.params.id);

    if (isNaN(importId)) {
      return res.status(400).json({ error: "Invalid stock import ID format" });
    }

    const stockImport = await db("StockImport")
      .join(
        "Contractor",
        "StockImport.idContractor",
        "=",
        "Contractor.idContractor"
      )
      .where({ "StockImport.idPhieuNhap": importId })
      .select("StockImport.*", "Contractor.field as tenNhaCungCap")
      .first();

    if (!stockImport) {
      return res.status(404).json({ error: "Stock import not found" });
    }

    // Convert decimal to number
    stockImport.tongTien = Number(stockImport.tongTien);

    res.json(stockImport);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createStockImport = async (req, res) => {
  const trx = await db.transaction();

  try {
    // Extract only the needed fields, ignore idPhieuNhap from client
    const { idContractor, ngayNhap, tongTien } = req.body;

    if (!idContractor || !ngayNhap || tongTien === undefined) {
      return res
        .status(400)
        .json({ error: "Contractor, date and total amount are required" });
    }

    // First, ensure the sequence is properly set to the max value + 1
    const sequenceInfo = await trx.raw(`
      SELECT pg_get_serial_sequence('"StockImport"', 'idPhieuNhap') as sequence_name;
    `);

    const sequenceName = sequenceInfo.rows[0]?.sequence_name;

    if (sequenceName) {
      await trx.raw(`
        SELECT setval('${sequenceName}', 
                     (SELECT COALESCE(MAX("idPhieuNhap"), 0) FROM "StockImport"), 
                     true);
      `);
    }

    // Get the next value we should use
    const maxId = await trx("StockImport").max("idPhieuNhap as maxId").first();
    const nextId = (maxId.maxId || 0) + 1;

    // Insert with explicit ID to avoid sequence issues
    const result = await trx("StockImport")
      .insert({
        idPhieuNhap: nextId,
        idContractor,
        ngayNhap,
        tongTien,
      })
      .returning("idPhieuNhap");

    // Fix: Properly extract the ID whether it's an object or plain value
    const idPhieuNhap =
      typeof result[0] === "object" ? result[0].idPhieuNhap : result[0];

    // Use the extracted numeric ID
    const newStockImport = await trx("StockImport")
      .where({ idPhieuNhap: idPhieuNhap })
      .first();

    await trx.commit();
    res.status(201).json(newStockImport);
  } catch (err) {
    await trx.rollback();
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
};
// Update stock import
const updateStockImport = async (req, res) => {
  try {
    const { idContractor, ngayNhap, tongTien } = req.body;

    // Parse the ID properly
    const importId = parseIdParam(req.params.id);

    if (isNaN(importId)) {
      return res.status(400).json({ error: "Invalid stock import ID format" });
    }

    const updated = await db("StockImport")
      .where({ idPhieuNhap: importId })
      .update({
        idContractor,
        ngayNhap,
        tongTien,
      });

    if (!updated) {
      return res.status(404).json({ error: "Stock import not found" });
    }

    // Fixed: use importId instead of req.importId which doesn't exist
    const stockImport = await db("StockImport")
      .where({ idPhieuNhap: importId })
      .first();

    res.json(stockImport);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Delete stock import
const deleteStockImport = async (req, res) => {
  try {
    const importId = parseIdParam(req.params.id);

    if (isNaN(importId)) {
      return res.status(400).json({ error: "Invalid stock import ID format" });
    }

    // Added: define 'deleted' variable
    const deleted = await db("StockImport")
      .where({ idPhieuNhap: importId })
      .del();

    if (!deleted) {
      return res.status(404).json({ error: "Stock import not found" });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const resetStockImportSequence = async (req, res) => {
  try {
    // Find the sequence name for the StockImport table
    const sequenceInfo = await db.raw(`
      SELECT pg_get_serial_sequence('"StockImport"', 'idPhieuNhap') as sequence_name;
    `);

    const sequenceName = sequenceInfo.rows[0]?.sequence_name;

    if (sequenceName) {
      // Important: Set false as the third parameter to start with MAX+1
      // The true parameter was making it use MAX as the current value
      await db.raw(`
        SELECT setval('${sequenceName}', 
                     (SELECT COALESCE(MAX("idPhieuNhap"), 0) FROM "StockImport"), 
                     false);
      `);

      // Get the current sequence value after reset to verify
      const currentVal = await db.raw(
        `SELECT currval('${sequenceName}') as current_value;`
      );

      res.status(200).json({
        message: "Stock Import sequence reset successfully",
        nextValue: parseInt(currentVal.rows[0].current_value) + 1,
      });
    } else {
      // Alternative approach for when sequence name can't be found
      await db.raw(`
        DO $$
        BEGIN
          ALTER TABLE "StockImport" ALTER COLUMN "idPhieuNhap" RESTART WITH 
            (SELECT COALESCE(MAX("idPhieuNhap"), 0) + 1 FROM "StockImport");
        EXCEPTION WHEN OTHERS THEN
          RAISE NOTICE 'Could not reset sequence: %', SQLERRM;
        END $$;
      `);

      res
        .status(200)
        .json({ message: "Stock Import ID counter reset successfully" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
};

module.exports = {
  getAllStockImports,
  getStockImportById,
  createStockImport,
  updateStockImport,
  deleteStockImport,
  resetStockImportSequence,
};
