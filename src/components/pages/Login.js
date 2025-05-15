import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PasswordInput from "../PasswordInput";
import { motion } from "framer-motion";
import "../Profile.css";
import CUser from "../../UserRecoil";
import User_Token from "../Tokaerecoil";
import { useRecoilState } from "recoil";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState(null);
  const [user, setUser] = useRecoilState(CUser);
  const [token, setToken] = useRecoilState(User_Token);
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
      // alert('Login successful');
    //   return(
    //   <Sidebar user={user}></Sidebar>)
// const profile = await axios.get(`http://localhost:5000/api/users/${user.id}`);
      // console.log(profile.data);
      // setUser(profile.data);
    
      navigate('/dashboard'); 
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/profile");
  };

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
          </div>
        </div>
      }</motion.div>
  );
}


