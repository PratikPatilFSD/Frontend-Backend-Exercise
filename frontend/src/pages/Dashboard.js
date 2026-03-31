// ================= IMPORTS =================
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import mainLogo from "../assets/schoolcoreoslogo.png";


// ================= COMPONENT =================
function Dashboard() {

  // ================= NAVIGATION =================
  const navigate = useNavigate();

  // ================= USER DATA =================
  const userName = localStorage.getItem("userName") || "User";

  // ================= THEME =================
  const isDark = localStorage.getItem("theme") === "dark";


  // ================= AUTH CHECK =================
  useEffect(() => {

    const token = localStorage.getItem("access_token");

    // If no token → redirect to login
    if (!token) {
      navigate("/");
      return;
    }

    // ================= VERIFY TOKEN =================
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // If invalid response → redirect
        if (!res.ok) {
          navigate("/");
          return;
        }

        const data = await res.json();

        // If backend says invalid → redirect
        if (!data.success) {
          navigate("/");
        }

      } catch (error) {
        // If error → redirect
        navigate("/");
      }
    };

    checkAuth();

  }, [navigate]);


  // ================= LOGOUT =================
  function handleLogout() {

    // Clear session
    localStorage.removeItem("access_token");
    localStorage.removeItem("pre_token");
    localStorage.removeItem("selectedInstitute");
    localStorage.removeItem("selectedRole");

    // Redirect to login
    navigate("/");
  }


  // ================= UI =================
  return (
    <div
      style={{
        ...styles.page,
        background: isDark ? "#101010" : "#f3f4f6"
      }}
    >

      {/* ================= HEADER ================= */}
      <div
        style={{
          ...styles.header,
          background: isDark ? "#0f172a" : "#ffffff"
        }}
      >

        {/* LEFT HEADER */}
        <div style={styles.leftHeader}>
          <img
            src={mainLogo}
            alt="logo"
            style={{
              ...styles.logo,
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

        {/* RIGHT HEADER */}
        <div style={styles.rightHeader}>

          {/* USER AVATAR */}
          <div
            style={{
              ...styles.avatar,
              background: isDark ? "#1e293b" : "#22c55e"
            }}
          >
            {userName.charAt(0).toUpperCase()}
          </div>

          {/* LOGOUT BUTTON */}
          <button onClick={handleLogout} style={styles.logout}>
            Logout
          </button>

        </div>

      </div>


      {/* ================= TITLE ================= */}
      <h1
        style={{
          ...styles.title,
          color: isDark ? "#ffffff" : "#07305D"
        }}
      >
        Hi, {userName} 👋 <br />
        Welcome to SchoolCoreOS Dashboard
      </h1>


      {/* ================= CARDS ================= */}
      <div style={styles.grid}>

        {/* ACTIVE INSTITUTES */}
        <div
          style={{
            ...styles.card,
            background: isDark ? "#181818" : "#c7d2fe",
            color: isDark ? "#ffffff" : "#07305D"
          }}
        >
          <h2>08</h2>
          <p style={styles.cardTitle}>Active Institutes</p>
          <p style={styles.cardText}>
            Institutes actively operating and using the platform
          </p>
        </div>

        {/* INACTIVE INSTITUTES */}
        <div
          style={{
            ...styles.card,
            background: isDark ? "#181818" : "#d1fae5",
            color: isDark ? "#ffffff" : "#07305D"
          }}
        >
          <h2>05</h2>
          <p style={styles.cardTitle}>Inactive Institutes</p>
          <p style={styles.cardText}>
            Institutes currently inactive
          </p>
        </div>

        {/* TOTAL MODULES */}
        <div
          style={{
            ...styles.card,
            background: isDark ? "#181818" : "#fde68a",
            color: isDark ? "#ffffff" : "#07305D"
          }}
        >
          <h2>15+</h2>
          <p style={styles.cardTitle}>Total Modules</p>
          <p style={styles.cardText}>
            Platform features
          </p>
        </div>

        {/* TOTAL USERS */}
        <div
          style={{
            ...styles.card,
            background: isDark ? "#181818" : "#c7d2fe",
            color: isDark ? "#ffffff" : "#07305D"
          }}
        >
          <h2>50+</h2>
          <p style={styles.cardTitle}>Total Users</p>
          <p style={styles.cardText}>
            Registered users
          </p>
        </div>

      </div>

    </div>
  );
}


// ================= STYLES =================
const styles = {
  page: {
    minHeight: "100vh",
    fontFamily: "Inter, sans-serif"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
  },

  leftHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },

  logo: {
    width: "28px"
  },

  logoText: {
    fontWeight: "600",
    fontSize: "18px"
  },

  rightHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600"
  },

  logout: {
    padding: "6px 12px",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer"
  },

  title: {
    textAlign: "center",
    marginTop: "40px",
    lineHeight: "1.5"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    maxWidth: "700px",
    margin: "40px auto",
    padding: "0 15px"
  },

  card: {
    padding: "20px",
    borderRadius: "12px",
    transition: "0.2s"
  },

  cardTitle: {
    fontWeight: "600",
    marginTop: "10px"
  },

  cardText: {
    fontSize: "12px",
    marginTop: "5px"
  }
};

export default Dashboard;