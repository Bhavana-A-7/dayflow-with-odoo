import { useEffect, useState } from "react";
import axios from "axios";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = () => {
    axios
      .get("http://127.0.0.1:8000/api/departments/")
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("Department API error:", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

if (editingId !== null) {
  response = await axios.put(
    `http://127.0.0.1:8000/api/departments/${editingId}/`,
    formData
  );

  setDepartments((currentDepartments) =>
    currentDepartments.map((department) =>
      department.id === editingId
        ? response.data
        : department
    )
  );
} else {
  response = await axios.post(
    "http://127.0.0.1:8000/api/departments/",
    formData
  );

  setDepartments((currentDepartments) => [
    ...currentDepartments,
    response.data,
  ]);
}

setShowForm(false);
setEditingId(null);

setFormData({
  name: "",
  description: "",
});
    } catch (error) {
      console.error("Failed to add department:", error);
      alert("Failed to add department.");
    }
  };
  const editDepartment = (department) => {
  setEditingId(department.id);

  setFormData({
    name: department.name,
    description: department.description || "",
  });

  setShowForm(true);
};
const deleteDepartment = async (id) => {
  if (
    !window.confirm(
      "Are you sure you want to delete this department?"
    )
  ) {
    return;
  }

  try {
    await axios.delete(
      `http://127.0.0.1:8000/api/departments/${id}/`
    );

    setDepartments((currentDepartments) =>
      currentDepartments.filter(
        (department) => department.id !== id
      )
    );
  } catch (error) {
    console.error("Failed to delete department:", error);
    alert("Failed to delete department.");
  }
};

  return (
    <div className="page">

      <div className="page-header">
        <div>
          <h2>Departments</h2>
          <p>Manage your organization's departments.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(true)}
        >
          + Add Department
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="attendance-form"
        >

        <h3> {editingId !== null ? "Edit Department" : "Add Department"} </h3>

          <label>Department Name</label>

          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            placeholder="Enter department name"
            required
          />

          <label>Description</label>

          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            placeholder="Enter department description"
          />

          <div>
            <button
              type="submit"
              className="primary-button"
            >
              {editingId !== null ? "Update Department" : "Add Department"}
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
          <span>ID</span>
          <span>Department</span>
          <span>Description</span>
        </div>

        {departments.map((department) => (
          <div
            className="table-row"
            key={department.id}
          >

            <span>{department.id}</span>

            <span>
              <strong>{department.name}</strong>
            </span>

            <span>
              {department.description || "-"}
            </span>
            <button
  type="button"
  onClick={() => editDepartment(department)}
  className="edit-button"
>
  Edit
</button>

<button
  type="button"
  onClick={() => deleteDepartment(department.id)}
  className="delete-button"
>
  Delete
</button>

          </div>
        ))}

      </div>

      {departments.length === 0 && (
        <p>No departments found.</p>
      )}

    </div>
  );
}

export default Departments;