import { useEffect, useState } from "react";
import axios from "axios";

function Leaves() {
  const [leaves, setLeaves] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    employee: "",
    leave_type: "CASUAL",
    start_date: "",
    end_date: "",
    reason: "",
    status: "PENDING",
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/leaves/")
      .then((response) => {
        setLeaves(response.data);
      })
      .catch((error) => {
        console.error("Leave API error:", error);
      });

    axios
      .get("http://127.0.0.1:8000/api/employees/")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Employee API error:", error);
      });
  }, []);

  const getEmployeeName = (employeeId) => {
    const employee = employees.find(
      (item) => item.id === employeeId
    );

    if (!employee) {
      return `Employee #${employeeId}`;
    }

    return `${employee.first_name} ${employee.last_name}`;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    let response;

    if (editingId) {
      response = await axios.put(
        `http://127.0.0.1:8000/api/leaves/${editingId}/`,
        formData
      );

      setLeaves((currentLeaves) =>
        currentLeaves.map((leave) =>
          leave.id === editingId ? response.data : leave
        )
      );
    } else {
      response = await axios.post(
        "http://127.0.0.1:8000/api/leaves/",
        formData
      );

      setLeaves((currentLeaves) => [
        ...currentLeaves,
        response.data,
      ]);
    }

    setShowForm(false);
    setEditingId(null);

    setFormData({
      employee: "",
      leave_type: "CASUAL",
      start_date: "",
      end_date: "",
      reason: "",
      status: "PENDING",
    });

  } catch (error) {
    console.error("Failed to save leave:", error);
    alert("Failed to save leave. Please check the details.");
  }
};

  const updateLeaveStatus = async (id, status) => {
  try {
    const response = await axios.patch(
      `http://127.0.0.1:8000/api/leaves/${id}/`,
      { status: status }
    );

    setLeaves(
      leaves.map((leave) =>
        leave.id === id ? response.data : leave
      )
    );
  } catch (error) {
    console.error("Failed to update leave status:", error);
    alert("Failed to update leave status.");
  }
};
const editLeave = (leave) => {
  setEditingId(leave.id);

  setFormData({
    employee: leave.employee,
    leave_type: leave.leave_type,
    start_date: leave.start_date,
    end_date: leave.end_date,
    reason: leave.reason || "",
    status: leave.status,
  });

  setShowForm(true);
};

const deleteLeave = async (id) => {
  if (!window.confirm("Are you sure you want to delete this leave request?")) {
    return;
  }

  try {
    await axios.delete(
      `http://127.0.0.1:8000/api/leaves/${id}/`
    );

    setLeaves((currentLeaves) =>
      currentLeaves.filter((leave) => leave.id !== id)
    );
  } catch (error) {
    console.error("Failed to delete leave:", error);
    alert("Failed to delete leave.");
  }
};

  return (
    <div className="page">

      <div className="page-header">
        <div>
          <h2>Leave Management</h2>
          <p>Manage employee leave requests.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(true)}
        >
          + Apply Leave
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="attendance-form">

          <h3>{editingId ? "Edit Leave Request" : "Apply for Leave"}</h3>

          <label>Employee</label>

          <select
            value={formData.employee}
            onChange={(e) =>
              setFormData({
                ...formData,
                employee: e.target.value,
              })
            }
            required
          >
            <option value="">Select Employee</option>

            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.first_name} {employee.last_name}
              </option>
            ))}
          </select>

          <label>Leave Type</label>

          <select
            value={formData.leave_type}
            onChange={(e) =>
              setFormData({
                ...formData,
                leave_type: e.target.value,
              })
            }
          >
            <option value="CASUAL">Casual Leave</option>
            <option value="SICK">Sick Leave</option>
            <option value="PAID">Paid Leave</option>
            <option value="UNPAID">Unpaid Leave</option>
          </select>

          <label>Start Date</label>

          <input
            type="date"
            value={formData.start_date}
            onChange={(e) =>
              setFormData({
                ...formData,
                start_date: e.target.value,
              })
            }
            required
          />

          <label>End Date</label>

          <input
            type="date"
            value={formData.end_date}
            onChange={(e) =>
              setFormData({
                ...formData,
                end_date: e.target.value,
              })
            }
            required
          />

          <label>Reason</label>

          <textarea
            value={formData.reason}
            onChange={(e) =>
              setFormData({
                ...formData,
                reason: e.target.value,
              })
            }
            placeholder="Enter reason for leave"
            required
          />

          <div>
            <button type="submit" className="primary-button">
              {editingId ? "Update Leave" : "Submit Leave"}
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>

        </form>
      )}

      <div className="employee-table">

        <div className="table-header">
          <span>Employee</span>
          <span>Leave Type</span>
          <span>Start Date</span>
          <span>End Date</span>
          <span>Status</span>
        </div>

        {leaves.map((leave) => (
          <div className="table-row" key={leave.id}>

            <span>
              <strong>
                {getEmployeeName(leave.employee)}
              </strong>
            </span>

            <span>{leave.leave_type}</span>

            <span>{leave.start_date}</span>

            <span>{leave.end_date}</span>

           <div>
  <span
  className={`status-badge ${leave.status.toLowerCase()}`}>
  {leave.status}
</span>

  {leave.status === "PENDING" && (
    <>
      <button
        onClick={() => updateLeaveStatus(leave.id, "APPROVED")}
        className="approve-button"
      >
        Approve
      </button>

      <button
        onClick={() => updateLeaveStatus(leave.id, "REJECTED")}
        className="reject-button"
      >
        Reject
      </button>
    </>
  )}
<button
  type="button"
  onClick={() => editLeave(leave)}
  className="edit-button"
>
  Edit
</button>

<button
  type="button"
  onClick={() => deleteLeave(leave.id)}
  className="delete-button"
>
  Delete
</button>

</div>

          </div>
        ))}

      </div>

      {leaves.length === 0 && (
        <p>No leave requests found.</p>
      )}

    </div>
  );
}

export default Leaves;