import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style/ProfileManagement.css";

const ProfileManagement = () => {
    const [profile, setProfile] = useState({
        username: "",
        email: "",
        phoneNumber: "",
        fullName: "",
        profilePicture: null,
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch User Profile on Component Mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:8083/api/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProfile(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user details:", error);
                navigate("/signin");
            }
        };
        fetchProfile();
    }, [navigate]);

    // Handle Input Changes for Editable Fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    // Handle File Change for Profile Picture
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setProfile((prev) => ({ ...prev, profilePicture: file }));
        } else {
            alert("Please select a valid image file.");
        }
    };

    // Handle Profile Update (Full Name and Phone Number)
    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem("token");
            const { phoneNumber, fullName } = profile;
            await axios.put(
                "http://localhost:8083/api/profile",
                { phoneNumber, fullName },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Profile updated successfully!");
        } catch (err) {
            console.error("Error updating profile:", err.response || err);
            setError("Failed to update profile.");
        }
    };

    // Handle Profile Picture Upload
    const handleUpload = async () => {
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("file", profile.profilePicture);

            await axios.post("http://localhost:8083/api/profile/upload-picture", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            // Fetch updated profile
            const response = await axios.get("http://localhost:8083/api/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProfile(response.data);
            alert("Profile picture updated successfully!");
        } catch (err) {
            console.error("Error uploading profile picture:", err.response || err);
            setError("Failed to upload profile picture.");
        }
    };

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-management">
            <h2>Profile Management</h2>
            <button onClick={handleLogout} className="logout-button">
                Logout
            </button>
            {error && <div className="error">{error}</div>}
            <div className="profile-container">
                <div className="profile-header">
                    {profile.profilePicture ? (
                        <img
                            src={profile.profilePicture} // Use URL from API response
                            alt="Profile"
                            className="profile-picture"
                        />
                    ) : (
                        <div className="placeholder">
                            <span>Profile</span>
                        </div>
                    )}
                </div>
                <div className="profile-form">
                    <label>Username:</label>
                    <input type="text" value={profile.username} readOnly />

                    <label>Email:</label>
                    <input type="text" value={profile.email} readOnly />

                    <label>Full Name:</label>
                    <input
                        type="text"
                        name="fullName"
                        value={profile.fullName}
                        onChange={handleInputChange}
                    />

                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={profile.phoneNumber}
                        onChange={handleInputChange}
                    />

                    <label>Profile Picture:</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} />

                    <div className="actions">
                        <button onClick={handleUpdate}>Update Profile</button>
                        <button onClick={handleUpload}>Upload Picture</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileManagement;
