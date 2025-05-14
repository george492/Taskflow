import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import { motion } from "framer-motion";


export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState(null);


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
          <form onSubmit={handleRegister} className="profile-info">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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


