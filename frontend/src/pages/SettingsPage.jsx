import { useState } from "react";
import {
    Bell, Lock, Settings, Globe, Moon, HelpCircle, Mail,
    ChevronRight, Trash2, ShieldAlert, BookOpen, FileText,
    MessageSquare, MapPin, Store
} from "lucide-react";
import "../styles/Settings.css";

function SettingsPage() {
    const [tripUpdates, setTripUpdates] = useState(true);
    const [groupMessages, setGroupMessages] = useState(true);
    const [marketplaceActivity, setMarketplaceActivity] = useState(true);
    const [emailNotifs, setEmailNotifs] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className="st-page">
            {/* ── Page Title ── */}
            <div className="st-page-title animate-in">
                <h1>Settings</h1>
                <p>Manage your preferences, privacy, and account controls.</p>
            </div>

            {/* ── Notifications ── */}
            <div className="st-card animate-in" style={{ animationDelay: "0.05s" }}>
                <div className="st-card-header">
                    <Bell size={18} className="st-card-icon" />
                    <h3>Notifications</h3>
                </div>

                <div className="st-toggle-list">
                    <div className="st-toggle-row">
                        <div className="st-toggle-info">
                            <span className="st-toggle-label">Trip Updates</span>
                            <span className="st-toggle-desc">Get notified about trip matches and changes</span>
                        </div>
                        <button
                            className={`st-toggle ${tripUpdates ? "st-toggle-on" : ""}`}
                            onClick={() => setTripUpdates(!tripUpdates)}
                            aria-label="Toggle trip updates"
                        >
                            <span className="st-toggle-knob" />
                        </button>
                    </div>

                    <div className="st-toggle-row">
                        <div className="st-toggle-info">
                            <span className="st-toggle-label">Group Messages</span>
                            <span className="st-toggle-desc">Receive notifications for new group messages</span>
                        </div>
                        <button
                            className={`st-toggle ${groupMessages ? "st-toggle-on" : ""}`}
                            onClick={() => setGroupMessages(!groupMessages)}
                            aria-label="Toggle group messages"
                        >
                            <span className="st-toggle-knob" />
                        </button>
                    </div>

                    <div className="st-toggle-row">
                        <div className="st-toggle-info">
                            <span className="st-toggle-label">Marketplace Activity</span>
                            <span className="st-toggle-desc">Get updates about your listings and interests</span>
                        </div>
                        <button
                            className={`st-toggle ${marketplaceActivity ? "st-toggle-on" : ""}`}
                            onClick={() => setMarketplaceActivity(!marketplaceActivity)}
                            aria-label="Toggle marketplace activity"
                        >
                            <span className="st-toggle-knob" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Privacy & Safety ── */}
            <div className="st-card animate-in" style={{ animationDelay: "0.1s" }}>
                <div className="st-card-header">
                    <Lock size={18} className="st-card-icon" />
                    <h3>Privacy & Safety</h3>
                </div>

                <div className="st-link-list">
                    <button className="st-link-row">
                        <div className="st-link-info">
                            <span className="st-link-label">Blocked Users</span>
                            <span className="st-link-desc">Manage users you've blocked</span>
                        </div>
                        <ChevronRight size={16} className="st-link-chevron" />
                    </button>

                    <button className="st-link-row">
                        <div className="st-link-info">
                            <span className="st-link-label">Safety Guidelines</span>
                        </div>
                        <ChevronRight size={16} className="st-link-chevron" />
                    </button>
                </div>
            </div>

            {/* ── App Preferences ── */}
            <div className="st-card animate-in" style={{ animationDelay: "0.15s" }}>
                <div className="st-card-header">
                    <Settings size={18} className="st-card-icon" />
                    <h3>App Preferences</h3>
                </div>

                <div className="st-toggle-list">
                    <div className="st-toggle-row">
                        <div className="st-toggle-info">
                            <span className="st-toggle-label">Email Notifications</span>
                            <span className="st-toggle-desc">Receive important updates via email</span>
                        </div>
                        <button
                            className={`st-toggle ${emailNotifs ? "st-toggle-on" : ""}`}
                            onClick={() => setEmailNotifs(!emailNotifs)}
                            aria-label="Toggle email notifications"
                        >
                            <span className="st-toggle-knob" />
                        </button>
                    </div>

                    <button className="st-toggle-row st-link-row-inline">
                        <div className="st-toggle-info">
                            <span className="st-toggle-label">Language</span>
                        </div>
                        <div className="st-link-value">
                            <span>English</span>
                            <ChevronRight size={16} className="st-link-chevron" />
                        </div>
                    </button>

                    <div className="st-toggle-row">
                        <div className="st-toggle-info">
                            <span className="st-toggle-label">Dark Mode</span>
                        </div>
                        <button
                            className={`st-toggle ${darkMode ? "st-toggle-on" : ""}`}
                            onClick={() => setDarkMode(!darkMode)}
                            aria-label="Toggle dark mode"
                        >
                            <span className="st-toggle-knob" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Help & Support ── */}
            <div className="st-card animate-in" style={{ animationDelay: "0.2s" }}>
                <div className="st-card-header">
                    <HelpCircle size={18} className="st-card-icon" />
                    <h3>Help & Support</h3>
                </div>

                <div className="st-link-list">
                    <button className="st-link-row">
                        <span className="st-link-label">Help & FAQs</span>
                        <ChevronRight size={16} className="st-link-chevron" />
                    </button>
                    <button className="st-link-row">
                        <span className="st-link-label">Contact Support</span>
                        <ChevronRight size={16} className="st-link-chevron" />
                    </button>
                    <button className="st-link-row">
                        <span className="st-link-label">Privacy Policy</span>
                        <ChevronRight size={16} className="st-link-chevron" />
                    </button>
                    <button className="st-link-row">
                        <span className="st-link-label">Terms & Conditions</span>
                        <ChevronRight size={16} className="st-link-chevron" />
                    </button>
                </div>
            </div>

            {/* ── Account Actions ── */}
            <div className="st-card st-card-danger animate-in" style={{ animationDelay: "0.25s" }}>
                <div className="st-card-header">
                    <Trash2 size={18} className="st-card-icon st-icon-danger" />
                    <h3>Account Actions</h3>
                </div>

                <p className="st-danger-desc">
                    Permanently delete your account and all associated data. This action cannot be undone.
                </p>

                <div className="st-danger-action">
                    <button className="st-btn-danger">Delete Account</button>
                </div>
            </div>
        </div>
    );
}

export default SettingsPage;
