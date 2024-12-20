import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./style/LandingPage.css";

const LandingPage = () => {
    const { t, i18n } = useTranslation();

    // Function to change the language
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    return (
        <div className="landing-page">
            {/* Language Selector with Flags */}
            <div className="language-selector">
                <span className="language-label">{t("landing.selectLanguage")}</span>
                <img
                    src="https://flagcdn.com/w40/us.png"
                    alt="English"
                    onClick={() => changeLanguage("en")}
                    title="English"
                />
                <img
                    src="https://flagcdn.com/w40/fr.png"
                    alt="French"
                    onClick={() => changeLanguage("fr")}
                    title="French"
                />
                {/* Add more flags as needed */}
            </div>

            {/* Main Content */}
            <div className="landing-page-content">
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    {t("landing.welcome")}
                </motion.h1>
                <motion.p
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    {t("landing.description1")}
                </motion.p>
                <motion.p
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    {t("landing.description2")}
                </motion.p>

                {/* Links */}
                <div style={{ marginTop: "1.5rem" }}>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.5 }}
                        style={{ display: "inline-block" }}
                    >
                        <Link to="/signup" className="link-button">
                            {t("landing.signup")}
                        </Link>
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 2 }}
                        style={{ display: "inline-block" }}
                    >
                        <Link to="/signin" className="link-button">
                            {t("landing.signin")}
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
