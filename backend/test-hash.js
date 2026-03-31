// ================= IMPORT =================
const bcrypt = require("bcrypt");


// ================= PASSWORD =================
const password = "Admin@123";


// ================= HASH PASSWORD =================
// Generate hash using bcrypt with salt rounds = 10
bcrypt.hash(password, 10).then(hash => {

  // Print hashed password
  console.log("HASH:", hash);

});