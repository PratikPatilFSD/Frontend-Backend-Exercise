// ================= IMPORTS =================
const db = require("../../config/db");
const { comparePassword } = require("../../utils/hash");
const { generateToken } = require("../../utils/jwt");


// ================= LOGIN =================
const loginUser = async (email, password) => {

  // Fetch user by email
  const result = await db.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  // User not found
  if (result.rows.length === 0) {
    throw new Error("User not found");
  }

  const user = result.rows[0];

  // ================= PASSWORD CHECK =================
  const isMatch = await comparePassword(password, user.password_hash);

  if (!isMatch) {
    throw new Error("Invalid password");
  }

  // ================= GENERATE PRE-CONTEXT TOKEN =================
  const token = generateToken({
    user_id: user.id,
    email: user.email,
    token_type: "pre_context"
  });

  // Return token + user info
  return {
    pre_context_token: token,
    user: {
      id: user.id,
      full_name: user.full_name,
      email: user.email
    }
  };
};


// ================= GET INSTITUTES + ROLES =================
const getInstitutesRoles = async (userId) => {

  // SQL query to fetch user mappings
  const query = `
  SELECT 
    uir.tenant_id,
    uir.institute_id,
    i.name AS institute_name,
    i.logo,
    i.location,
    i.type AS institute_type,
    r.id AS role_id,
    r.name AS role_name
  FROM user_institute_roles uir
  JOIN institutes i ON i.id = uir.institute_id
  JOIN roles r ON r.id = uir.role_id
  WHERE uir.user_id = $1
`;

  const result = await db.query(query, [userId]);
  const rows = result.rows;

  // ================= NO INSTITUTE =================
  if (rows.length === 0) {
    return {
      type: "NO_INSTITUTE",
      show_institute_switch: false
    };
  }

  // ================= GROUP DATA =================
  const map = {};

  rows.forEach(row => {

    // Create institute entry if not exists
    if (!map[row.institute_id]) {
      map[row.institute_id] = {
        tenant_id: row.tenant_id,
        institute_id: row.institute_id,
        institute_name: row.institute_name,
        logo: row.logo,
        location: row.location,
        type: row.institute_type,
        roles: []
      };
    }

    // Push role into institute
    map[row.institute_id].roles.push({
      role_id: row.role_id,
      role_name: row.role_name
    });
  });

  const institutes = Object.values(map);


  // ================= LOGIC FIX =================

  // SINGLE INSTITUTE
  if (institutes.length === 1) {

    const inst = institutes[0];

    // SINGLE ROLE → DIRECT LOGIN
    if (inst.roles.length === 1) {
      return {
        type: "SINGLE_ROLE",
        show_institute_switch: false,
        data: {
          tenant_id: inst.tenant_id,
          institute_id: inst.institute_id,
          role_id: inst.roles[0].role_id
        }
      };
    }

    // MULTIPLE ROLES → SKIP INSTITUTE PAGE
    return {
      type: "SINGLE_INSTITUTE",
      show_institute_switch: false,
      data: inst
    };
  }

  // MULTIPLE INSTITUTES
  return {
    type: "MULTI",
    show_institute_switch: true,
    data: institutes
  };
};


// ================= SELECT CONTEXT =================
const selectContext = async (userId, tenantId, instituteId, roleId) => {

  // Verify mapping exists
  const result = await db.query(
    `SELECT * FROM user_institute_roles
     WHERE user_id=$1 AND tenant_id=$2 AND institute_id=$3 AND role_id=$4`,
    [userId, tenantId, instituteId, roleId]
  );

  // Invalid selection
  if (result.rows.length === 0) {
    throw new Error("Invalid context selection");
  }

  // ================= GENERATE ACCESS TOKEN =================
  const accessToken = generateToken({
    user_id: userId,
    tenant_id: tenantId,
    institute_id: instituteId,
    role_id: roleId,
    token_type: "access"
  });

  // Return access token
  return {
    access_token: accessToken
  };
};


// ================= EXPORT =================
module.exports = {
  loginUser,
  getInstitutesRoles,
  selectContext
};