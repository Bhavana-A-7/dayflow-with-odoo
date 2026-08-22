import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://127.0.0.1:8000/api/my-profile/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error("Profile API error:", error);

        if (error.response) {
          setError(
            error.response.data?.detail ||
            `Server error: ${error.response.status}`
          );
        } else {
          setError("Cannot connect to the server.");
        }
      });
  }, []);

  if (error) {
    return (
      <div className="page">
        <h2>My Profile</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="page">
        <h2>My Profile</h2>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="page">

      <div className="page-header">
        <div>
          <h2>My Profile</h2>
          <p>View your personal and job details.</p>
        </div>
      </div>

      <div className="employee-table">

        <div className="table-row">
          <strong>Employee ID</strong>
          <span>{profile.employee_id}</span>
        </div>

        <div className="table-row">
          <strong>Name</strong>
          <span>
            {profile.first_name} {profile.last_name}
          </span>
        </div>

        <div className="table-row">
          <strong>Email</strong>
          <span>{profile.email}</span>
        </div>

        <div className="table-row">
          <strong>Phone</strong>
          <span>{profile.phone}</span>
        </div>

        <div className="table-row">
          <strong>Department</strong>
          <span>
            {profile.department || "-"}
          </span>
        </div>

        <div className="table-row">
          <strong>Job Title</strong>
          <span>{profile.job_title}</span>
        </div>

        <div className="table-row">
          <strong>Date Joined</strong>
          <span>{profile.date_joined}</span>
        </div>

        <div className="table-row">
          <strong>Status</strong>
          <span>
            {profile.is_active ? "Active" : "Inactive"}
          </span>
        </div>

      </div>

    </div>
  );
}

export default Profile;