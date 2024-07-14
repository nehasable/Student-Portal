import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await axios.post("http://localhost:8088/user", {
        name,
        password,
        mobileNo,
        role
      });

      if (response.data) {
        console.log('User signed up successfully');
        navigate('/'); // redirect to dashboard
      } else {
        console.log('Unexpected response format:', response);
        setError('Unexpected response from the server');
      }
    } catch (err) {
      console.error('Error during signup:', err);
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type='text'
        placeholder='Mobile No'
        value={mobileNo}
        onChange={(e) => setMobileNo(e.target.value)}
      />
      <input
        type='text'
        placeholder='Role'
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      {error && <p>{error}</p>}
      <Link to="/signin">Already have an account? Login here.</Link>
    </div>
  );
}

export default SignUp;
