import React, { useState, useRef } from "react";
import PasswordInput from "../components/PasswordInput";
import { motion } from "framer-motion";
import "../styles/Profile.css";
import { useNavigate } from "react-router-dom";



const Profile = () => {
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
                src={profileImage || "https://via.placeholder.com/120x120"}
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
                value={name}
                disabled={!editMode}
                onChange={(e) => setName(e.target.value)}
                className="profile-input"
              />

              <label>Email</label>
              <input
                type="email"
                value={email}
                disabled={!editMode}
                onChange={(e) => setEmail(e.target.value)}
                className="profile-input"
              />

              {editMode && (
                <>
                  <label>New Password</label>
                  <PasswordInput
                    label="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />

                  <label>Current Password <span style={{ color: "red" }}>*</span></label>
                  <PasswordInput label="Current Password *" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </>
              )}

              {editMode ? (
                <button
                  type="submit" onClick={handleSave} disabled={isSaving} className="profile-btn">
                  {isSaving ? "Saving..." : saveSuccess ? "Saved ✅" : "Save Changes"}
                </button>
              ) : (<button onClick={() => setEditMode(true)} className="profile-btn">Edit Profile</button>)}

            </div>
          </div>
        </div>}
    </motion.div>
  );
};

export default Profile;
