import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import the useTranslation hook
import "./style/SignIn.css";

const SigninForm = () => {
    const { t } = useTranslation(); // Access translation function
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Track loading state
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Start loading spinner
        console.time("Login Process"); // Start timer for debugging
        try {
            const response = await axios.post("http://localhost:8083/api/auth/login", formData);
            console.timeLog("Login Process", "Response received");

            const { token, roles } = response.data;

            if (!token || !roles) {
                throw new Error("Invalid response from the server. Please contact support.");
            }

            localStorage.setItem("token", token); // Store token
            console.timeLog("Login Process", "Token stored");
            setMessage(t("signin.success")); // Display success message

            // Normalize and navigate based on role
            const normalizedRole = roles.replace("ROLE_", "");
            if (normalizedRole === "ADMIN") {
                navigate("/admin-dashboard");
            } else if (normalizedRole === "USER") {
                navigate("/user-dashboard");
            } else {
                throw new Error("Unknown role. Please contact support.");
            }
        } catch (error) {
            console.timeEnd("Login Process"); // End timer on error
            setMessage(error.response?.data || t("signin.failure")); // Display error message
        } finally {
            setIsLoading(false); // Stop loading spinner
            console.timeEnd("Login Process"); // End timer
        }
    };

    return (
        <div className="signin_page">
            <div className="login_form_container">
                <form className="login_form" onSubmit={handleSubmit}>
                    <h2>{t("signin.title")}</h2> {/* Use translation for title */}
                    {message && <p className="message">{message}</p>} {/* Display messages */}
                    {isLoading && <div className="spinner">Calling API, please wait...</div>} {/* Display loading spinner */}
                    <div className="input_group">
                        <input
                            type="text"
                            className="input_text"
                            name="username"
                            placeholder={t("signin.username")} // Translate username placeholder
                            onChange={handleChange}
                            value={formData.username}
                        />
                    </div>
                    <div className="input_group">
                        <input
                            type="password"
                            className="input_text"
                            name="password"
                            placeholder={t("signin.password")} // Translate password placeholder
                            onChange={handleChange}
                            value={formData.password}
                        />
                    </div>
                    <button id="signin_login_button" type="submit" disabled={isLoading}>
                        {t("signin.submit")}
                    </button> {/* Translate button text */}
                    <div className="signin_forgot_password">
                        <Link to="/forgot-password">{t("signin.forgotPassword")}</Link> {/* Translate forgot password link */}
                    </div>
                    <div className="signin_social_buttons">
                        <div className="social_button_pair">
                            <button type="button" className="signin_social_button signin_google_button" disabled>
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
                                    alt="Google logo"
                                />
                                {t("signin.google")}
                            </button>
                            <button type="button" className="signin_social_button signin_facebook_button" disabled>
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                                    alt="Facebook logo"
                                />
                                {t("signin.facebook")}
                            </button>
                        </div>
                    </div>
                    <div className="signin_footer">
                        <p className="sigin-text">
                            {t("signin.noAccount")}{" "}
                            <Link to="/signup" className="signin-link">
                                {t("signup.submit")}
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SigninForm;
