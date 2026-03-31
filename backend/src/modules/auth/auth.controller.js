const authService = require("./auth.service");


// ================= LOGIN =================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authService.loginUser(email, password);

    res.json({
      success: true,
      ...result
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error); // 🔥 DEBUG

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// ================= GET INSTITUTES + ROLES =================
const getMyInstitutesRoles = async (req, res) => {
  try {

    const userId = req.user.user_id;

    console.log("USER ID:", userId); // 🔥 DEBUG

    const result = await authService.getInstitutesRoles(userId);

    console.log("INSTITUTE RESPONSE:", result); // 🔥 DEBUG

    res.json({
      success: true,
      ...result
    });

  } catch (error) {

    console.error("ERROR IN getMyInstitutesRoles:", error); // 🔥 VERY IMPORTANT

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// ================= SELECT CONTEXT =================
const selectContext = async (req, res) => {
  try {

    const userId = req.user.user_id;

    const { tenant_id, institute_id, role_id } = req.body;

    console.log("SELECT CONTEXT INPUT:", {
      userId,
      tenant_id,
      institute_id,
      role_id
    }); // 🔥 DEBUG

    const result = await authService.selectContext(
      userId,
      tenant_id,
      institute_id,
      role_id
    );

    res.json({
      success: true,
      ...result
    });

  } catch (error) {

    console.error("SELECT CONTEXT ERROR:", error); // 🔥 DEBUG

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// ================= CURRENT USER =================
const getCurrentUser = (req, res) => {
  res.json({
    success: true,
    data: req.user
  });
};


// ================= LOGOUT =================
const logout = (req, res) => {
  res.json({
    success: true,
    message: "Logged out"
  });
};


module.exports = {
  login,
  getMyInstitutesRoles,
  selectContext,
  getCurrentUser,
  logout
};