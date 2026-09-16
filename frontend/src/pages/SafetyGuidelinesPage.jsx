import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "../styles/SafetyGuidelines.css";

const SafetyGuidelinesPage = () => {
  const navigate = useNavigate();

  const guidelines = [
    {
      id: 1,
      icon: "🤝",
      title: "Meet in Public Places",
      desc: "Always meet your squad at well-lit, public locations such as your college gate, station entrance, or a busy pickup point."
    },
    {
      id: 2,
      icon: "👤",
      title: "Know Who You're Travelling With",
      desc: "Before joining a trip, check the person's profile and the available trip/group information. If something feels unusual, don't hesitate to leave the group."
    },
    {
      id: 3,
      icon: "📍",
      title: "Share Your Trip Details",
      desc: "Let a friend or family member know where you're going, who you're travelling with, and your expected arrival time."
    },
    {
      id: 4,
      icon: "💬",
      title: "Keep Communication Respectful",
      desc: "Use group chat responsibly. Harassment, threats, abusive language, or inappropriate behavior are not acceptable."
    },
    {
      id: 5,
      icon: "💰",
      title: "Be Careful With Payments",
      desc: "Confirm the agreed fare before starting your journey. Avoid sharing sensitive financial information with other users."
    },
    {
      id: 6,
      icon: "🔐",
      title: "Protect Your Personal Information",
      desc: "Never share passwords, OTPs, bank details, or other sensitive information with anyone through College Travel."
    },
    {
      id: 7,
      icon: "🚨",
      title: "Trust Your Instincts",
      desc: "If you feel unsafe or uncomfortable at any point, leave the situation and contact someone you trust. In an emergency, contact local emergency services."
    },
    {
      id: 8,
      icon: "🚩",
      title: "Report Suspicious Behavior",
      desc: "If another user behaves inappropriately, provides misleading information, or makes you uncomfortable, report them through College Travel."
    }
  ];

  return (
    <div className="safety-page-container">
      <div className="safety-header-top">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Safety Guidelines
        </button>
      </div>

      <div className="safety-hero">
        <div className="safety-hero-icon">🛡️</div>
        <h1>Travel together.<br/>Stay safe.</h1>
        <p>Simple guidelines to help you travel confidently with your squad.</p>
      </div>

      <div className="safety-cards-grid">
        {guidelines.map((item) => (
          <div key={item.id} className="safety-card">
            <div className="safety-card-icon">{item.icon}</div>
            <div className="safety-card-content">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="quick-check-card">
        <div className="quick-check-header">
          <span className="quick-check-icon">🛡️</span>
          <h2>Quick Safety Check</h2>
        </div>
        <p style={{marginBottom: "1rem", color: "#e0e7ff"}}>Before you travel:</p>
        <ul className="quick-check-list">
          <li><span className="check-icon">✓</span> Confirm the meeting point</li>
          <li><span className="check-icon">✓</span> Check your squad members</li>
          <li><span className="check-icon">✓</span> Confirm the fare</li>
          <li><span className="check-icon">✓</span> Tell someone you trust</li>
          <li><span className="check-icon">✓</span> Keep your phone charged</li>
          <li><span className="check-icon">✓</span> Trust your instincts</li>
        </ul>
      </div>

      <div className="safety-footer">
        <p>Your safety comes first. College Travel is a platform for coordinating travel between students; always use your own judgment when deciding who to travel with.</p>
      </div>
    </div>
  );
};

export default SafetyGuidelinesPage;
