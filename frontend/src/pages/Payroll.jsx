import { useEffect, useState } from "react";
import axios from "axios";

function Payroll() {
  const [payroll, setPayroll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");

    axios
      .get("http://127.0.0.1:8000/api/payroll/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(async (response) => {
        let data = response.data;

        // Employees can see only their own payroll
        if (role !== "ADMIN") {
          try {
            const profileResponse = await axios.get(
              "http://127.0.0.1:8000/api/my-profile/",
              {
                headers: {
                  Authorization: `Token ${token}`,
                },
              }
            );

            const employeeId = profileResponse.data.id;

            data = data.filter(
              (record) => record.employee === employeeId
            );
          } catch (profileError) {
            console.error(profileError);
          }
        }

        setPayroll(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Payroll API error:", error);
        setError("Unable to load payroll.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading payroll...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="page">

      <div className="page-header">
        <div>
          <h2>Payroll</h2>
          <p>
            {localStorage.getItem("role") === "ADMIN"
              ? "Manage employee salary details."
              : "View your salary details."}
          </p>
        </div>
      </div>

      {payroll.length === 0 ? (
        <p>No payroll records found.</p>
      ) : (
        <div className="employee-table">

          <div className="table-header">
            <span>Employee</span>
            <span>Basic Salary</span>
            <span>Allowances</span>
            <span>Deductions</span>
            <span>Net Salary</span>
          </div>

          {payroll.map((record) => (
            <div
              className="table-row"
              key={record.id}
            >

              <span>
                <strong>{record.employee_name}</strong>
              </span>

              <span>
                ₹{Number(record.basic_salary).toLocaleString()}
              </span>

              <span>
                ₹{Number(record.allowances).toLocaleString()}
              </span>

              <span>
                ₹{Number(record.deductions).toLocaleString()}
              </span>

              <span>
                <strong>
                  ₹{Number(record.net_salary).toLocaleString()}
                </strong>
              </span>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Payroll;