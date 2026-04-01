// ================= IMPORTS =================
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

// Pages
import Login from "./pages/Login";
import SelectInstitute from "./pages/SelectInstitute";
import SelectRole from "./pages/SelectRole";
import Dashboard from "./pages/Dashboard";

// Protected Route Wrapper
import ProtectedRoute from "./components/ProtectedRoute";


// ================= COMPONENT =================
function App() {

  // ================= ZOOM CONTROL =================
  useEffect(() => {

    const handleZoom = () => {
      const zoom = window.devicePixelRatio;

      let scale = 1;

      // LIMIT ZOOM RANGE
      if (zoom > 1.5) scale = 1.5;       // max 150%
      else if (zoom < 0.6) scale = 0.6;  // min 60%
      else scale = zoom;

      const root = document.getElementById("app-root");

      if (root) {
        root.style.transform = `scale(${1 / scale})`;
        root.style.transformOrigin = "top center";
      }
    };

    handleZoom();

    window.addEventListener("resize", handleZoom);

    return () => window.removeEventListener("resize", handleZoom);

  }, []);


  return (
    <BrowserRouter>

      {/* WRAPPER ADDED */}
      <div id="app-root">

        {/* ================= ROUTES ================= */}
        <Routes>

          {/* ================= LOGIN PAGE ================= */}
          <Route path="/" element={<Login />} />

          {/* ================= INSTITUTE SELECTION ================= */}
          <Route path="/select-institute" element={<SelectInstitute />} />

          {/* ================= ROLE SELECTION ================= */}
          <Route path="/select-role" element={<SelectRole />} />

          {/* ================= PROTECTED DASHBOARD ================= */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

        </Routes>

      </div>

    </BrowserRouter>
  );
}


// ================= EXPORT =================
export default App;