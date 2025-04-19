const db = require("../db");

const getAllProduct = async (req, res) => {
  try {
    // Pagination parameters (still used for fetching)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    
    // Optional sorting
    const sortBy = req.query.sortBy || 'idLaptop';
    const sortOrder = req.query.sortOrder === 'desc' ? 'desc' : 'asc';
    
    // Get products for current page (keep pagination for database query)
    const products = await db("Laptop")
      .select("*")
      .orderBy(sortBy, sortOrder)
      .limit(limit)
      .offset(offset);

    // Format the products
    const formattedProducts = products.map((product) => ({
      ...product,
      gia: product.gia ? Number(product.gia) : product.gia,
    }));

    // Return just the products array like before
    res.json(formattedProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProductById = async (req, res) => {
  try {
    // Extract the actual ID value from the parameter
    let productId = req.params.id;

    // Check if it's a stringified JSON object
    if (typeof productId === "string" && productId.includes("{")) {
      try {
        const parsedObj = JSON.parse(productId);
        productId = parsedObj.idLaptop;
      } catch (e) {
        // If parsing fails, continue with the original value
      }
    }

    // Ensure it's treated as a number
    productId = parseInt(productId, 10);

    if (isNaN(productId)) {
      return res.status(400).json({ error: "Invalid product ID format" });
    }

    const product = await db("Laptop").where({ idLaptop: productId }).first();

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      tenLaptop,
      gia,
      idNhaSanXuat,
      CPU,
      NPU,
      cardDoHoa,
      RAM,
      oCung,
      congKetNoi,
      ketNoiKhongDay,
      banPhim,
      camera,
      pin,
      nguon,
      thongSoVatLy,
      heDieuHanh,
      baoMat,
    } = req.body;

    if (!tenLaptop || !gia || !idNhaSanXuat) {
      return res
        .status(400)
        .json({ error: "Name, price and manufacturer ID are required" });
    }

    const [idResult] = await db("Laptop")
      .insert({
        tenLaptop,
        gia,
        idNhaSanXuat,
        CPU,
        NPU,
        cardDoHoa,
        RAM,
        oCung,
        congKetNoi,
        ketNoiKhongDay,
        banPhim,
        camera,
        pin,
        nguon,
        thongSoVatLy,
        heDieuHanh,
        baoMat,
      })
      .returning("idLaptop");

    const productId = typeof idResult === "object" ? idResult.idLaptop : idResult;

    const newProduct = await db("Laptop").where({ idLaptop: productId }).first();

    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      tenLaptop,
      gia,
      idNhaSanXuat,
      CPU,
      NPU,
      cardDoHoa,
      RAM,
      oCung,
      congKetNoi,
      ketNoiKhongDay,
      banPhim,
      camera,
      pin,
      nguon,
      thongSoVatLy,
      heDieuHanh,
      baoMat,
    } = req.body;

    const productId = parseIdParam(req.params.id);
    if (isNaN(productId)) {
      return res.status(400).json({ error: "Invalid product ID format" });
    }

    const updatedProduct = await db("Laptop")
      .where({ idLaptop: productId })
      .update({
        tenLaptop,
        gia,
        idNhaSanXuat,
        CPU,
        NPU,
        cardDoHoa,
        RAM,
        oCung,
        congKetNoi,
        ketNoiKhongDay,
        banPhim,
        camera,
        pin,
        nguon,
        thongSoVatLy,
        heDieuHanh,
        baoMat,
      });

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = parseIdParam(req.params.id);

    if (isNaN(productId)) {
      return res.status(400).json({ error: "Invalid product ID format" });
    }

    const deletedProduct = await db("Laptop")
      .where({ idLaptop: productId })
      .del();

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const resetSequence = async (req, res) => {
  try {
    // First, find the actual sequence name for the Laptop table's idLaptop column
    const sequenceInfo = await db.raw(`
        SELECT pg_get_serial_sequence('"Laptop"', 'idLaptop') as sequence_name;
      `);

    const sequenceName = sequenceInfo.rows[0]?.sequence_name;

    if (sequenceName) {
      // Reset the sequence using the found name
      await db.raw(`
          SELECT setval('${sequenceName}', (SELECT COALESCE(MAX("idLaptop"), 0) FROM "Laptop"), true);
        `);
      res.status(200).json({ message: "Sequence reset successfully" });
    } else {
      // Alternative approach if no sequence is found
      console.log(
        "No sequence found for Laptop.idLaptop, trying alternative method"
      );

      // Try to use ALTER SEQUENCE if supported by your PostgreSQL version
      await db.raw(`
          DO $$
          BEGIN
            ALTER TABLE "Laptop" ALTER COLUMN "idLaptop" RESTART WITH 
              (SELECT COALESCE(MAX("idLaptop"), 0) + 1 FROM "Laptop");
          EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE 'Could not reset sequence: %', SQLERRM;
          END $$;
        `);

      res.status(200).json({ message: "ID counter reset successfully" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
};

// Helper function to parse the ID parameter
const parseIdParam = (idParam) => {
  let id = idParam;
  if (typeof id === "string" && id.includes("{")) {
    try {
      const parsedObj = JSON.parse(id);
      id = parsedObj.idLaptop;
    } catch (e) {}
  }
  return parseInt(id, 10);
};

// Export all controller functions at the end
module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  resetSequence,
};
