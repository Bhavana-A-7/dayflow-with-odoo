
import { useEffect, useState } from "react";
import axios from "axios";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/employees/")
      .then((response) => {
        console.log("Employees:", response.data);

        // Django REST Framework normally returns an array.
        // This also handles paginated responses if they occur.
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.results || [];

        setEmployees(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Employee API error:", error);
        setLoading(false);
      });
  }, []);

  const getDepartmentName = (department) => {
    if (String(department) === "2") {
      return "Engineering";
    }

    return department || "No Department";
  };

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

      {loading ? (
        <div className="employee-table">
          <div className="table-row">
            <p>Loading employees...</p>
          </div>
        </div>
      ) : employees.length === 0 ? (
        <div className="employee-table">
          <div className="table-row">
            <p>No employees found.</p>
          </div>
        </div>
      ) : (
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

                <small>
                  {employee.email}
                </small>
              </div>

              <span>
                {employee.employee_id}
              </span>

              <span>
                {getDepartmentName(employee.department)}
              </span>

              <span>
                {employee.job_title || "Not specified"}
              </span>

              <span className="badge">
                {employee.is_active ? "Active" : "Inactive"}
              </span>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Employees;

