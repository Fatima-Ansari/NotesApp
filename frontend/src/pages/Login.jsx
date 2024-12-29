import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Access the login function from the context

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/api/auth/login", { email, password });

      if (response.data.success) {
        // Save user data to context
        login(response.data.user);

        // Store the token to localStorage
        localStorage.setItem("token", response.data.token);

        // Navigate to the homepage after successful login
        navigate("/");
      } else {
        // Show error message if login fails
        setResponseMessage(response.data.message || "Invalid email or password.");
      }
    } catch (error) {
      // Handle any other errors
      setResponseMessage("Error: Unable to log in.");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="border shadow w-80 bg-white p-4">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border"
              type="email"
              placeholder="Enter email"
              id="email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border"
              type="password"
              placeholder="Enter password"
              id="password"
              required
            />
          </div>
          <button type="submit" className="w-full bg-teal-600 text-white py-2">
            Login
          </button>
        </form>
        {responseMessage && <p className="text-center mt-4 text-red-500">{responseMessage}</p>}
        <p className="text-center mt-2">
          Don't have an account? <Link to="/signup" className="text-teal-600">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
