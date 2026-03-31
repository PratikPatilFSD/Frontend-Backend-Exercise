// ================= IMPORTS =================
const bcrypt = require("bcrypt");


// ================= HASH PASSWORD =================
// Converts plain password → hashed password
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};


// ================= COMPARE PASSWORD =================
// Compares entered password with stored hash
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};


// ================= EXPORT FUNCTIONS =================
module.exports = {
  hashPassword,
  comparePassword
};