import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style/AccountOverview.css";

const AccountOverview = () => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Fetch account details when the component mounts
    useEffect(() => {
        const fetchAccountDetails = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    setError("User is not logged in");
                    setLoading(false);
                    return;
                }

                const response = await axios.get(
                    "http://localhost:8083/api/account/overview",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                setAccounts(response.data); // Set the fetched accounts to state
                setLoading(false);
            } catch (err) {
                console.error("Error fetching account details:", err);
                setError("Failed to load account details.");
                setLoading(false);
            }
        };

        fetchAccountDetails();
    }, []); // Empty dependency array to run once on component mount

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    // Render loading state, error state, or account details
    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="account-overview">
            <header className="account-header">
                <h2>Account Overview</h2>
                <p>If you notice any discrepancies, please contact the administrator.</p>
                <div className="action-buttons">
                    <button onClick={() => navigate("/user-dashboard")} className="btn-back">
                        Back to Dashboard
                    </button>
                    <button onClick={handleLogout} className="btn-logout">
                        Logout
                    </button>
                </div>
            </header>
            <div className="account-list">
                {accounts.length === 0 ? (
                    <p className="no-accounts">No accounts found for this user.</p>
                ) : (
                    accounts.map((account) => (
                        <div key={account.id} className="account-card">
                            <p><strong>Account Type:</strong> {account.accountType}</p>
                            <p><strong>Account Number:</strong> {account.accountNumber}</p>
                            <p><strong>Balance:</strong> ${account.balance.toFixed(2)}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AccountOverview;
