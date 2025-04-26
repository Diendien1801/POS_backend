//// filepath: d:\POS_backend\controller\inventory.js
const db = require("../db");

// Get all inventory items
const getAllInventory = async (req, res) => {
  try {
    // Check if pagination is requested
    const usePagination = req.query.paginated === 'true';
    
    if (usePagination) {
      // Paginated version
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      // Get paginated results
      const items = await db("Inventory")
        .limit(limit)
        .offset(offset);
      
      // Get total count for metadata
      const countResult = await db("Inventory").count('* as total').first();
      const total = parseInt(countResult.total);
      
      // Calculate pagination metadata
      const totalPages = Math.ceil(total / limit);
      const hasNext = page < totalPages;
      const hasPrev = page > 1;

      return res.json({
        data: items,
        pagination: {
          total,
          page,
          limit,
          totalPages,
          hasNext,
          hasPrev
        }
      });
    }
    
    // Original format (no pagination)
    const items = await db("Inventory");
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all items in a specific warehouse by idKho with pagination
const getInventoryByWarehouse = async (req, res) => {
  try {
    // Extract pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Get paginated results
    const items = await db("Inventory")
      .where({ idKho: req.params.id })
      .limit(limit)
      .offset(offset);

    if (!items || items.length === 0) {
      return res
        .status(404)
        .json({ error: "No inventory found for this warehouse" });
    }
    
    // Get total count for metadata
    const countResult = await db("Inventory")
      .where({ idKho: req.params.id })
      .count('* as total')
      .first();
    const total = parseInt(countResult.total);
    
    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    res.json({
      data: items,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNext,
        hasPrev
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create new inventory item
const createInventory = async (req, res) => {
  try {
    // Insert without returning an auto-increment column
    await db("Inventory").insert(req.body);
    res.status(201).json({ message: "Inventory created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update existing inventory item
// Adjust these queries if you use a composite PK of (idKho, idLaptop)
const updateInventory = async (req, res) => {
  try {
    const count = await db("Inventory")
      .where({ idLaptop: req.params.id }) // or change to match your PK
      .update(req.body);

    if (!count) {
      return res.status(404).json({ error: "Inventory item not found" });
    }
    res.json({ message: "Inventory updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete inventory item
// Adjust these queries if you use a composite PK of (idKho, idLaptop)
const deleteInventory = async (req, res) => {
  try {
    const count = await db("Inventory")
      .where({ idLaptop: req.params.id }) // or change to match your PK
      .del();

    if (!count) {
      return res.status(404).json({ error: "Inventory item not found" });
    }
    res.json({ message: "Inventory deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllInventory,
  getInventoryByWarehouse,
  createInventory,
  updateInventory,
  deleteInventory,
};
