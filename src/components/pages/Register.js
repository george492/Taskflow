import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import PasswordInput from "../PasswordInput";
import { motion } from "framer-motion";
import axios from "axios";


export default function Register() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState(null);
  const inputRef = useRef();

  // const [formData, setFormData] = useState({
  //   name: name,
  //   email: email,
  //   password: password,
  //   profileImage: image
  // });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
      try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name: name,
        email: email,
        password: password,
        profileImage: image
      });
      console.log('Registration successful:', response.data);
      navigate('/login'); // Redirect to login after registration
    } catch (err) {
      alert('Registration failed');
      console.error('Registration error:', err);
    }

    navigate("/login");
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
    >
      {
    <div className="profile-container" >
      <h2 className="profile-font">Create an account</h2>
      <p className="profile-font">Join us by entering your details below.</p>
 
      <form onSubmit={handleRegister} className="profile-box">

        <div>
        <div
          
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            border: "2px dashed #ccc",
            backgroundSize: "cover",
            backgroundPosition: "center",
                       cursor: "pointer",
            margin: "0 auto",
          }}
        ></div>

        

        <p style={{ margin: "10px 0px 0px 30px" }}> add a Profile Photo</p>
        <input
          type="text"
          placeholder="Profile Image"
          onChange={handleImageChange}
          style={{margin:"10px 0px",padding:"10px",borderRadius:"10px",border:"none #ccc",outline:"none"}}
        />
      </div>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="profile-input"
        />

        <input
          type="email"
          placeholder="Email"
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


        <button type="submit" className="profile-btn">Register</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
      
    </div>}
</motion.div>
  );
}

/*const styles = {
  container: { maxWidth: 400, margin: "auto", textAlign: "center", fontFamily: "cursive" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  input: { padding: 10, fontSize: 16, borderRadius: "10px", fontFamily: "cursive",transition: "all 0.3s ease",border: "1px solid #ccc" },
  button: { padding: 10, fontSize: 16, backgroundColor: "#0d6efd", color: "#fff", border: "none", borderRadius: "10px", fontFamily: "cursive", cursor: "pointer" },
};*/

