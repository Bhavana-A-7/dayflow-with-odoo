import { useEffect, useState } from "react";
import axios from "axios";

function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/employees/")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log("Employee API error:", error);
      });
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Employees</h2>
          <p>Manage your organization's employees.</p>
        </div>

        <button className="primary-button">
          + Add Employee
        </button>
      </div>

      <div className="employee-table">
        <div className="table-header">
          <span>Employee</span>
          <span>Employee ID</span>
          <span>Department</span>
          <span>Job Title</span>
          <span>Status</span>
        </div>

        {employees.map((employee) => (
          <div className="table-row" key={employee.id}>
            <div>
              <strong>
                {employee.first_name} {employee.last_name}
              </strong>
              <small>{employee.email}</small>
            </div>

            <span>{employee.employee_id}</span>

            <span>
                {String(employee.department) === "2" ? "Engineering" : "No Department"}
            </span>

            <span>{employee.job_title}</span>

            <span>
              {employee.is_active ? "Active" : "Inactive"}
            </span>
          </div>
        ))}
      </div>

      {employees.length === 0 && (
        <p>No employees found.</p>
      )}
    </div>
  );
}

export default Employees;