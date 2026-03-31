// ================= IMPORT DATABASE =================
const db = require("../../config/db");


// ================= CREATE INSTITUTE =================
const createInstitute = async (body) => {

  // Destructure request body
  const {
    tenant_id,
    name,
    code,
    type,
    subtype
  } = body;

  // SQL query to insert institute
  const query = `
    INSERT INTO institutes 
    (tenant_id, name, code, type, subtype)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;

  // Values for query placeholders
  const values = [
    tenant_id,
    name,
    code,
    type,
    subtype || null
  ];

  // Execute query
  const result = await db.query(query, values);

  // Return created institute
  return result.rows[0];
};


// ================= GET ALL INSTITUTES =================
const getInstitutes = async () => {

  // SQL query to fetch all institutes
  const result = await db.query(`
    SELECT * FROM institutes
  `);

  // Return result
  return result.rows;
};


// ================= EXPORT =================
module.exports = { createInstitute, getInstitutes };