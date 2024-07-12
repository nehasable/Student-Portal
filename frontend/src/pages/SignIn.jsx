import React from 'react'
import { useState } from 'react';
import { Link } from "react-router-dom";
import "./SignIn.css";

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const handleLogin = async () => {
      try {
        const response = await axios.post("http://localhost:8000/auth/login", {
          username,
          password,
        });
        const { token, user } = response.data;
        console.log(token);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        // Redirect to dashboard or another page
      } catch (err) {
        setError(err.response.data.message);
      }
    };
  return (
    <div>
       <div className="login-container">
      <h2>Sign In</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type='text'
        placeholder='Role'
      />
      <Link to="/"><button onClick={handleLogin}>Login</button></Link>
      {error && <p>{error}</p>}
    </div>
    </div>
  )
}

export default SignIn
