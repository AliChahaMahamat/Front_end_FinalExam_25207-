import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style/Notifications.css";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Fetch notifications on component mount
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    setError("User is not logged in");
                    setLoading(false);
                    return;
                }

                const response = await axios.get("http://localhost:8083/api/notifications", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setNotifications(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching notifications:", err);
                setError("Failed to fetch notifications.");
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    // Render loading state, error state, or notifications
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="notifications-container">
            <h2>Notifications</h2>
            <div className="notifications-list">
                {notifications.length === 0 ? (
                    <p>No notifications found.</p>
                ) : (
                    notifications.map((notification) => (
                        <div key={notification.id} className="notification-card">
                            <p><strong>Message:</strong> {notification.message}</p>
                            <p><strong>Full Name:</strong> {notification.user.fullName}</p>
                            <p><strong>Email:</strong> {notification.user.email}</p>
                            <p><strong>Created At:</strong> {new Date(notification.createdAt).toLocaleString()}</p>
                            <p>
                                <strong>Sender Account Number:</strong>{" "}
                                {notification.message.match(/\d{10}/) ? notification.message.match(/\d{10}/)[0] : "N/A"}
                            </p>
                        </div>
                    ))
                )}
            </div>
            <button onClick={() => navigate("/user-dashboard")} className="btn-back">
                Back to Dashboard
            </button>
        </div>
    );
};

export default Notifications;
