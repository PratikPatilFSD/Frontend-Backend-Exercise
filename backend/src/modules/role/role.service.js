// ================= IMPORT DATABASE =================
const db = require("../../config/db");


// ================= CREATE ROLE =================
const createRole = async (body) => {

  // Destructure request body
  const { name, code, description } = body;

  // SQL query to insert role
  const query = `
    INSERT INTO roles (name, code, description)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  // Values for query placeholders
  const values = [
    name,
    code,
    description || null
  ];

  // Execute query
  const result = await db.query(query, values);

  // Return created role
  return result.rows[0];
};


// ================= GET ALL ROLES =================
const getRoles = async () => {

  // SQL query to fetch all roles
  const result = await db.query(`
    SELECT * FROM roles
  `);

  // Return result
  return result.rows;
};


// ================= EXPORT =================
module.exports = { createRole, getRoles };