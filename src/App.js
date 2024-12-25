import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { I18nextProvider } from "react-i18next";  // Import I18nextProvider
import i18n from "./i18n";  // Import i18n config file
import AccountOverview from "./components/AccountOverview";

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
import MoneyTransfer from './components/MoneyTransfer';
import Notifications from "./components/Notifications";
import TransactionHistory from "./components/TransactionHistory";
import ProfileManagement from "./components/ProfileManagement";
import AdminMenu from "./components/AdminMenu";



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
                        <Route path="/account-overview" element={<AccountOverview />} />
                        <Route path="/money-transfer" element={<MoneyTransfer />} />
                        <Route path="/notifications" element={<Notifications />} />
                        <Route path="/transaction-history" element={<TransactionHistory />} />
                        <Route path="/profile-management" element={<ProfileManagement />} />
                        <Route path="/admin-menu" element={<AdminMenu />} />
                    </Routes>
                </div>
            </Router>
        </I18nextProvider>
    );
}

export default App;
