import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [employees, setEmployees] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/employees/")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (employees === null) {
    return <h2>Loading employees...</h2>;
  }

  return (
    <div className="dashboard">
      <h1>DayFlow</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Employees</h3>
          <p>{employees.length}</p>
        </div>

        <div className="stat-card">
          <h3>Present Today</h3>
          <p>0</p>
        </div>

        <div className="stat-card">
          <h3>On Leave</h3>
          <p>0</p>
        </div>

        <div className="stat-card">
          <h3>Pending Requests</h3>
          <p>0</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;