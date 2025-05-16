import React, { useState, useRef } from "react";
import PasswordInput from "../PasswordInput";
import { motion } from "framer-motion";
import "../Profile.css";
import { useNavigate } from "react-router-dom";
import CUser from "../../UserRecoil";
import { useRecoilState } from "recoil";


const Profile = () => {
  const [user, setUser] = useRecoilState(CUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
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


  const handleSave = (e) => {
    e.preventDefault();
    if (!currentPassword) {
      alert("Please enter your current password to save changes.");
      return;
    }

    setIsSaving(true);
    setSaveSuccess(false);

    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);

      setTimeout(() => {
        setSaveSuccess(false);
        setEditMode(false);
        navigate("/profile");
      }, 1000);

    }, 1500);
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
                src={user.profileImage || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
                alt="Profile Picture"
                className="profile-image"
                onClick={() => {
                  if (editMode) inputRef.current.click();
                }}
                style={{ cursor: editMode ? "pointer" : "default" }} 

              />{ }

              <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>
            <div className="profile-info">
              <label>Name</label>
              <input
                type="text"
                value={user.name}
                disabled={!editMode}
                onChange={(e) => setName(e.target.value)}
                className="profile-input"
              />

              <label>Email</label>
              <input
                type="email"
                value={user.email}
                disabled={!editMode}
                onChange={(e) => setEmail(e.target.value)}
                className="profile-input"
              />

            </div>
          </div>
        </div>}
    </motion.div>
  );
};

export default Profile;
