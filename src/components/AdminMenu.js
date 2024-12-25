import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style/UserDashboard.css";
import AdminDashboard from "./AdminDashboard";

const AdminMenu = () => {
    const [userDetails, setUserDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user details on mount
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem("token"); // Get the token
                const response = await axios.get("http://localhost:8083/api/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserDetails(response.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
                navigate("/signin"); // Redirect to signin if there's an issue
            }
        };
        fetchUserDetails();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin"); // Redirect to sign-in on logout
    };

    if (!userDetails) {
        return <div>Loading...</div>; // Show a loading message while fetching details
    }

    return (
        <div className="dashboard-container">
            {/* Top Bar */}
            <div className="dashboard-topbar">
                <div className="profile-header">
                    {userDetails.profilePicture ? (
                        <img
                            src={userDetails.profilePicture}
                            alt="Profile"
                            className="profile-picture"
                        />
                    ) : (
                        <div className="profile-placeholder">No Image</div>
                    )}
                    <div className="profile-info">
                        <h3>Welcome, {userDetails.fullName}!</h3>
                        <p>Your role is: <strong>{userDetails.roles ? userDetails.roles[0] : "User"}</strong></p>
                    </div>
                </div>
                <button className="dashboard-logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            <div className="dashboard-content">
                {/* Sidebar */}
                <div className="dashboard-sidebar">
                    <nav className="sidebar-menu">
                        <ul>
                            <li onClick={() => navigate("/account-overview")}>Account Overview</li>
                            <li onClick={() => navigate("/transaction-history")}>Transaction History</li>
                            <li onClick={() => navigate("/money-transfer")}>Money Transfer</li>
                            <li onClick={() => navigate("/notifications")}>Notifications</li>
                            <li onClick={() => navigate("/admin-dashboard")}>Manage All Users</li>
                            <li onClick={() => navigate("/profile-management")}>Profile Management</li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default AdminMenu;
