// ================= IMPORTS =================
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import SelectInstitute from "./pages/SelectInstitute";
import SelectRole from "./pages/SelectRole";
import Dashboard from "./pages/Dashboard";

// Protected Route Wrapper
import ProtectedRoute from "./components/ProtectedRoute";


// ================= COMPONENT =================
function App() {
  return (
    <BrowserRouter>

      {/* ================= ROUTES ================= */}
      <Routes>

        {/* ================= LOGIN PAGE ================= */}
        <Route path="/" element={<Login />} />

        {/* ================= INSTITUTE SELECTION ================= */}
        <Route
          path="/select-institute"
          element={<SelectInstitute />}
        />

        {/* ================= ROLE SELECTION ================= */}
        <Route
          path="/select-role"
          element={<SelectRole />}
        />

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

    </BrowserRouter>
  );
}


// ================= EXPORT =================
export default App;