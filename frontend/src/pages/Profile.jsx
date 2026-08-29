import { User, Mail, Calendar, Settings } from "lucide-react";
import "../styles/Profile.css";

const currentUser = {
    name: "Aryan Choudhary",
    email: "aryan@campus.edu",
    joinDate: "August 2026",
    id: 101
};

function Profile(){
    return (
        <div className="pr-page">
             {/* ── Profile Header ── */}
             <div className="pr-header-card pr-animate">
                <div className="pr-avatar-large">
                    <User size={48} />
                </div>
                <div className="pr-user-info">
                    <h1>{currentUser.name}</h1>
                    <div className="pr-meta-row">
                        <span><Mail size={14} />{currentUser.email}</span>
                        <span><Calendar size={14} />Joined {currentUser.joinDate}</span>
                    </div>
                </div>
                <button className="pr-btn-secondary">
                    <Settings size={16} /> Edit Profile
                </button>
             </div>
             
             {/* Note: Tabs and listings were moved to MyListings.jsx */}
             <div className="pr-animate" style={{animationDelay: '0.1s', marginTop: '32px'}}>
                <h2 style={{fontSize: '20px', marginBottom: '16px'}}>Account Settings</h2>
                <div className="pr-header-card" style={{flexDirection: 'column', alignItems: 'flex-start', padding: '24px'}}>
                    <p style={{color: '#64748b'}}>You can manage your account settings, password, and preferences here.</p>
                </div>
             </div>
        </div>
    );
}
export default Profile;