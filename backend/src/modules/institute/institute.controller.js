// ================= IMPORT SERVICE =================
const instituteService = require("./institute.service");


// ================= CREATE INSTITUTE =================
const createInstitute = async (req, res) => {
  try {
    // Call service to create institute
    const data = await instituteService.createInstitute(req.body);

    // Success response
    res.json({
      success: true,
      message: "Institute created successfully",
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


// ================= GET INSTITUTES =================
const getInstitutes = async (req, res) => {
  try {
    // Call service to fetch institutes
    const data = await instituteService.getInstitutes();

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
module.exports = { createInstitute, getInstitutes };