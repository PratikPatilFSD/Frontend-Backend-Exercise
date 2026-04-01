// ================= IMPORTS =================
const { Pool } = require("pg");

// ================= DATABASE CONNECTION =================

// Use DATABASE_URL from Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // required for Render PostgreSQL
  }
});

// ================= EXPORT =================
module.exports = pool;