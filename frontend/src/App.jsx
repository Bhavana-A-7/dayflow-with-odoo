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

function App() {
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role") || "EMPLOYEE";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    window.location.href = "/login";
  };

  return (
    <BrowserRouter>
      <div className="app-layout">

        {/* SIDEBAR */}
        <aside className="sidebar">

          <div className="brand">
            <div className="brand-icon">D</div>

            <div>
              <h2>DayFlow</h2>
              <span>HR Management</span>
            </div>
          </div>

          {/* MAIN MENU */}
          <div className="menu-section">

            <p className="menu-title">MAIN MENU</p>

            <NavLink to="/" className="nav-item">
              <span>▦</span>
              Dashboard
            </NavLink>

            <NavLink to="/employees" className="nav-item">
              <span>♙</span>
              Employees
            </NavLink>

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

            <NavLink to="/payroll" className="nav-item">
              <span>₹</span>
              Payroll
            </NavLink>

          </div>

          {/* MANAGEMENT */}
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

          {/* BOTTOM */}
          <div className="sidebar-bottom">

            <div className="help-box">

              <div className="help-icon">
                ?
              </div>

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
                <span>{role}</span>
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

        {/* MAIN AREA */}
        <main className="main-area">

          {/* TOP BAR */}
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

          {/* PAGE CONTENT */}
          <div className="content">

            <Routes>

              {/* DASHBOARD */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* EMPLOYEES */}
              <Route
                path="/employees"
                element={
                  <ProtectedRoute>
                    <Employees />
                  </ProtectedRoute>
                }
              />

              {/* ATTENDANCE */}
              <Route
                path="/attendance"
                element={
                  <ProtectedRoute>
                    <Attendance />
                  </ProtectedRoute>
                }
              />

              {/* LEAVES */}
              <Route
                path="/leaves"
                element={
                  <ProtectedRoute>
                    <Leaves />
                  </ProtectedRoute>
                }
              />

              {/* PROFILE */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* PAYROLL */}
              <Route
                path="/payroll"
                element={
                  <ProtectedRoute>
                    <Payroll />
                  </ProtectedRoute>
                }
              />

              {/* DEPARTMENTS */}
              <Route
                path="/departments"
                element={
                  <ProtectedRoute>
                    <Departments />
                  </ProtectedRoute>
                }
              />

              {/* REPORTS */}
              <Route
                path="/reports"
                element={
                  <ProtectedRoute>
                    <Reports />
                  </ProtectedRoute>
                }
              />

              {/* LOGIN */}
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
