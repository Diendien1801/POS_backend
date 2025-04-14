const db = require("../db");

// Get all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await db("Customer").select("*");
    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get customer by ID
const getCustomerById = async (req, res) => {
  try {
    const customer = await db("Customer")
      .where({ idCustomer: req.params.id })
      .first();

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createCustomer = async (req, res) => {
  try {
    const { hoTen, SDT, diemThuong = 0 } = req.body;

    if (!hoTen || !SDT) {
      return res
        .status(400)
        .json({ error: "Name and phone number are required" });
    }

    // Tìm cấp độ phù hợp theo điểm thưởng
    let idLevel = null;
    const matchedLevel = await db("MemberLevel")
      .where("diemCanDat", "<=", diemThuong)
      .orderBy("diemCanDat", "desc")
      .first();

    if (matchedLevel) {
      idLevel = matchedLevel.idLevel;
    }

    // Lấy id mới
    const maxIdResult = await db("Customer").max("idCustomer as maxId").first();
    const nextId = (maxIdResult?.maxId || 0) + 1;

    // Thêm khách hàng mới
    await db("Customer").insert({
      idCustomer: nextId,
      hoTen,
      SDT,
      diemThuong,
      idLevel,
    });

    const newCustomer = await db("Customer")
      .where({ idCustomer: nextId })
      .first();

    res.status(201).json(newCustomer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Update customer
const updateCustomer = async (req, res) => {
  try {
    const { hoTen, SDT, diemThuong } = req.body;

    // Tự động xác định idLevel theo diemThuong
    let idLevel = null;
    if (typeof diemThuong === "number") {
      const matchedLevel = await db("MemberLevel")
        .where("diemCanDat", "<=", diemThuong)
        .orderBy("diemCanDat", "desc")
        .first();

      if (matchedLevel) {
        idLevel = matchedLevel.idLevel;
      }
    }

    const updated = await db("Customer")
      .where({ idCustomer: req.params.id })
      .update({
        hoTen,
        SDT,
        diemThuong,
        idLevel,
      });

    if (!updated) {
      return res.status(404).json({ error: "Customer not found" });
    }

    const customer = await db("Customer")
      .where({ idCustomer: req.params.id })
      .first();

    res.json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Delete customer
const deleteCustomer = async (req, res) => {
  try {
    const deleted = await db("Customer")
      .where({ idCustomer: req.params.id })
      .del();

    if (!deleted) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Export all controller functions at the end
module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
