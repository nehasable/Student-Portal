import React, { useState } from 'react';
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import "./SignIn.css";

const SignIn = ({}) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  // const [role, setRole] = useState("");
  const [roles,setRoles]=useState([])
  const [error, setError] = useState("");
  const navigate = useNavigate();
 


  const handleLogin = async () => {
    try {
      console.log("bbbb")
      
     
      const response = await axios.post("http://localhost:8088/signin", { password, mobileNo });
      const { token, user ,roles} = response.data;
      console.log(user)
      console.log(response.data)
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      // navigate('/student')
      setError("")
      // setRole(role)
      setRoles(roles)
      console.log(roles)
      // Redirect to dashboard or another page
    } catch (err) {
      setError(err.response?.data?.message || 'Error signing in');
    }
  };

  return (
    <div>
      
      <div className="login-container">
        <h2>Sign In</h2>
        {/* <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /> */}
          <input
          type="text"
          placeholder="Mobile No"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
       
        
        <button onClick={handleLogin}  >Login</button>
        {error && <p>{error}</p>}

        
        {roles.length > 1 && (
          <div>
            {roles.includes('student') && (
              <Link to="/student">Login as Student</Link>
            )}
            {roles.includes('teacher') && (
              <Link to="/teacher">Login as Teacher</Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;
