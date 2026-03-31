// ================= LOAD ENV VARIABLES =================
require("dotenv").config();


// ================= IMPORT APP =================
const app = require("./app");


// ================= PORT CONFIG =================
// Use PORT from .env or default to 5000
const PORT = process.env.PORT || 5000;


// ================= START SERVER =================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});