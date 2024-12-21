import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./style/LandingPage.css";

const LandingPage = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    return (
        <div className="landing-page">
            {/* Language Selector */}
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
            </div>

            {/* Main Content */}
            <div className="landing-page-content">
                <h1>{t("landing.welcome")}</h1>
                <p>{t("landing.description1")}</p>
                <p>{t("landing.description2")}</p>
                <div>
                    <Link to="/signup" className="link-button">
                        {t("landing.signup")}
                    </Link>
                    <Link to="/signin" className="link-button">
                        {t("landing.signin")}
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <div className="footer">
                <p>
                    {t("landing.footerText")}{" "}
                    <a href="/terms">{t("landing.terms")}</a> |{" "}
                    <a href="/privacy">{t("landing.privacy")}</a>
                </p>
            </div>

        </div>
    );
};

export default LandingPage;
