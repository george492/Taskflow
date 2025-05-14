import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import { motion } from "framer-motion";


export default function Register() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState(null);
  const inputRef = useRef();


  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    

    navigate("/login");
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
          onClick={() => inputRef.current.click()}
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            border: "2px dashed #ccc",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: image
              ? `url(${URL.createObjectURL(image)})`
              : "url(https://via.placeholder.com/120x120?text=+)",
            cursor: "pointer",
            margin: "0 auto",
          }}
        ></div>

        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />

        <p style={{ marginTop: 10 }}>Tap to add a Profile Photo</p>
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

