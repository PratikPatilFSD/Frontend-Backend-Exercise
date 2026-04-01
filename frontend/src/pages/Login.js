// ================= IMPORTS =================
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/schoolcoreoslogo.png";

function Login() {

    // ================= NAVIGATION =================
    const navigate = useNavigate();

    // ================= STATE =================
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // ================= DARK MODE =================
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    const isDark = darkMode;

    // ================= SESSION PERSIST (AUTO LOGIN) =================
    useEffect(() => {
        const preToken = localStorage.getItem("pre_token");
        const accessToken = localStorage.getItem("access_token");

        if (preToken || accessToken) {
            navigate("/select-institute");
        }
    }, [navigate]);

    // ================= THEME TOGGLE =================
    function toggleTheme() {
        const newTheme = darkMode ? "light" : "dark";
        setDarkMode(!darkMode);
        localStorage.setItem("theme", newTheme);
        window.location.reload();
    }

    // ================= LOGIN FUNCTION =================
    async function handleLogin() {

        let valid = true;

        // reset errors
        setEmailError("");
        setPasswordError("");

        // ================= EMAIL VALIDATION =================
        if (email === "") {
            setEmailError("Email cannot be empty");
            valid = false;
        }
        else if (email.includes(" ")) {
            setEmailError("Email cannot contain spaces");
            valid = false;
        }
        else if (!email.includes("@")) {
            setEmailError("Email must contain @");
            valid = false;
        }
        else if (!email.includes(".")) {
            setEmailError("Email must contain '.'");
            valid = false;
        }
        else if (email.indexOf("@") === 0) {
            setEmailError("Email cannot start with @");
            valid = false;
        }
        else if (email.indexOf("@") > email.lastIndexOf(".")) {
            setEmailError("Invalid email format");
            valid = false;
        }

        // ================= PASSWORD VALIDATION (GENERIC ONLY) =================
        if (password === "") {
            setPasswordError("Invalid password");
            valid = false;
        }

        // ================= API LOGIN =================
        if (valid) {
            try {
                const res = await fetch("https://frontend-backend-exercise.onrender.com/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await res.json();

                if (!data?.success) {
                    alert(data?.message || "Login failed");
                    return;
                }

                // ================= KEEP THEME SAFE =================
                const theme = localStorage.getItem("theme");

                // ❌ REMOVED: clearing tokens (session must persist)

                if (theme) {
                    localStorage.setItem("theme", theme);
                }

                // ================= STORE SESSION =================
                localStorage.setItem("pre_token", data.pre_context_token);
                localStorage.setItem("userName", data.user.full_name);

                console.log("TOKEN SAVED:", data.pre_context_token);

                navigate("/select-institute");

            } catch (error) {
                console.error("Login Error:", error);
                alert("Server error. Please try again.");
            }
        }
    }

    // ================= UI =================
    return (
        <div style={{
            ...styles.page,
            background: isDark ? "#101010" : "#f1f5f9"
        }}>

            <div style={styles.topRight}>
                <button onClick={toggleTheme} style={styles.themeBtn}>
                    {isDark ? "☀️" : "🌙"}
                </button>
            </div>

            <div style={styles.centerWrap}>

                <div style={{
                    ...styles.card,
                    background: isDark ? "#181818" : "#fff",
                    color: isDark ? "#fff" : "#000",
                    border: isDark ? "1px solid #1e293b" : "none"
                }}>

                    <img
                        src={logo}
                        alt="logo"
                        style={{
                            ...styles.logo,
                            filter: isDark ? "invert(1)" : "none"
                        }}
                    />

                    <h2 style={styles.title}>SchoolCoreOS</h2>

                    <input
                        type="text"
                        placeholder="Username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            ...styles.input,
                            background: isDark ? "rgba(255,255,255,0.05)" : "#fff",
                            color: isDark ? "#fff" : "#000",
                            border: isDark ? "1px solid #1e293b" : "1px solid #ccc"
                        }}
                    />
                    <p style={styles.error}>{emailError}</p>

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            ...styles.input,
                            background: isDark ? "rgba(255,255,255,0.05)" : "#fff",
                            color: isDark ? "#fff" : "#000",
                            border: isDark ? "1px solid #1e293b" : "1px solid #ccc"
                        }}
                    />
                    <p style={styles.error}>{passwordError}</p>

                    <button style={styles.button} onClick={handleLogin}>
                        Continue
                    </button>

                </div>

                <p style={{
                    ...styles.footer,
                    color: isDark ? "#94a3b8" : "#64748b"
                }}>
                    By continuing, you agree to Terms & Privacy Policy
                </p>

            </div>
        </div>
    );
}

// ================= STYLES =================
const styles = {
    page: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        padding: "20px"
    },
    centerWrap: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%"
    },
    card: {
        padding: "40px",
        borderRadius: "16px",
        width: "100%",
        maxWidth: "360px",
        textAlign: "center"
    },
    logo: {
        width: "60px",
        marginTop: "10px",
        marginBottom: "15px"
    },
    title: {
        marginBottom: "20px"
    },
    input: {
        width: "100%",
        padding: "12px",
        marginTop: "10px",
        borderRadius: "8px",
        boxSizing: "border-box"
    },
    button: {
        width: "100%",
        padding: "12px",
        marginTop: "20px",
        background: "#0f766e",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer"
    },
    error: {
        color: "red",
        fontSize: "12px",
        textAlign: "left"
    },
    footer: {
        fontSize: "12px",
        marginTop: "25px",
        textAlign: "center"
    },
    topRight: {
        position: "absolute",
        top: "20px",
        right: "20px"
    },
    themeBtn: {
        padding: "10px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer"
    }
};

export default Login;