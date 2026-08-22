import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        {
          username: username,
          password: password,
        }
      );

     localStorage.setItem("token", response.data.token);
localStorage.setItem("username", response.data.username);
localStorage.setItem("role", response.data.role);

alert("Login successful!");
navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid username or password.");
    }
  };

  return (
    <div className="page">

      <div className="page-header">
        <div>
          <h2>Login</h2>
          <p>Sign in to your DayFlow HRMS account.</p>
        </div>
      </div>

      <form
        onSubmit={handleLogin}
        className="attendance-form"
      >

        <label>Username</label>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          required
        />

        <label>Password</label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />

        <button
          type="submit"
          className="primary-button"
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;