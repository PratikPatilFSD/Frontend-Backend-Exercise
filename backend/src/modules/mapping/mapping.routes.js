// ================= IMPORTS =================
const express = require("express");
const router = express.Router();

// Controller functions
const {
  createMapping,
  getMappings
} = require("./mapping.controller");


// ================= ROUTES =================

// ➕ CREATE MAPPING
router.post("/", createMapping);

// 📄 GET ALL MAPPINGS
router.get("/", getMappings);


// ================= EXPORT =================
module.exports = router;