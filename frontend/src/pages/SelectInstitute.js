// ================= IMPORTS =================
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import mainLogo from "../assets/schoolcoreoslogo.png";

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


// ================= COMPONENT =================
function SelectInstitute() {

  // ================= NAVIGATION =================
  const navigate = useNavigate();

  // ================= USER DATA =================
  const userName = localStorage.getItem("userName") || "User";

  // ================= STATE =================
  const [institutes, setInstitutes] = useState([]);
  const [search, setSearch] = useState("");

  // ================= THEME =================
  const isDark = localStorage.getItem("theme") === "dark";

  // ================= FORMAT TYPE =================
  const formatType = (type) =>
    type ? type.charAt(0).toUpperCase() + type.slice(1) : "Institute";


  // ================= FETCH INSTITUTES =================
  useEffect(() => {

    const token = localStorage.getItem("pre_token");

    // If no token → stop
    if (!token) return;

    fetch("http://localhost:5000/auth/my-institutes-roles", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(res => {

        // If API failed → stop
        if (!res?.success) return;

        // ================= NO INSTITUTE =================
        if (res.type === "NO_INSTITUTE") {
          alert("No institute assigned to you. Please contact admin.");
          return;
        }

        // ================= SINGLE ROLE =================
        if (res.type === "SINGLE_ROLE") {

          fetch("http://localhost:5000/auth/select-context", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(res.data)
          })
            .then(res => res.json())
            .then(data => {
              if (data.success) {
                localStorage.setItem("access_token", data.access_token);
                navigate("/dashboard");
              }
            });

          return;
        }

        // ================= SINGLE INSTITUTE =================
        if (res.type === "SINGLE_INSTITUTE") {
          localStorage.setItem("selectedInstitute", JSON.stringify(res.data));
          localStorage.setItem(
            "showInstituteSwitch",
            JSON.stringify(res.show_institute_switch)
          );
          navigate("/select-role");
          return;
        }

        // ================= MULTIPLE INSTITUTES =================
        if (res.type === "MULTI") {
          setInstitutes(res.data);

          localStorage.setItem("institutes", JSON.stringify(res.data));
          localStorage.setItem(
            "showInstituteSwitch",
            JSON.stringify(res.show_institute_switch)
          );
        }

      })
      .catch(() => {
        alert("Failed to load institutes");
      });

  }, [navigate]);


  // ================= LOADING STATE =================
  if (institutes.length === 0) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: localStorage.getItem("theme") === "dark" ? "#101010" : "#F2F2F2",
        color: localStorage.getItem("theme") === "dark" ? "#fff" : "#000"
      }}>
        Loading...
      </div>
    );
  }


  // ================= HANDLE SELECT =================
  function handleSelect(inst) {

    // If no roles assigned
    if (!inst.roles || inst.roles.length === 0) {
      alert("No role assigned for this institute");
      return;
    }

    // Save selected institute
    localStorage.setItem("selectedInstitute", JSON.stringify(inst));

    // ================= SINGLE ROLE =================
    if (inst.roles.length === 1) {

      const role = inst.roles[0];

      fetch("http://localhost:5000/auth/select-context", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("pre_token")}`
        },
        body: JSON.stringify({
          tenant_id: inst.tenant_id,
          institute_id: inst.institute_id,
          role_id: role.role_id
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            localStorage.setItem("access_token", data.access_token);
            navigate("/dashboard");
          }
        });

    } else {
      // Multiple roles → navigate
      navigate("/select-role");
    }
  }


  // ================= SEARCH FILTER =================
  const filteredInstitutes = institutes.filter((inst) =>
    inst.institute_name?.toLowerCase().includes(search.toLowerCase())
  );


  // ================= UI =================
  return (
    <div style={{
      ...styles.page,
      background: isDark ? "#101010" : "#F2F2F2"
    }}>

      {/* ================= HEADER ================= */}
      <div style={styles.headerOuter}>
        <div style={styles.header}>

          {/* LOGO */}
          <div style={styles.logoWrap}>
            <img
              src={mainLogo}
              alt="logo"
              style={{
                ...styles.mainLogo,
                filter: isDark ? "invert(1)" : "none"
              }}
            />
            <span style={{
              ...styles.logoText,
              color: isDark ? "#fff" : "#000"
            }}>
              SchoolCoreOS
            </span>
          </div>

          {/* USER AVATAR */}
          <div style={{
            ...styles.avatar,
            background: isDark ? "#1e293b" : "#e2e8f0",
            color: isDark ? "#fff" : "#07305D"
          }}>
            {userName.charAt(0).toUpperCase()}
          </div>

        </div>
      </div>

      {/* ================= TITLE ================= */}
      <h2 style={{ ...styles.title, color: isDark ? "#fff" : "#07305D" }}>
        Hi, {userName} ! 👋
      </h2>

      <p style={{ ...styles.subtitle, color: isDark ? "#B0B0B0" : "#787878" }}>
        Select your institute to access your personalized dashboard
      </p>

      {/* ================= SEARCH ================= */}
      {institutes.length > 5 && (
        <div style={{
          ...styles.searchBox,
          background: isDark ? "#181818" : "#f8fafc",
          border: isDark ? "1px solid #2A2F3A" : "1px solid #D0D5DD"
        }}>
          {/* search icon */}
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#859AB0">
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>

          <input
            type="text"
            placeholder="Search your institute..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              ...styles.search,
              color: isDark ? "#fff" : "#000"
            }}
          />
        </div>
      )}

      {/* ================= LIST ================= */}
      <div style={styles.list}>
        {filteredInstitutes.map((inst, index) => (
          <div
            key={index}
            style={{
              ...styles.card,
              background: isDark ? "#181818" : "#ffffff"
            }}
            onClick={() => handleSelect(inst)}
          >
            <div style={styles.left}>

              <img
                src={logos[inst.logo] || school1}
                alt="logo"
                style={styles.instLogo}
              />

              <div>
                <p style={{ ...styles.name, color: isDark ? "#fff" : "#07305D" }}>
                  {inst.institute_name}
                </p>

                <p style={{
                  ...styles.location,
                  color: isDark ? "#B0B0B0" : "#64748b"
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="12px" fill="#859AB0">
                    <path d="M536.5-503.5Q560-527 560-560t-23.5-56.5Q513-640 480-640t-56.5 23.5Q400-593 400-560t23.5 56.5Q447-480 480-480t56.5-23.5ZM480-186q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" /></svg>
                  <span style={{ marginLeft: "5px" }}></span>
                  {inst.location}
                </p>
              </div>
            </div>

            <div style={styles.right}>
              {/* TYPE BADGE */}
              <span style={{
                ...styles.type,
                color: isDark ? "#94a3b8" : "#6E6E73"
              }}>
                {formatType(inst.type)}
              </span>

              <span style={styles.arrow}>›</span>
            </div>
          </div>
        ))}
      </div>

      {/* ================= FOOTER ================= */}
      <p style={{
        ...styles.footer,
        color: isDark ? "#94a3b8" : "#64748b"
      }}>
        Can't find your institute? Contact your institute administrator or email us at{" "}
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


// ================= STYLES =================
const styles = {
  page: {
    minHeight: "100vh",
    padding: "15px",
    fontFamily: "Inter, sans-serif"
  },
  headerOuter: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: "900px",
    padding: "0 20px",
    marginBottom: "10px"
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
    fontWeight: "600",
    fontSize: "15px"
  },
  avatar: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold"
  },
  title: {
    textAlign: "center",
    marginTop: "10px"
  },
  subtitle: {
    textAlign: "center",
    fontSize: "14px"
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    maxWidth: "480px",
    width: "90%",
    margin: "20px auto",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #e3e7f4"
  },
  search: {
    border: "none",
    outline: "none",
    width: "100%",
    background: "transparent"
  },
  list: {
    maxWidth: "500px",
    width: "90%",
    margin: "0 auto"
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px",
    marginBottom: "12px",
    borderRadius: "12px",
    cursor: "pointer"
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
    margin: "0px",
    fontSize: "12px",
    display: "flex",
    alignItems: "center"
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  arrow: {
    fontSize: "18px"
  },
  type: {
    fontSize: "13px",
    fontWeight: "500"
  },
  footer: {
    textAlign: "center",
    marginTop: "30px",
    fontSize: "12px"
  }
};

export default SelectInstitute;