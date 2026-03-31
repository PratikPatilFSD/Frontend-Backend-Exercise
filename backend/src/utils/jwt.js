// ================= IMPORTS =================
const jwt = require("jsonwebtoken");


// ================= GENERATE TOKEN =================
// Creates JWT token using payload and secret key
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "8h", // Token validity
  });
};


// ================= EXPORT FUNCTION =================
module.exports = {
  generateToken
};