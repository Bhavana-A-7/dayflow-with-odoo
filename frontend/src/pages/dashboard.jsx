import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    axios
      .get("http://127.0.0.1:8000/api/employees/", config)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("http://127.0.0.1:8000/api/attendance/", config)
      .then((response) => {
        setAttendance(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("http://127.0.0.1:8000/api/leaves/", config)
      .then((response) => {
        setLeaves(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const presentToday = attendance.filter(
    (record) =>
      record.date === today &&
      (
        record.status === "PRESENT" ||
        record.status === "LATE"
      )
  ).length;

  const onLeaveToday = leaves.filter(
    (leave) =>
      leave.status === "APPROVED" &&
      leave.start_date <= today &&
      leave.end_date >= today
  ).length;

  const pendingRequests = leaves.filter(
    (leave) => leave.status === "PENDING"
  ).length;

  return (
    <div className="dashboard">

      <h1>DayFlow</h1>

      <p>
        Human Resource Management System
      </p>

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Total Employees</h3>
          <p>{employees.length}</p>
        </div>

        <div className="stat-card">
          <h3>Present Today</h3>
          <p>{presentToday}</p>
        </div>

        <div className="stat-card">
          <h3>On Leave</h3>
          <p>{onLeaveToday}</p>
        </div>

        <div className="stat-card">
          <h3>Pending Requests</h3>
          <p>{pendingRequests}</p>
        </div>

      </div>

      {pendingRequests > 0 && (
        <div className="stat-card">

          <h3>🔔 Notifications</h3>

          <p>
            You have {pendingRequests} pending
            leave request
            {pendingRequests > 1 ? "s" : ""}.
          </p>

        </div>
      )}

    </div>
  );
}

export default Dashboard;