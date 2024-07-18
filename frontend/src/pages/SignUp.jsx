import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import "./SignUp.css"
const SignUp = ({role}) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  // const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  

  const handleSignUp = async () => {
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobileNo)) {
      setError('Invalid mobile number. It should be 10 digits.');
      return;
    }

 try {
      const response = await axios.post("http://localhost:8088/user", {
        name,
        password,
        mobileNo,
        role
      });
     
      const { user } = response.data;

      // navigate based on role
      if (role === 'student') {
        navigate('/student');
      } else if (role === 'teacher') {
        navigate('/teacher');
      } else {
       
        setError('Invalid role');
      }
      console.log(role)
    } catch (err) {
      setError(err.response?.data?.message || 'Error signing up');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Name"
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
       {/* <select value={role} onChange={(e) => setRole(e.target.value)}>
       <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select> */}
      <button onClick={handleSignUp}>Sign Up</button>
      {error && <p>{error}</p>}
      <Link to="/signin">Already have an account? Login here.</Link>
    </div>
  );
}

export default SignUp;
