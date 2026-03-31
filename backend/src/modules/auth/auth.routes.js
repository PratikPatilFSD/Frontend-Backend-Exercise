// ================= IMPORTS =================
const express = require("express");
const router = express.Router();

// Middleware
const { verifyToken } = require("../../middlewares/auth.middleware");

// Controllers
const {
  login,
  getMyInstitutesRoles,
  selectContext,
  getCurrentUser,
  logout
} = require("./auth.controller");


// ================= ROUTES =================

// LOGIN
router.post("/login", login);

// GET USER INSTITUTES + ROLES
router.get("/my-institutes-roles", verifyToken, getMyInstitutesRoles);

// SELECT CONTEXT (INSTITUTE + ROLE)
router.post("/select-context", verifyToken, selectContext);

// GET CURRENT USER
router.get("/me", verifyToken, getCurrentUser);

// LOGOUT
router.post("/logout", verifyToken, logout);

// GET USER INSTITUTES + ROLES (duplicate route)
router.get("/my-institutes-roles", verifyToken, getMyInstitutesRoles);


// ================= EXPORT =================
module.exports = router;