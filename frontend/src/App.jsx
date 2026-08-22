import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Leaves from "./pages/Leaves";
import Reports from "./pages/Reports";
import Departments from "./pages/Departments";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Payroll from "./pages/Payroll";

import "./index.css";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    window.location.href = "/login";
  };

  return (
    <BrowserRouter>
      <div className="app-layout">

        <aside className="sidebar">

          <div className="brand">
            <div className="brand-icon">D</div>

            <div>
              <h2>DayFlow</h2>
              <span>HR Management</span>
            </div>
          </div>

          <div className="menu-section">

            <p className="menu-title">MAIN MENU</p>

            <NavLink to="/" className="nav-item">
              <span>▦</span>
              Dashboard
            </NavLink>

            {role === "ADMIN" && (
              <NavLink to="/employees" className="nav-item">
                <span>♙</span>
                Employees
              </NavLink>
            )}

            <NavLink to="/attendance" className="nav-item">
              <span>◷</span>
              Attendance
            </NavLink>

            <NavLink to="/leaves" className="nav-item">
              <span>▤</span>
              Leave Management
            </NavLink>

            <NavLink to="/profile" className="nav-item">
              <span>♙</span>
              My Profile
            </NavLink>

            {/* Payroll is available to both Admin and Employee */}
            <NavLink to="/payroll" className="nav-item">
              <span>₹</span>
              Payroll
            </NavLink>

          </div>

          {role === "ADMIN" && (
            <div className="menu-section">

              <p className="menu-title">MANAGEMENT</p>

              <NavLink to="/departments" className="nav-item">
                <span>⌂</span>
                Departments
              </NavLink>

              <NavLink to="/reports" className="nav-item">
                <span>▥</span>
                Reports
              </NavLink>

            </div>
          )}

          <div className="sidebar-bottom">

            <div className="help-box">
              <div className="help-icon">?</div>

              <div>
                <strong>Need help?</strong>
                <p>Contact support</p>
              </div>
            </div>

            <div className="profile">

              <div className="avatar">
                BH
              </div>

              <div className="profile-info">
                <strong>{username || "User"}</strong>
                <span>{role || "Employee"}</span>
              </div>

              <button
                type="button"
                className="logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>

          </div>

        </aside>

        <main className="main-area">

          <header className="topbar">

            <div>
              <h1>Good morning, Bhavana 👋</h1>
              <p>
                Here's what's happening with your team today.
              </p>
            </div>

            <div className="top-actions">

              <button className="icon-button">
                ⌕
              </button>

              <button className="icon-button notification">
                ♢
                <span></span>
              </button>

              <div className="top-avatar">
                BH
              </div>

            </div>

          </header>

          <div className="content">

            <Routes>

              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/employees"
                element={
                  <AdminRoute>
                    <Employees />
                  </AdminRoute>
                }
              />

              <Route
                path="/attendance"
                element={
                  <ProtectedRoute>
                    <Attendance />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/leaves"
                element={
                  <ProtectedRoute>
                    <Leaves />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/payroll"
                element={
                  <ProtectedRoute>
                    <Payroll />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/departments"
                element={
                  <AdminRoute>
                    <Departments />
                  </AdminRoute>
                }
              />

              <Route
                path="/reports"
                element={
                  <AdminRoute>
                    <Reports />
                  </AdminRoute>
                }
              />

              <Route
                path="/login"
                element={<Login />}
              />

            </Routes>

          </div>

        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;