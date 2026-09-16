import { useState } from "react";
import { User, Mail, MapPin, GraduationCap, ShieldCheck, Settings, ArrowLeft, LockKeyhole } from "lucide-react";
import "../styles/Profile.css";

const initialUser = {
    name: "Aryan Choudhary",
    email: "aryan@campus.edu",
    college: "KIET Deemed to be University",
    location: "Ghaziabad, Uttar Pradesh",
    course: "Information Technology",
    year: "4th Year",
    graduationYear: "2027",
    verified: true,
};

const travelStats = [
    { label: "Trips joined", value: 12 },
    { label: "Trips created", value: 5 },
    { label: "Groups joined", value: 8 },
];




const yearOptions = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"];

function maskEmail(email) {
    const [user, domain] = email.split("@");
    if (!domain) return email;
    return `${user.slice(0, 3)}...@${domain}`;
}

function getInitials(name) {
    return name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

function Profile() {
    const [editing, setEditing] = useState(false);
    const [userData, setUserData] = useState(initialUser);

    // Draft state for editable fields
    const [draftName, setDraftName] = useState(userData.name);
    const [draftYear, setDraftYear] = useState(userData.year);

    function handleEdit() {
        setDraftName(userData.name);
        setDraftYear(userData.year);
        setEditing(true);
    }

    function handleCancel() {
        setEditing(false);
    }

    function handleSave() {
        setUserData((prev) => ({ ...prev, name: draftName, year: draftYear }));
        setEditing(false);
    }

    // ── Edit Profile View ──
    if (editing) {
        return (
            <div className="pr-page">
                {/* Back header */}
                <button className="pr-back-btn animate-in" onClick={handleCancel}>
                    <ArrowLeft size={18} />
                    Profile
                </button>

                <div className="pr-page-title animate-in">
                    <h1>Edit Profile</h1>
                    <p>Update your personal and college information</p>
                </div>

                {/* Avatar section */}
                <div className="pr-edit-avatar-section animate-in" style={{ animationDelay: "0.05s" }}>
                    <div className="pr-edit-avatar">
                        <span className="pr-edit-avatar-initials">{getInitials(draftName)}</span>
                    </div>

                </div>

                {/* Personal Information */}
                <div className="pr-edit-section animate-in" style={{ animationDelay: "0.1s" }}>
                    <h3 className="pr-edit-section-title">Personal Information</h3>

                    <div className="pr-field">
                        <label className="pr-field-label">Full Name</label>
                        <input
                            className="pr-field-input"
                            type="text"
                            value={draftName}
                            onChange={(e) => setDraftName(e.target.value)}
                        />
                    </div>

                    <div className="pr-field">
                        <label className="pr-field-label">
                            College Email
                            <LockKeyhole size={12} className="pr-lock-icon" />
                        </label>
                        <input
                            className="pr-field-input pr-field-locked"
                            type="email"
                            value={userData.email}
                            disabled
                        />
                        <span className="pr-field-hint">College email cannot be changed</span>
                    </div>
                </div>

                {/* College Information */}
                <div className="pr-edit-section animate-in" style={{ animationDelay: "0.15s" }}>
                    <h3 className="pr-edit-section-title">College Information</h3>

                    <div className="pr-field">
                        <label className="pr-field-label">
                            College
                            <LockKeyhole size={12} className="pr-lock-icon" />
                        </label>
                        <input
                            className="pr-field-input pr-field-locked"
                            type="text"
                            value={userData.college}
                            disabled
                        />
                    </div>

                    <div className="pr-field">
                        <label className="pr-field-label">
                            Course / Branch
                            <LockKeyhole size={12} className="pr-lock-icon" />
                        </label>
                        <input
                            className="pr-field-input pr-field-locked"
                            type="text"
                            value={userData.course}
                            disabled
                        />
                    </div>

                    <div className="pr-field">
                        <label className="pr-field-label">Year</label>
                        <select
                            className="pr-field-input pr-field-select"
                            value={draftYear}
                            onChange={(e) => setDraftYear(e.target.value)}
                        >
                            {yearOptions.map((y) => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>

                    <div className="pr-field">
                        <label className="pr-field-label">
                            Graduation Year
                            <LockKeyhole size={12} className="pr-lock-icon" />
                        </label>
                        <input
                            className="pr-field-input pr-field-locked"
                            type="text"
                            value={userData.graduationYear}
                            disabled
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="pr-edit-actions animate-in" style={{ animationDelay: "0.2s" }}>
                    <button className="pr-btn-cancel" onClick={handleCancel}>Cancel</button>
                    <button className="pr-btn-save" onClick={handleSave}>Save Changes</button>
                </div>
            </div>
        );
    }

    // ── Main Profile View ──
    return (
        <div className="pr-page">
            {/* ── Profile Header ── */}
            <div className="pr-page-title animate-in">
                <h1>Profile</h1>
                <p>Manage your profile and travel preferences</p>
            </div>

            <div className="pr-header-card animate-in">
                <div className="pr-avatar-large">
                    <User size={32} />
                </div>
                <div className="pr-user-info">
                    <h2>{userData.name}</h2>
                    <div className="pr-meta-row">
                        <span><Mail size={14} />{maskEmail(userData.email)}</span>
                    </div>
                    <div className="pr-meta-row">
                        <span><GraduationCap size={14} />{userData.college}</span>
                    </div>
                    <div className="pr-meta-row">
                        <span><MapPin size={14} />{userData.location}</span>
                    </div>
                    {userData.verified && (
                        <div className="pr-verified-badge">
                            <ShieldCheck size={14} /> College email verified
                        </div>
                    )}
                </div>
                <button className="pr-btn-secondary" onClick={handleEdit}>
                    <Settings size={16} /> Edit profile
                </button>
            </div>

            {/* ── About + Travel Stats ── */}
            <div className="pr-grid-2col animate-in" style={{ animationDelay: "0.1s" }}>
                <div className="pr-card">
                    <h3>About</h3>
                    <div className="pr-info-list">
                        <div className="pr-info-row">
                            <span className="pr-info-label">College</span>
                            <span className="pr-info-value">{userData.college.split(" ").slice(0, 1)[0]}</span>
                        </div>
                        <div className="pr-info-row">
                            <span className="pr-info-label">Course</span>
                            <span className="pr-info-value">{userData.course}</span>
                        </div>
                        <div className="pr-info-row">
                            <span className="pr-info-label">Year</span>
                            <span className="pr-info-value">{userData.year}</span>
                        </div>
                    </div>
                </div>

                <div className="pr-card">
                    <h3>Travel stats</h3>
                    <div className="pr-stats-list">
                        {travelStats.map((stat) => (
                            <div className="pr-stat-row" key={stat.label}>
                                <span className="pr-info-label">{stat.label}</span>
                                <span className="pr-stat-value">{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </div>
    );
}

export default Profile;