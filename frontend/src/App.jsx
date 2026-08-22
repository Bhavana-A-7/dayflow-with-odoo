import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Leaves from "./pages/Leaves";

import "./index.css";

function App() {
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
          </div>

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

          <div className="sidebar-bottom">
            <div className="help-box">
              <div className="help-icon">?</div>
              <div>
                <strong>Need help?</strong>
                <p>Contact support</p>
              </div>
            </div>

            <div className="profile">
              <div className="avatar">BH</div>
              <div className="profile-info">
                <strong>Bhavana H A</strong>
                <span>Administrator</span>
              </div>
              <span className="profile-menu">⋮</span>
            </div>
          </div>
        </aside>

        <main className="main-area">

          <header className="topbar">
            <div>
              <h1>Good morning, Bhavana 👋</h1>
              <p>Here's what's happening with your team today.</p>
            </div>

            <div className="top-actions">
              <button className="icon-button">⌕</button>
              <button className="icon-button notification">
                ♢
                <span></span>
              </button>

              <div className="top-avatar">BH</div>
            </div>
          </header>

          <div className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />

              <Route path="/employees" element={<Employees />} />

             <Route path="/attendance" element={<Attendance />} />

              <Route path="/leaves" element={<Leaves />} />
              

              <Route
                path="/departments"
                element={
                  <div className="placeholder-page">
                    <h2>Departments</h2>
                    <p>Department management will appear here.</p>
                  </div>
                }
              />

              <Route
                path="/reports"
                element={
                  <div className="placeholder-page">
                    <h2>Reports</h2>
                    <p>HR reports will appear here.</p>
                  </div>
                }
              />
            </Routes>
          </div>

        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;