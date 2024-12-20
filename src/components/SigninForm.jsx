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
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8083/api/auth/login", formData);
            const { token, roles } = response.data;

            if (!token || !roles) {
                throw new Error("Invalid response from the server. Please contact support.");
            }

            localStorage.setItem("token", token); // Store token in localStorage
            setMessage(t("signin.success")); // Use translated success message

            const normalizedRole = roles.replace("ROLE_", "");

            if (normalizedRole === "ADMIN") {
                navigate("/admin-dashboard");
            } else if (normalizedRole === "USER") {
                navigate("/user-dashboard");
            } else {
                throw new Error("Unknown role. Please contact support.");
            }
        } catch (error) {
            setMessage(error.response?.data || t("signin.failure")); // Use translated error message
        }
    };

    return (
        <div className="signin_page">
            <div className="login_form_container">
                <form className="login_form" onSubmit={handleSubmit}>
                    <h2>{t("signin.title")}</h2> {/* Use translation for title */}
                    {message && <p>{message}</p>}
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
                    <button id="login_button" type="submit">{t("signin.submit")}</button> {/* Translate button text */}
                    <div className="signin-social-login-buttons">
                        <button type="button" className="signin-social-button signin-google-button" disabled>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
                                alt="Google logo"
                            />
                            {t("signin.google")}
                        </button>
                        <button type="button" className="signin-social-button signin-facebook-button" disabled>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                                alt="Facebook logo"
                            />
                            {t("signin.facebook")}
                        </button>
                    </div>
                    <div className="fotter">
                        <Link to="/forgot-password">{t("signin.forgotPassword")}</Link> {/* Translate forgot password link */}
                        <Link to="/signup">{t("signin.signup")}</Link> {/* Translate sign up link */}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SigninForm;
