import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsersWithAccounts, deleteAccount } from "../services/api";
import "./style/AdminDashboard.css";
import AddUserForm from "./AddUserForm";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [, setSortField] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Number of users per page
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getAllUsersWithAccounts();
                setUsers(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load users.");
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (field) => {
        const sortedUsers = [...users].sort((a, b) => {
            if (a[field] < b[field]) return -1;
            if (a[field] > b[field]) return 1;
            return 0;
        });
        setUsers(sortedUsers);
        setSortField(field);
    };

    const filteredUsers = users.filter(
        (user) =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const handleDownload = async () => {
        const confirmed = window.confirm("Are you sure you want to download the user data?");
        if (!confirmed) return;

        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to download user data.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8083/api/admin/download-users", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "users_data.csv";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            } else {
                alert("Failed to download file. Please check your permissions or try again later.");
            }
        } catch (error) {
            console.error("Error downloading file:", error);
            alert("An error occurred while downloading the file.");
        }
    };

    const handleDelete = async (accountId) => {
        const confirmed = window.confirm("Are you sure you want to delete this account?");
        if (!confirmed) return;

        try {
            await deleteAccount(accountId);
            setUsers((prev) =>
                prev.map((user) => ({
                    ...user,
                    accounts: user.accounts.filter((acc) => acc.accountNumber !== accountId),
                }))
            );
            alert("Account deleted successfully!");
        } catch (error) {
            console.error("Failed to delete account:", error);
            alert("An error occurred while deleting the account. Please try again.");
        }
    };

    const handleEdit = (user) => {
        navigate(`/edit-user/${user.id}`, { state: { user } });
    };

    const refreshUsers = async () => {
        try {
            const data = await getAllUsersWithAccounts();
            setUsers(data);
        } catch (error) {
            console.error("Failed to refresh users:", error);
        }
    };

    // Handle Logout
    const handleLogout = () => {
        const confirmed = window.confirm("Are you sure you want to log out?");
        if (confirmed) {
            localStorage.removeItem("token"); // Clear the token
            navigate("/signin"); // Redirect to login page
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>

            <button
                onClick={handleLogout}
                style={{
                    position: "absolute",
                    top: "20px",
                    right: "40px",
                    padding: "10px 15px",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Logout
            </button>

            <h2>Admin Dashboard</h2>
            <div className="toolbar">
                <input
                    type="text"
                    placeholder="Search by username or full name"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <button onClick={() => setShowAddUserForm(true)}>Add User</button>
                <button onClick={handleDownload} style={{ marginLeft: "10px" }}>
                    Download Users
                </button>
            </div>
            {showAddUserForm && (
                <AddUserForm
                    onClose={() => setShowAddUserForm(false)}
                    onUserAdded={refreshUsers}
                />
            )}
            <table className="table">
                <thead>
                <tr>
                    <th onClick={() => handleSort("username")}>Username</th>
                    <th onClick={() => handleSort("fullName")}>Full Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Role</th>
                    <th>Account Type</th>
                    <th>Account Number</th>
                    <th>Balance</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {paginatedUsers.map((user) =>
                    user.accounts.map((account, index) => (
                        <tr key={`${user.id}-${account.accountNumber}`}>
                            <td>{index === 0 ? user.username : ""}</td>
                            <td>{index === 0 ? user.fullName : ""}</td>
                            <td>{index === 0 ? user.email : ""}</td>
                            <td>{index === 0 ? user.phoneNumber : ""}</td>
                            <td>{index === 0 ? user.roles : ""}</td>
                            <td>{account.accountType}</td>
                            <td>{account.accountNumber}</td>
                            <td>{account.balance}</td>
                            <td>
                                <button
                                    onClick={() => handleEdit(user)}
                                    className="btn btn-primary btn-sm"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(account.accountNumber)}
                                    className="btn btn-danger btn-sm"
                                    style={{ marginLeft: "5px" }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
            <div className="pagination">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;
