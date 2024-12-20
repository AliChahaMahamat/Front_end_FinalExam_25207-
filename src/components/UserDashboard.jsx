import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style/UserDashboard.css";

const UserDashboard = () => {
    const [userDetails, setUserDetails] = useState({});
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user details on mount
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem("token"); // Get the token
                const response = await axios.get("http://localhost:8083/api/user/details", {
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

    return (
        <div className="dashboard-container">
            {/* Top Bar */}
            <div className="dashboard-topbar">
                <button className="dashboard-logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            <div className="dashboard-content">
                {/* Sidebar */}
                <div className="dashboard-sidebar">
                    <nav className="sidebar-menu">
                        <ul>
                            <li>Account Overview</li>
                            <li>Transaction History</li>
                            <li>Money Transfer</li>
                            <li>Bill Payments</li>
                            <li>Notifications</li>
                            <li>Profile Management</li>
                        </ul>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="dashboard-main">
                    <h2>Welcome to Your Dashboard</h2>
                    <h2> {user ? user.username : "Users"}!</h2>
                    <p>Select an option from the sidebar to get started.</p>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
