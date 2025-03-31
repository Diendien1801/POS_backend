const db = require("../db");
// Get all manufacturers
const getAllManufacturer = async (req, res) => {
  try {
    const customers = await db("Manufacturer").select("*");
    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};



// Export all controller functions at the end
module.exports = {
  getAllManufacturer,
};