import axios from 'axios';

const API_URL = "http://localhost:8083/api/admin"; // Your backend URL

export const getAllUsersWithAccounts = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("Token not found. Redirecting to login...");
        throw new Error("Unauthorized: Token not found");
    }

    try {
        console.log("Attempting to fetch users with accounts...");
        console.log("Token:", token);

        const response = await axios.get(`${API_URL}/users-with-accounts`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("Response received:", response.data);
        return response.data; // Returns the list of users with accounts
    } catch (error) {
        handleError(error);
    }
};

// Download all users as a file
export const downloadUsers = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("Token not found. Redirecting to login...");
        throw new Error("Unauthorized: Token not found");
    }

    try {
        console.log("Attempting to download users...");
        console.log("Token:", token);

        const response = await axios.get(`${API_URL}/download-users`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            responseType: 'blob' // Ensures the response is treated as a file (binary data)
        });

        // Create a link to download the file
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'users.csv'); // Adjust file name and extension as needed
        document.body.appendChild(link);
        link.click();
        link.remove();

        console.log("Download initiated successfully.");
    } catch (error) {
        handleError(error);
    }
};



// Delete account by ID
export const deleteAccount = async (accountNumber) => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("Token not found. Redirecting to login...");
        throw new Error("Unauthorized: Token not found");
    }

    try {
        const response = await axios.delete(`${API_URL}/accounts/${accountNumber}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Account deleted successfully:", response.data);
    } catch (error) {
        console.error("Error deleting account:", error);
        throw error;
    }
};


// Edit account by ID
export const updateUserDetails = async (userId, userDetails) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Unauthorized: Token not found");
    }

    try {
        const response = await axios.put(
            `http://localhost:8083/api/admin/users/${userId}`,
            userDetails,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        console.log("User updated successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to update user:", error);
        throw error;
    }
};

// Centralized error handling
const handleError = (error) => {
    console.error("API error:", error);

    if (error.response) {
        console.error("Error Response Status:", error.response.status);
        console.error("Error Response Data:", error.response.data);

        if (error.response.status === 403 || error.response.status === 401) {
            throw new Error("Unauthorized: Please log in again.");
        }
    } else if (error.request) {
        console.error("No response received:", error.request);
    } else {
        console.error("Error message:", error.message);
    }

    throw error;
};
