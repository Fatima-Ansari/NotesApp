import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/auth/register", { name, email, password });
      if(response.data.success){
        navigate('/')
    }
      setResponseMessage("Account created successfully!");
      console.log(response.data);
    } catch (error) {
      setResponseMessage("Error: Unable to register.");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="border shadow w-80 bg-white p-4">
        <h2 className="text-2xl font-bold mb-4">Signup form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border"
              type="text"
              placeholder="Enter name"
              id="name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">
              Email
            </label>
            <input
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
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border"
              type="password"
              placeholder="Enter password"
              id="password"
              required
            />
          </div>
          <button type="submit" className="w-full bg-teal-600 text-white py-2">
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4">{responseMessage}</p>
        <p className="text-center mt-2">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

