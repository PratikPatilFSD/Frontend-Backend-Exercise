// ================= IMPORTS =================
const { Pool } = require("pg");


// ================= DATABASE CONNECTION =================
// Create PostgreSQL connection pool
const pool = new Pool({
  user: "postgres",        // Database username
  host: "localhost",       // Database host
  database: "scos_db",     // Database name
  password: "Pratik@2610", // Database password
  port: 5432,              // Default PostgreSQL port
});


// ================= EXPORT POOL =================
module.exports = pool;