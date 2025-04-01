const db = require("../db");

// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await db("Employee")
      .leftJoin("Account", "Employee.idAccount", "=", "Account.idAccount")
      .select("Employee.*", "Account.username", "Account.role");

    // Format numeric values
    const formattedEmployees = employees.map((employee) => ({
      ...employee,
      salary: employee.salary ? Number(employee.salary) : null,
    }));

    res.json(formattedEmployees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const employee = await db("Employee")
      .leftJoin("Account", "Employee.idAccount", "=", "Account.idAccount")
      .where({ "Employee.idNhanVien": req.params.id })
      .select("Employee.*", "Account.username", "Account.role")
      .first();

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Format numeric values
    if (employee.salary) {
      employee.salary = Number(employee.salary);
    }

    res.json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create new employee
const createEmployee = async (req, res) => {
  const trx = await db.transaction();

  try {
    // Extract fields from request body
    const {
      idNhanVien, // Extract but don't use this
      tenNhanVien,
      tenVaTro,
      CCCD,
      DOB,
      diaChi,
      gioiTinh,
      sdt,
      email,
      salary,
      idAccount,
      hinhAnh,
    } = req.body;

    // Validate required fields
    if (!tenNhanVien || !DOB || !sdt || !email) {
      await trx.rollback();
      return res.status(400).json({
        error: "Name, date of birth, phone number, and email are required",
      });
    }

    // Create an object with only the fields we want to insert
    const employeeData = {
      tenNhanVien,
      tenVaTro,
      CCCD,
      DOB,
      diaChi,
      gioiTinh,
      sdt,
      email,
      salary,
      idAccount,
      hinhAnh: hinhAnh || `employee_${Date.now()}.jpg`,
    };

    // Now insert only the fields we want
    const result = await trx("Employee")
      .insert(employeeData)
      .returning("idNhanVien");

    // Extract the ID value correctly
    const id = result[0].idNhanVien || result[0];

    await trx.commit();

    const newEmployee = await db("Employee")
      .leftJoin("Account", "Employee.idAccount", "=", "Account.idAccount")
      .where({ "Employee.idNhanVien": id })
      .select("Employee.*", "Account.username", "Account.role")
      .first();

    res.status(201).json(newEmployee);
  } catch (err) {
    await trx.rollback();
    console.error(err);

    if (err.code === "23505") {
      if (err.constraint === "Employee_pkey") {
        return res.status(409).json({ error: "Employee ID already exists" });
      } else if (err.constraint.includes("CCCD")) {
        return res
          .status(409)
          .json({ error: "Employee ID number (CCCD) already exists" });
      } else if (err.constraint.includes("sdt")) {
        return res.status(409).json({ error: "Phone number already exists" });
      } else if (err.constraint.includes("email")) {
        return res.status(409).json({ error: "Email already exists" });
      }
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

// Update employee
const updateEmployee = async (req, res) => {
  const trx = await db.transaction();

  try {
    const {
      tenNhanVien,
      tenVaTro,
      CCCD,
      DOB,
      diaChi,
      gioiTinh,
      sdt,
      email,
      salary,
      idAccount,
      hinhAnh,
    } = req.body;

    // Basic validation
    if (tenNhanVien === "" || DOB === "" || sdt === "" || email === "") {
      await trx.rollback();
      return res.status(400).json({
        error: "Name, date of birth, phone number, and email cannot be empty",
      });
    }

    // Update with all fields
    const updated = await trx("Employee")
      .where({ idNhanVien: req.params.id })
      .update({
        tenNhanVien,
        tenVaTro,
        CCCD,
        DOB,
        diaChi,
        gioiTinh,
        sdt,
        email,
        salary,
        idAccount,
        hinhAnh,
      });

    if (!updated) {
      await trx.rollback();
      return res.status(404).json({ error: "Employee not found" });
    }

    await trx.commit();

    const employee = await db("Employee")
      .leftJoin("Account", "Employee.idAccount", "=", "Account.idAccount")
      .where({ "Employee.idNhanVien": req.params.id })
      .select("Employee.*", "Account.username", "Account.role")
      .first();

    res.json(employee);
  } catch (err) {
    await trx.rollback();
    console.error(err);

    if (err.code === "23505") {
      if (err.constraint.includes("CCCD")) {
        return res
          .status(409)
          .json({ error: "Employee ID number (CCCD) already exists" });
      } else if (err.constraint.includes("sdt")) {
        return res.status(409).json({ error: "Phone number already exists" });
      } else if (err.constraint.includes("email")) {
        return res.status(409).json({ error: "Email already exists" });
      }
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete employee
const deleteEmployee = async (req, res) => {
  try {
    const deleted = await db("Employee")
      .where({ idNhanVien: req.params.id })
      .del();

    if (!deleted) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
