// ================= IMPORT SERVICE =================
const userService = require("./user.service");


// ================= CREATE USER =================
const createUser = async (req, res) => {
  try {
    // Call service to create user
    const data = await userService.createUser(req.body);

    // Success response
    res.json({
      success: true,
      message: "User created successfully",
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


// ================= GET USERS =================
const getUsers = async (req, res) => {
  try {
    // Call service to fetch users
    const data = await userService.getUsers();

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
module.exports = { createUser, getUsers };