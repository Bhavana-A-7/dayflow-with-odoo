import { useEffect, useState } from "react";
import axios from "axios";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

const [formData, setFormData] = useState({
  employee: "",
  date: "",
  check_in: "",
  check_out: "",
  status: "PRESENT",
});

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/attendance/")
      .then((response) => {
        setAttendance(response.data);
      })
      .catch((error) => {
        console.error("Attendance API error:", error);
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
    `http://127.0.0.1:8000/api/attendance/${editingId}/`,
    formData
  );

  setAttendance(
    attendance.map((record) =>
      record.id === editingId ? response.data : record
    )
  );
} else {
  response = await axios.post(
    "http://127.0.0.1:8000/api/attendance/",
    formData
  );

  setAttendance([...attendance, response.data]);
}
    setShowForm(false);
setEditingId(null);
    setFormData({
      employee: "",
      date: "",
      check_in: "",
      check_out: "",
      status: "PRESENT",
    });
  } catch (error) {
    console.error("Failed to mark attendance:", error);
    alert("Failed to mark attendance. Please check the details.");
  }
};
const deleteAttendance = async (id) => {
  if (!window.confirm("Are you sure you want to delete this attendance record?")) {
    return;
  }

  try {
    await axios.delete(
      `http://127.0.0.1:8000/api/attendance/${id}/`
    );

    setAttendance(
      attendance.filter((record) => record.id !== id)
    );
  } catch (error) {
    console.error("Failed to delete attendance:", error);
    alert("Failed to delete attendance.");
  }
};

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Attendance</h2>
          <p>Track employee attendance and working hours.</p>
        </div>

        <button
  className="primary-button"
  onClick={() => setShowForm(true)}
>
  + Mark Attendance
</button>
      </div>

{showForm && (
  <form onSubmit={handleSubmit} className="attendance-form">
    <h3>Mark Attendance</h3>

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

    <label>Date</label>
    <input
      type="date"
      value={formData.date}
      onChange={(e) =>
        setFormData({
          ...formData,
          date: e.target.value,
        })
      }
      required
    />

    <label>Check In</label>
    <input
      type="time"
      value={formData.check_in}
      onChange={(e) =>
        setFormData({
          ...formData,
          check_in: e.target.value,
        })
      }
    />

    <label>Check Out</label>
    <input
      type="time"
      value={formData.check_out}
      onChange={(e) =>
        setFormData({
          ...formData,
          check_out: e.target.value,
        })
      }
    />

    <label>Status</label>
    <select
      value={formData.status}
      onChange={(e) =>
        setFormData({
          ...formData,
          status: e.target.value,
        })
      }
    >
      <option value="PRESENT">Present</option>
      <option value="ABSENT">Absent</option>
      <option value="LATE">Late</option>
      <option value="HALF_DAY">Half Day</option>
    </select>

    <div>
      <button type="submit" className="primary-button">
        Save Attendance
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
          <span>Date</span>
          <span>Check In</span>
          <span>Check Out</span>
          <span>Status</span>
        </div>

        {attendance.map((record) => (
          <div className="table-row" key={record.id}>
            <span>
              <strong>
                {getEmployeeName(record.employee)}
              </strong>
            </span>

            <span>{record.date}</span>

            <span>{record.check_in || "--"}</span>

            <span>{record.check_out || "--"}</span>

            <span>{record.status.replace("_", " ")}</span>
           <button
  onClick={() => {
    setEditingId(record.id);
    setFormData({
      employee: record.employee,
      date: record.date,
      check_in: record.check_in || "",
      check_out: record.check_out || "",
      status: record.status,
    });
    setShowForm(true);
  }}
  className="edit-button"
>
  Edit
</button>
           <button onClick={() => deleteAttendance(record.id)} className="delete-button">
    Delete
  </button>
          </div>
        ))}
      </div>

      {attendance.length === 0 && (
        <p>No attendance records found.</p>
      )}
    </div>
  );
}

export default Attendance;