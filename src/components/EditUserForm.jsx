import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import hooks
import { updateUserDetails } from "../services/api";
import "./style/EditUserForm.css"; // Import the CSS file

const EditUserForm = () => {
    const location = useLocation(); // Get the state passed with navigation
    const navigate = useNavigate();
    const user = location.state?.user; // Retrieve user data from state

    const [userDetails, setUserDetails] = useState({
        username: user?.username || "",
        fullName: user?.fullName || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        roles: user?.roles || "",
        accounts: user?.accounts || [],
    });

    const handleInputChange = (field, value) => {
        setUserDetails({ ...userDetails, [field]: value });
    };

    const handleAccountChange = (index, field, value) => {
        const updatedAccounts = [...userDetails.accounts];
        updatedAccounts[index][field] = value;
        setUserDetails({ ...userDetails, accounts: updatedAccounts });
    };

    const handleSave = async () => {
        const updatedUser = {
            ...userDetails,
            roles: userDetails.roles.split(",").map((role) => role.trim()) // Convert comma-separated roles to an array
        };

        try {
            console.log("Payload being sent to backend:", updatedUser);
            await updateUserDetails(user.id, updatedUser);
            navigate("/admin-dashboard");
        } catch (error) {
            console.error("Failed to update user details:", error);
        }
    };

    return (
        <div className="edit-form">
            <h3>Edit User</h3>
            <label>
                Username:
                <input
                    type="text"
                    value={userDetails.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                />
            </label>
            <br />
            <label>
                Full Name:
                <input
                    type="text"
                    value={userDetails.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                />
            </label>
            <br />
            <label>
                Email:
                <input
                    type="email"
                    value={userDetails.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                />
            </label>
            <br />
            <label>
                Phone Number:
                <input
                    type="text"
                    value={userDetails.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                />
            </label>
            <br />
            <label>
                Roles (comma-separated):
                <input
                    type="text"
                    value={userDetails.roles}
                    onChange={(e) => handleInputChange("roles", e.target.value)}
                />
            </label>
            <h4>Accounts</h4>
            {userDetails.accounts.map((account, index) => (
                <div key={account.accountNumber} className="account-edit">
                    <label>
                        Account Type:
                        <input
                            type="text"
                            value={account.accountType}
                            onChange={(e) => handleAccountChange(index, "accountType", e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Balance:
                        <input
                            type="number"
                            value={account.balance}
                            onChange={(e) => handleAccountChange(index, "balance", e.target.value)}
                        />
                    </label>
                    <br />
                </div>
            ))}
            <button onClick={handleSave} className="btn btn-primary">
                Save
            </button>
            <button onClick={() => navigate("/admin-dashboard")} className="btn btn-secondary" style={{ marginLeft: "5px" }}>
                Cancel
            </button>
        </div>
    );
};

export default EditUserForm;
