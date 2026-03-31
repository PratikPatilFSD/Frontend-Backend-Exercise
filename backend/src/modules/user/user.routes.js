// ================= IMPORTS =================
const express = require("express");
const router = express.Router();

// Controller functions
const { createUser, getUsers } = require("./user.controller");


// ================= ROUTES =================

// ➕ CREATE USER
router.post("/", createUser);

// 📄 GET ALL USERS
router.get("/", getUsers);


// ================= EXPORT =================
module.exports = router;