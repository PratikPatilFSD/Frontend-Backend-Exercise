// ================= IMPORTS =================
const express = require("express");
const router = express.Router();

// Controller functions
const { createInstitute, getInstitutes } = require("./institute.controller");


// ================= ROUTES =================

// ➕ CREATE INSTITUTE
router.post("/", createInstitute);

// 📄 GET ALL INSTITUTES
router.get("/", getInstitutes);


// ================= EXPORT =================
module.exports = router;