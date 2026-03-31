// ================= IMPORT DATABASE =================
const db = require("../../config/db");


// ================= CREATE MAPPING =================
const createMapping = async (body) => {

  // Destructure request body
  const {
    tenant_id,
    user_id,
    institute_id,
    role_id,
    is_primary
  } = body;

  // SQL query to insert mapping
  const query = `
    INSERT INTO user_institute_roles
    (tenant_id, user_id, institute_id, role_id, is_primary)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;

  // Values for query placeholders
  const values = [
    tenant_id,
    user_id,
    institute_id,
    role_id,
    is_primary || false
  ];

  // Execute query
  const result = await db.query(query, values);

  // Return created mapping
  return result.rows[0];
};


// ================= GET ALL MAPPINGS =================
const getMappings = async () => {

  // SQL query to fetch all mappings
  const result = await db.query(`
    SELECT * FROM user_institute_roles
  `);

  // Return result
  return result.rows;
};


// ================= EXPORT =================
module.exports = { createMapping, getMappings };