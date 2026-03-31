// ================= IMPORTS =================
const db = require("../../config/db");
const { hashPassword } = require("../../utils/hash");


// ================= CREATE USER =================
const createUser = async (body) => {

  // Destructure request body
  const {
    first_name,
    last_name,
    email,
    mobile,
    password
  } = body;

  // ================= HASH PASSWORD =================
  const hashedPassword = await hashPassword(password);

  // Create full name
  const full_name = `${first_name} ${last_name}`;

  // SQL query to insert user
  const query = `
    INSERT INTO users 
    (first_name, last_name, full_name, email, mobile, password_hash)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, full_name, email
  `;

  // Values for query placeholders
  const values = [
    first_name,
    last_name,
    full_name,
    email,
    mobile,
    hashedPassword
  ];

  // Execute query
  const result = await db.query(query, values);

  // Return created user
  return result.rows[0];
};


// ================= GET ALL USERS =================
const getUsers = async () => {

  // SQL query to fetch users
  const result = await db.query(`
    SELECT id, full_name, email, mobile, status
    FROM users
  `);

  // Return result
  return result.rows;
};


// ================= EXPORT =================
module.exports = { createUser, getUsers };