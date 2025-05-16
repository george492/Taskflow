import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PasswordInput from "../PasswordInput";
import { motion } from "framer-motion";
import "../Profile.css";
import CUser from "../../UserRecoil";
import User_Token from "../Tokaerecoil";
import { useRecoilState } from "recoil";
import axios from "axios";
import Alert from '@mui/material/Alert';
// 
// import { Alert } from "bootstrap";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState(null);
  const [user, setUser] = useRecoilState(CUser);
  const [token, setToken] = useRecoilState(User_Token);
  const[errorlogin, setErrorlogin] = useState(false);
  const[count, setCount] = useState(0);
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password: password
      });

      const { token, ...userData } = res.data;
      setToken(token);
      setUser(userData);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
  
    
      navigate('/dashboard'); 
    } catch (err) {
      // console.log("no no",res.data);
      // console.error("no no",err.response.data);
      setErrorlogin(true);
      setCount(count + 1);
      setTimeout(() => {
        setErrorlogin(false);
      }, 3000);
      return;
      // alert('Login failed');
    }
  };
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/profile");
  };
useEffect(() => {
  if(count >=3){
    setErrorlogin(false);
    setCount(0);
    navigate("/register");
  }
}, [count]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
    >
      {
        <div className="pape-container">
          

        <div className="profile-box">
          <h2>Welcome Back!</h2>
          <p>Please enter your data to log in</p>
          <form onSubmit={handleLogin} className="profile-info">
            <input
              type="text"
              placeholder="Full Name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="profile-input"
            />

            <PasswordInput
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />


            <button type="submit" className="profile-btn">Login</button>

            <p>Don't have an account yet? <Link to="/register">Register</Link></p>

          </form>
          <div className={errorlogin ? "error-login" : "error-login-hidden"}>
            <Alert severity="error">Invalid email or password</Alert>
          </div>
          </div>
        </div>
      }</motion.div>
  );
}


