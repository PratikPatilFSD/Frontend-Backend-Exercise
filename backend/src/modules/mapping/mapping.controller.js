// ================= IMPORT SERVICE =================
const mappingService = require("./mapping.service");


// ================= CREATE MAPPING =================
const createMapping = async (req, res) => {
  try {
    // Call service to create mapping
    const data = await mappingService.createMapping(req.body);

    // Success response
    res.json({
      success: true,
      message: "Mapping created successfully",
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


// ================= GET MAPPINGS =================
const getMappings = async (req, res) => {
  try {
    // Call service to fetch mappings
    const data = await mappingService.getMappings();

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
module.exports = { createMapping, getMappings };