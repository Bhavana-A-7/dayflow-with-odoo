import { useEffect, useState } from "react";
import axios from "axios";

function Reports() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/employees/")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Employees error:", error));

    axios
      .get("http://127.0.0.1:8000/api/attendance/")
      .then((response) => setAttendance(response.data))
      .catch((error) => console.error("Attendance error:", error));

    axios
      .get("http://127.0.0.1:8000/api/leaves/")
      .then((response) => setLeaves(response.data))
      .catch((error) => console.error("Leaves error:", error));
  }, []);

  const presentCount = attendance.filter(
    (item) => item.status === "PRESENT"
  ).length;

  const absentCount = attendance.filter(
    (item) => item.status === "ABSENT"
  ).length;

  const lateCount = attendance.filter(
    (item) => item.status === "LATE"
  ).length;

  const pendingLeaves = leaves.filter(
    (item) => item.status === "PENDING"
  ).length;

  const approvedLeaves = leaves.filter(
    (item) => item.status === "APPROVED"
  ).length;

  const rejectedLeaves = leaves.filter(
    (item) => item.status === "REJECTED"
  ).length;

  return (
    <div className="page">

      <div className="page-header">
        <div>
          <h2>Reports</h2>
          <p>View employee, attendance and leave reports.</p>
        </div>
      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Total Employees</h3>
          <p>{employees.length}</p>
        </div>

        <div className="stat-card">
          <h3>Present</h3>
          <p>{presentCount}</p>
        </div>

        <div className="stat-card">
          <h3>Absent</h3>
          <p>{absentCount}</p>
        </div>

        <div className="stat-card">
          <h3>Late</h3>
          <p>{lateCount}</p>
        </div>

      </div>

      <div className="report-section">

        <h3>Leave Summary</h3>

        <div className="stats-grid">

          <div className="stat-card">
            <h3>Pending Leaves</h3>
            <p>{pendingLeaves}</p>
          </div>

          <div className="stat-card">
            <h3>Approved Leaves</h3>
            <p>{approvedLeaves}</p>
          </div>

          <div className="stat-card">
            <h3>Rejected Leaves</h3>
            <p>{rejectedLeaves}</p>
          </div>

        </div>

      </div>

      <div className="report-section">

        <h3>Attendance Records</h3>

        <div className="employee-table">

          <div className="table-header">
            <span>Employee ID</span>
            <span>Date</span>
            <span>Check In</span>
            <span>Check Out</span>
            <span>Status</span>
          </div>

          {attendance.map((record) => {

            const employee = employees.find(
              (item) => item.id === record.employee
            );

            return (
              <div className="table-row" key={record.id}>

                <span>
                  {employee
                    ? employee.employee_id
                    : `Employee #${record.employee}`}
                </span>

                <span>{record.date}</span>

                <span>{record.check_in || "-"}</span>

                <span>{record.check_out || "-"}</span>

                <span>{record.status}</span>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}

export default Reports;