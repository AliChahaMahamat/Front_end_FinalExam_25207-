import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./style/SignUp.css";

const SignupForm = () => {
    const { t } = useTranslation();
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
        role: "USER",
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8083/api/auth/signup", formData);
            setMessage(t("signup.success"));
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
                role: "USER",
            });
            setTimeout(() => navigate("/signin"), 2000);
        } catch (error) {
            setMessage(error.response?.data || t("signup.failure"));
        }
    };

    return (
        <div className="signup-page-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2 className="signup-title">{t("signup.title")}</h2>
                {message && (
                    <p className={message.includes(t("signup.success")) ? "signup-success" : "signup-error"}>
                        {message}
                    </p>
                )}
                <div className="signup-input-group">
                    <input
                        type="text"
                        name="username"
                        className="signup-input"
                        value={formData.username}
                        placeholder={t("signup.username")}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="fullName"
                        className="signup-input"
                        value={formData.fullName}
                        placeholder={t("signup.fullName")}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="signup-input-group">
                    <input
                        type="email"
                        name="email"
                        className="signup-input"
                        value={formData.email}
                        placeholder={t("signup.email")}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="date"
                        name="dob"
                        className="signup-input"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="signup-input-group">
                    <select
                        name="idType"
                        className="signup-select"
                        value={formData.idType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">{t("signup.idType.placeholder")}</option>
                        <option value="Passport">{t("signup.idType.passport")}</option>
                        <option value="NationalID">{t("signup.idType.nationalId")}</option>
                    </select>
                    <input
                        type="text"
                        name="idNumber"
                        className="signup-input"
                        value={formData.idNumber}
                        placeholder={t("signup.idNumber")}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="signup-input-group">
                    <select
                        name="accountType"
                        className="signup-select"
                        value={formData.accountType}
                        onChange={handleChange}
                    >
                        <option value="Savings">{t("signup.accountType.savings")}</option>
                        <option value="Checking">{t("signup.accountType.checking")}</option>
                    </select>
                    <input
                        type="text"
                        name="phoneNumber"
                        className="signup-input"
                        value={formData.phoneNumber}
                        placeholder={t("signup.phoneNumber")}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="signup-input-group">
                    <input
                        type="password"
                        name="password"
                        className="signup-input"
                        value={formData.password}
                        placeholder={t("signup.password")}
                        onChange={handleChange}
                        required
                    />
                    <select
                        name="role"
                        className="signup-select"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="USER">{t("signup.role.user")}</option>
                        <option value="ADMIN">{t("signup.role.admin")}</option>
                    </select>
                </div>
                <button type="submit" className="signup-button">
                    {t("signup.submit")}
                </button>
                <p className="signup-text">
                    {t("signup.haveAccount")}{" "}
                    <Link to="/signin" className="signup-link">
                        {t("signin.title")}
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default SignupForm;
