import React, { useState, useRef } from "react";
import PasswordInput from "../PasswordInput";
import { motion } from "framer-motion";
import "../Profile.css";
import { useNavigate } from "react-router-dom";
import CUser from "../../UserRecoil";
import { useRecoilState } from "recoil";
import axios from "axios";
const Profile = () => {
  const [user, setUser] = useRecoilState(CUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [editMode, setEditMode] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef();


  const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  }
};


  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        name: name || user.name,
        email: email || user.email,
        profileImage: profileImage || user.profileImage
      };

      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/api/auth/profile', updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Update the user state with the new data
      setUser(response.data.user);
      setSaveSuccess(true);
      setEditMode(false);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
    >

      {
        <div className="profile-container">
          <h2 className="profile-font">Profile</h2>
          <div className="profile-box">
            <div className="profile-box">
              <img
                src={user.profileImage || "https://via.placeholder.com/120x120"}
                alt="Profile Picture"
                className="profile-image"
                onClick={() => {
                  if (editMode) inputRef.current.click();
                }}
                style={{ cursor: editMode ? "pointer" : "default" }} 

              />{ }

              <input
                type="text"
                value={user.profileImage}
                disabled={!editMode}
                onChange={(e) => setUser({...user,profileImage:e.target.value})}
                
              />
            </div>
            <div className="profile-info">
              <label>Name</label>
              <input
                type="text"
                value={user.name}
                disabled={!editMode}
                onChange={(e) => setUser({...user,name:e.target.value})}
                className="profile-input"
              />

              <label>Email</label>
              <input
                type="email"
                value={user.email}
                disabled={!editMode}
              //  onChange={(e) => setEmail(e.target.value)}
                onChange={(e) => setUser({...user,email:e.target.value})}
              
                className="profile-input"
              />
  <label>ID</label>
                <input
                type="text"
                value={user._id}
                disabled={!editMode}
               
                className="profile-input"
              />
              
              {editMode ? (
                <button
                  type="submit" onClick={handleSave} disabled={isSaving} className="profile-btn">
                  {isSaving ? "Saving..." : saveSuccess ? "Save " : "Save Changes"}
                </button>
              ) : (<button onClick={() => setEditMode(true)} className="profile-btn">Edit Profile</button>)}

            </div>
          </div>
        </div>}
    </motion.div>
  );
};

export default Profile;
