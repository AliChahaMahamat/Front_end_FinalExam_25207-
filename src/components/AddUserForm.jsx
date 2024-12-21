import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style/AddUserForm.css";

const AddUserForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        fullName: "",
        email: "",
        dob: "",
        idType: "",
        idNumber: "",
        accountType: "Savings",
        phoneNumber: "",
        password: "",
        role: "ROLE_USER",
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // React Router hook for navigation

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token"); // Retrieve admin token
            await axios.post("http://localhost:8083/api/auth/signup", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage("User added successfully!");
            setFormData({
                username: "",
                fullName: "",
                email: "",
                dob: "",
                idType: "",
                idNumber: "",
                accountType: "Savings",
                phoneNumber: "",
                password: "",
                role: "ROLE_USER",
            });
            setTimeout(() => navigate("/admin-dashboard"), 2000); // Redirect after 2 seconds
        } catch (error) {
            setMessage(error.response?.data || "Failed to add user.");
        }
    };

    const handleCancel = () => {
        navigate("/admin-dashboard"); // Redirect to Admin Dashboard on cancel
    };

    return (
        <div className="add-user-container">
            <form onSubmit={handleSubmit}>
                <h2>Add User</h2>
                {message && <p className={message.includes("successfully") ? "success" : "error"}>{message}</p>}
                <div className="input-group">
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        placeholder="Full Name"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder="Email"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <select name="idType" value={formData.idType} onChange={handleChange} required>
                        <option value="">Select ID Type</option>
                        <option value="Passport">Passport</option>
                        <option value="NationalID">National ID</option>
                    </select>
                    <input
                        type="text"
                        name="idNumber"
                        value={formData.idNumber}
                        placeholder="ID Number"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <select name="accountType" value={formData.accountType} onChange={handleChange}>
                        <option value="Savings">Savings</option>
                        <option value="Checking">Checking</option>
                    </select>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        placeholder="Phone Number"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                    <select name="role" value={formData.role} onChange={handleChange}>
                        <option value="ROLE_USER">ROLE_USER</option>
                        <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                    </select>
                </div>
                <div className="form-actions">
                    <button type="submit">Add User</button>
                    <button type="button" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddUserForm;
