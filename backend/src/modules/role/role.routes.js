// ================= IMPORTS =================
const express = require("express");
const router = express.Router();

// Controller functions
const { createRole, getRoles } = require("./role.controller");


// ================= ROUTES =================

// ➕ CREATE ROLE
router.post("/", createRole);

// 📄 GET ALL ROLES
router.get("/", getRoles);


// ================= EXPORT =================
module.exports = router;