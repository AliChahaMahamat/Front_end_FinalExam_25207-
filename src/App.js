import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { I18nextProvider } from "react-i18next";  // Import I18nextProvider
import i18n from "./i18n";  // Import i18n config file

// Import components
import LandingPage from "./components/LandingPage";
import SignupForm from "./components/SignupForm";
import SigninForm from "./components/SigninForm";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from './components/UserDashboard';
import EditUserForm from "./components/EditUserForm";
import AddUserForm from "./components/AddUserForm";
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

function App() {
    return (
        <I18nextProvider i18n={i18n}>  {/* Wrap your app with I18nextProvider */}
            <Router>
                <div>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/signup" element={<SignupForm />} />
                        <Route path="/signin" element={<SigninForm />} />
                        <Route path="/admin-dashboard" element={<AdminDashboard />} />
                        <Route path="/edit-user/:id" element={<EditUserForm />} />
                        <Route path="/AddUserForm" element={<AddUserForm />} />
                        <Route path="/user-dashboard" element={<UserDashboard />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                    </Routes>
                </div>
            </Router>
        </I18nextProvider>
    );
}

export default App;
