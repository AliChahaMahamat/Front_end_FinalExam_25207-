import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style/MoneyTransfer.css";

const MoneyTransfer = () => {
    const [senderAccountNumber, setSenderAccountNumber] = useState("");
    const [receiverAccountNumber, setReceiverAccountNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleTransfer = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `http://localhost:8083/api/transfer`,
                null, // No body, parameters are passed in query string
                {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { senderAccountNumber, receiverAccountNumber, amount },
                }
            );

            setMessage(response.data.message);
            setSenderAccountNumber("");
            setReceiverAccountNumber("");
            setAmount("");
        } catch (err) {
            console.error("Error during money transfer:", err);
            setError(err.response?.data?.message || "Failed to transfer money");
        }
    };

    return (
        <div className="money-transfer-container">
            <h2>Money Transfer</h2>
            <form onSubmit={handleTransfer}>
                <div className="form-group">
                    <label>Sender Account Number:</label>
                    <input
                        type="text"
                        value={senderAccountNumber}
                        onChange={(e) => setSenderAccountNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Receiver Account Number:</label>
                    <input
                        type="text"
                        value={receiverAccountNumber}
                        onChange={(e) => setReceiverAccountNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        min="1"
                    />
                </div>
                <button type="submit">Transfer Money</button>
            </form>

            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default MoneyTransfer;
