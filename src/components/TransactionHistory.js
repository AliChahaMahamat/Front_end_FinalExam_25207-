import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style/TransactionHistory.css";

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTransactionHistory = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("User not authenticated");
                    setLoading(false);
                    return;
                }

                // Sending request with the Authorization header
                const response = await axios.get("http://localhost:8083/api/transactions/history", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setTransactions(response.data); // Set the fetched transactions to state
                setLoading(false);
            } catch (err) {
                console.error("Error fetching transaction history:", err);
                if (err.response && err.response.status === 401) {
                    setError("Session expired. Please login again.");
                } else {
                    setError("Failed to load transaction history.");
                }
                setLoading(false);
            }
        };

        fetchTransactionHistory();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin"); // Redirect to sign-in on logout
    };

    // Render loading state, error state, or transaction details
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="transaction-history">
            <h2>Transaction History</h2>
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>

            <div className="transaction-table">
                <table>
                    <thead>
                    <tr>
                        <th>Sender Account</th>
                        <th>Receiver Account</th>
                        <th>Amount</th>
                        <th>Transaction Date</th>
                        <th>User Full Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.length === 0 ? (
                        <tr>
                            <td colSpan="5">No transactions found for this user.</td>
                        </tr>
                    ) : (
                        transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.senderAccountNumber}</td>
                                <td>{transaction.receiverAccountNumber}</td>
                                <td>${transaction.amount.toFixed(2)}</td>
                                <td>{new Date(transaction.transactionDate).toLocaleString()}</td>
                                <td>{transaction.user.fullName}</td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
                <button onClick={() => navigate("/user-dashboard")} className="btn-back">
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default TransactionHistory;
