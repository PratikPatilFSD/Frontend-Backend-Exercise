// ================= IMPORTS =================
import { useNavigate } from "react-router-dom";

// main logo
import mainLogo from "../assets/schoolcoreoslogo.png";

// institute logos
import school1 from "../assets/school1.png";
import school2 from "../assets/school2.png";
import school3 from "../assets/school3.png";
import school4 from "../assets/school4.png";
import school5 from "../assets/school5.png";
import school6 from "../assets/school6.png";


// ================= LOGO MAPPING =================
const logos = {
  "school1.png": school1,
  "school2.png": school2,
  "school3.png": school3,
  "school4.png": school4,
  "school5.png": school5,
  "school6.png": school6
};


// ================= ROLE INFO =================
const roleDetails = {
  Admin: { icon: "🛡️", text: "Full system access" },
  Principal: { icon: "⭐", text: "Institute oversight" },
  Teacher: { icon: "🎓", text: "Class & grading" },
  Parent: { icon: "👨‍👩‍👧", text: "Child progress" }
};


// ================= COMPONENT =================
function SelectRole() {

  // ================= NAVIGATION =================
  const navigate = useNavigate();

  // ================= DATA FROM LOCAL STORAGE =================
  const institute = JSON.parse(localStorage.getItem("selectedInstitute"));
  const roles = institute?.roles || [];

  const userName = localStorage.getItem("userName") || "User";

  // ================= THEME =================
  const isDark = localStorage.getItem("theme") === "dark";

  // ================= BACKEND FLAG =================
  // Controls visibility of "Change Institute" button
  const showInstituteSwitch = JSON.parse(
    localStorage.getItem("showInstituteSwitch")
  );


  // ================= ROLE SELECT FUNCTION =================
  async function handleRole(role) {

    const token = localStorage.getItem("pre_token");

    try {
      const res = await fetch("http://localhost:5000/auth/select-context", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          tenant_id: institute.tenant_id,
          institute_id: institute.institute_id,
          role_id: role.role_id
        })
      });

      const data = await res.json();

      // ================= API FAILURE =================
      if (!data.success) {
        alert(data.message);
        return;
      }

      // ================= STORE SESSION =================
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("selectedRole", JSON.stringify(role));

      // ================= NAVIGATION =================
      navigate("/dashboard");

    } catch (err) {
      alert("Server error");
    }
  }


  // ================= BACK BUTTON =================
  function handleBack() {
    navigate("/select-institute");
  }


  // ================= UI =================
  return (
    <div
      style={{
        ...styles.page,
        background: isDark ? "#101010" : "#F2F2F2"
      }}
    >

      {/* ================= HEADER ================= */}
      <div style={styles.headerOuter}>
        <div style={styles.header}>

          {/* LOGO SECTION */}
          <div style={styles.logoWrap}>
            <img
              src={mainLogo}
              alt="logo"
              style={{
                ...styles.mainLogo,
                filter: isDark ? "invert(1)" : "none"
              }}
            />
            <span
              style={{
                ...styles.logoText,
                color: isDark ? "#fff" : "#000"
              }}
            >
              SchoolCoreOS
            </span>
          </div>

          {/* USER AVATAR */}
          <div
            style={{
              ...styles.avatar,
              background: isDark ? "#1e293b" : "#e5e7eb",
              color: isDark ? "#fff" : "#07305D"
            }}
          >
            {userName.charAt(0).toUpperCase()}
          </div>

        </div>
      </div>


      {/* ================= CHANGE INSTITUTE BUTTON ================= */}
      {showInstituteSwitch && (
        <div style={styles.changeWrap}>
          <button
            onClick={handleBack}
            style={{
              ...styles.changeBtn,
              background: isDark ? "#181818" : "#EFEFF3",
              color: isDark ? "#fff" : "#07305D",
              border: isDark ? "1px solid #2D2D2D" : "1px solid #E2E2E7"
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -1140 960 960" width="16px" fill="#07305D">
              <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
            </svg> Change Institute
          </button>
        </div>
      )}


      {/* ================= SELECTED INSTITUTE ================= */}
      <div
        style={{
          ...styles.selectedCard,
          background: isDark ? "#181818" : "#E0ECFF",
          color: isDark ? "#fff" : "#000",
          border: isDark ? "1px solid #2D2D2D" : "1px solid #d5d5eb"
        }}
      >
        <div style={styles.left}>

          <img
            src={logos[institute?.logo] || school1}
            alt="logo"
            style={styles.instLogo}
          />

          <div>
            <p
              style={{
                ...styles.name,
                color: isDark ? "#fff" : "#07305D"
              }}
            >
              {institute?.institute_name}
            </p>

            <p
              style={{
                ...styles.location,
                color: isDark ? "#fff" : "#787878"
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -1200 960 960" width="12px" fill="#859AB0">
                <path d="M536.5-503.5Q560-527 560-560t-23.5-56.5Q513-640 480-640t-56.5 23.5Q400-593 400-560t23.5 56.5Q447-480 480-480t56.5-23.5ZM480-186q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
              </svg>
              <span style={{ marginLeft: "5px" }}></span>
              {institute?.location}
            </p>
          </div>

        </div>

        {/* CHECK ICON */}
        <div style={styles.checkCircle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="36px"
            viewBox="0 -960 960 960"
            width="36px"
            fill="#3b82f6"
          >
            <path d="M480-80 373-187l-152-17 17-152L80-480l158-124-17-152 152-17 107-107 107 107 152 17-17 152 158 124-158 124 17 152-152 17L480-80Zm-40-280 200-200-56-56-144 144-64-64-56 56 120 120Z" />
          </svg>
        </div>
      </div>


      {/* ================= TITLE ================= */}
      <h2 style={{ ...styles.title, color: isDark ? "#fff" : "#07305D" }}>
        Choose Your Role
      </h2>

      <p style={{ ...styles.subtitle, color: isDark ? "#fff" : "#787878" }}>
        Select how you’d like to access {institute?.institute_name}
      </p>


      {/* ================= ROLE LIST ================= */}
      <div style={styles.list}>
        {roles.map((role, index) => {

          const details = roleDetails[role.role_name] || {};

          return (
            <div
              key={index}
              style={{
                ...styles.card,
                background: isDark ? "#181818" : "#FFFFFF",
                border: isDark ? "1px solid #2D2D2D" : "none"
              }}
              onClick={() => handleRole(role)}
            >

              <div style={styles.left}>
                <span>{details.icon}</span>

                <div>
                  <p style={{ ...styles.role, color: isDark ? "#fff" : "#07305D" }}>
                    {role.role_name}
                  </p>

                  <p style={{ ...styles.roleSub, color: isDark ? "#B0B0B0" : "#787878" }}>
                    {details.text}
                  </p>
                </div>
              </div>

              <span style={{ ...styles.arrow, color: isDark ? "#fff" : "#07305D" }}>
                ›
              </span>
            </div>
          );
        })}
      </div>


      {/* ================= FOOTER ================= */}
      <p
        style={{
          ...styles.footer,
          color: isDark ? "#94a3b8" : "#64748b"
        }}
      >
        Can't find your role? Contact your institute administrator or email us at{" "}
        <a
          href="mailto:support@schoolcoreos.com"
          style={{
            ...styles.link,
            color: isDark ? "#38bdf8" : "#2563eb",
            textDecoration: "none"
          }}
        >
          support@schoolcoreos.com
        </a>
      </p>

    </div>
  );
}


// ================= CSS =================
const styles = {
  page: {
    minHeight: "100vh",
    padding: "15px",
    fontFamily: "Inter, sans-serif"
  },

  headerOuter: {
    display: "flex",
    justifyContent: "center"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "900px"
  },

  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: "6px"
  },

  mainLogo: {
    width: "26px"
  },

  logoText: {
    fontWeight: "600"
  },

  avatar: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  changeWrap: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0"
  },

  changeBtn: {
    padding: "8px 18px",
    borderRadius: "20px",
    border: "1px solid #E2E2E7",
    cursor: "pointer",
    background: "#EFEFF3"
  },

  selectedCard: {
    maxWidth: "520px",
    margin: "0 auto",
    padding: "14px",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #93c5fd"
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },

  instLogo: {
    width: "45px",
    height: "45px",
    borderRadius: "50%"
  },

  name: {
    margin: 0,
    fontWeight: "600"
  },

  location: {
    margin: 0,
    fontSize: "12px"
  },

  checkCircle: {
    color: "#3b82f6",
    fontSize: "20px"
  },

  title: {
    textAlign: "center",
    marginTop: "25px"
  },

  subtitle: {
    textAlign: "center",
    fontSize: "14px"
  },

  list: {
    maxWidth: "550px",
    margin: "20px auto"
  },

  card: {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px",
    marginBottom: "12px",
    borderRadius: "12px",
    cursor: "pointer",
    background: "#fff"
  },

  role: {
    margin: 0,
    fontWeight: "600"
  },

  roleSub: {
    margin: 0,
    fontSize: "12px",
    color: "#6b7280"
  },

  arrow: {
    fontSize: "16px"
  },

  footer: {
    textAlign: "center",
    fontSize: "12px",
    marginTop: "80px"
  },

  link: {
    color: "#2563eb"
  }
};

export default SelectRole;