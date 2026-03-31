// ================= IMPORT SERVICE =================
const roleService = require("./role.service");


// ================= CREATE ROLE =================
const createRole = async (req, res) => {
  try {
    // Call service to create role
    const data = await roleService.createRole(req.body);

    // Success response
    res.json({
      success: true,
      message: "Role created successfully",
      data
    });

  } catch (error) {
    // Error response
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// ================= GET ROLES =================
const getRoles = async (req, res) => {
  try {
    // Call service to fetch roles
    const data = await roleService.getRoles();

    // Success response
    res.json({
      success: true,
      data
    });

  } catch (error) {
    // Error response
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// ================= EXPORT =================
module.exports = { createRole, getRoles };