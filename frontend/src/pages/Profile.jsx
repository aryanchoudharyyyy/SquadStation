import { User, Mail, MapPin, GraduationCap, ShieldCheck, Settings, Lock, Bell, ChevronRight } from "lucide-react";
import "../styles/Profile.css";

const currentUser = {
    name: "Aryan Choudhary",
    email: "aryan@campus.edu",
    college: "KIET Deemed to be University",
    location: "Ghaziabad, Uttar Pradesh",
    course: "B.Tech IT",
    year: "4th Year",
    verified: true,
};

const travelStats = [
    { label: "Trips joined", value: 12 },
    { label: "Trips created", value: 5 },
    { label: "Groups joined", value: 8 },
];

const accountLinks = [
    { icon: Lock, label: "Privacy & safety" },
    { icon: Bell, label: "Notifications" },
    { icon: Settings, label: "Account settings" },
];

function maskEmail(email) {
    const [user, domain] = email.split("@");
    if (!domain) return email;
    return `${user.slice(0, 3)}...@${domain}`;
}

function Profile(){
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
                    <h2>{currentUser.name}</h2>
                    <div className="pr-meta-row">
                        <span><Mail size={14} />{maskEmail(currentUser.email)}</span>
                    </div>
                    <div className="pr-meta-row">
                        <span><GraduationCap size={14} />{currentUser.college}</span>
                    </div>
                    <div className="pr-meta-row">
                        <span><MapPin size={14} />{currentUser.location}</span>
                    </div>
                    {currentUser.verified && (
                        <div className="pr-verified-badge">
                            <ShieldCheck size={14} /> College email verified
                        </div>
                    )}
                </div>
                <button className="pr-btn-secondary">
                    <Settings size={16} /> Edit profile
                </button>
             </div>

             {/* ── About + Travel Stats ── */}
             <div className="pr-grid-2col animate-in" style={{animationDelay: '0.1s'}}>
                <div className="pr-card">
                    <h3>About</h3>
                    <div className="pr-info-list">
                        <div className="pr-info-row">
                            <span className="pr-info-label">College</span>
                            <span className="pr-info-value">{currentUser.college.split(" ").slice(0,1)[0]}</span>
                        </div>
                        <div className="pr-info-row">
                            <span className="pr-info-label">Course</span>
                            <span className="pr-info-value">{currentUser.course}</span>
                        </div>
                        <div className="pr-info-row">
                            <span className="pr-info-label">Year</span>
                            <span className="pr-info-value">{currentUser.year}</span>
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

             {/* ── Account & Privacy ── */}
             <div className="pr-card animate-in" style={{animationDelay: '0.2s', marginTop: 'var(--space-6)'}}>
                <h3>Account & privacy</h3>
                <div className="pr-link-list">
                    {accountLinks.map(({ icon: Icon, label }) => (
                        <button className="pr-link-row" key={label}>
                            <span className="pr-link-left">
                                <Icon size={16} />
                                {label}
                            </span>
                            <ChevronRight size={16} className="pr-link-chevron" />
                        </button>
                    ))}
                </div>
             </div>
        </div>
    );
}
export default Profile;