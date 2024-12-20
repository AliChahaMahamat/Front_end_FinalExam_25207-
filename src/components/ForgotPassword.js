import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [messageColor, setMessageColor] = useState(''); // Add a state for message color
    const navigate = useNavigate(); // React Router's navigation hook

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        if (!email.includes('@') || !email.includes('.')) {
            setResponseMessage('Please enter a valid email address.');
            setMessageColor('red'); // Invalid email
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8083/api/password-reset/forgot-password`, {
                email, // Send the email in the request body
            });
            setResponseMessage(response.data.message || 'Password reset link sent successfully.');
            setMessageColor('green'); // Success
        } catch (error) {
            setResponseMessage(error.response?.data?.message || 'Failed to send password reset link. Please try again.');
            setMessageColor('red'); // Failure
        }
    };

    const goToLogin = () => {
        navigate('/signin'); // Navigate to the login page
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
            <h2>Forgot Password</h2>
            <form onSubmit={handleForgotPassword}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Email Address:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', fontSize: '14px' }}
                    />
                </div>
                <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginRight: '10px' }}>
                    Send Link
                </button>
                <button
                    type="button"
                    onClick={goToLogin}
                    style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#ddd', border: 'none' }}
                >
                    Back to Login
                </button>
            </form>
            {responseMessage && (
                <p style={{ color: messageColor, marginTop: '15px', fontSize: '14px' }}>{responseMessage}</p>
            )}
        </div>
    );
};

export default ForgotPassword;
