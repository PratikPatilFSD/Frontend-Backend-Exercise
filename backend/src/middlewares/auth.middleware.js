// ================= IMPORTS =================
const jwt = require("jsonwebtoken");


// ================= VERIFY TOKEN MIDDLEWARE =================
const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ================= TOKEN MISSING =================
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Token missing"
      });
    }

    // Extract token from header
    const token = authHeader.split(" ")[1];

    // ================= DEBUG (optional) =================
    console.log("TOKEN RECEIVED:", token);

    // Verify token using secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ================= DEBUG =================
    console.log("DECODED TOKEN:", decoded);

    // ================= TOKEN TYPE CHECK =================
    if (
      decoded.token_type !== "access" &&
      decoded.token_type !== "pre_context"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid token type"
      });
    }

    // ================= ATTACH USER =================
    req.user = decoded;

    // Continue to next middleware/controller
    next();

  } catch (error) {
    // ================= ERROR HANDLING =================
    console.error("TOKEN ERROR:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};


// ================= EXPORT =================
module.exports = { verifyToken };