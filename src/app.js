// ================= IMPORTS =================
const express = require("express");
const cors = require("cors");


// ================= APP INITIALIZATION =================
const app = express();


// ================= MIDDLEWARES =================
// Enable Cross-Origin Resource Sharing
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());


// ================= ROUTE IMPORTS =================
const authRoutes = require("./modules/auth/auth.routes");
const userRoutes = require("./modules/user/user.routes");
const instituteRoutes = require("./modules/institute/institute.routes");
const roleRoutes = require("./modules/role/role.routes");
const mappingRoutes = require("./modules/mapping/mapping.routes");


// ================= ROUTE MIDDLEWARE =================
// Authentication routes
app.use("/auth", authRoutes);

// User routes
app.use("/users", userRoutes);

// Institute routes
app.use("/institutes", instituteRoutes);

// Role routes
app.use("/roles", roleRoutes);

// User-Institute-Role mapping routes
app.use("/user-institute-roles", mappingRoutes);


// ================= EXPORT APP =================
module.exports = app;