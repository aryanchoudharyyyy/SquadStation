import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "../styles/PrivacyPolicy.css";

const collectItems = [
  {
    icon: "👤",
    title: "Account Information",
    desc: "Name, college email, and profile details.",
  },
  {
    icon: "🚗",
    title: "Trip Information",
    desc: "Starting point, station, date, time, and group details.",
  },
  {
    icon: "💬",
    title: "Messages",
    desc: "Information shared through College Travel chats.",
  },
  {
    icon: "⚙️",
    title: "Technical Information",
    desc: "Basic device and application information.",
  },
];

const usageItems = [
  "Create and manage your account.",
  "Match you with relevant trips and groups.",
  "Enable chat and trip coordination.",
  "Improve and secure College Travel.",
  "Respond to support requests.",
];

const choiceItems = [
  "Update your profile information.",
  "Control the information you share.",
  "Leave trips or groups.",
  "Contact us regarding your personal information.",
  "Request account deletion, where applicable.",
];

const sections = [
  {
    num: "01",
    title: "Information We Collect",
    type: "collect",
  },
  {
    num: "02",
    title: "How We Use Your Information",
    type: "usage",
  },
  {
    num: "03",
    title: "Information Visible to Other Users",
    type: "text",
    body: "When you create or join a trip, other members may see the information required to coordinate the journey, such as your name, profile details, and relevant trip information.",
  },
  {
    num: "04",
    title: "Data Security",
    type: "text",
    body: "We take reasonable measures to protect your information from unauthorized access, misuse, or loss. However, no online service can guarantee complete security.",
  },
  {
    num: "05",
    title: "Your Choices",
    type: "choices",
  },
  {
    num: "06",
    title: "Changes to This Policy",
    type: "text",
    body: "We may update this Privacy Policy when our services or practices change. Updated policies will be posted on this page.",
  },
];

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();

  const renderSectionContent = (section) => {
    switch (section.type) {
      case "collect":
        return (
          <div className="pp-collect-list">
            {collectItems.map((item) => (
              <div key={item.title} className="pp-collect-item">
                <span className="pp-collect-icon">{item.icon}</span>
                <div className="pp-collect-info">
                  <span className="pp-collect-title">{item.title}</span>
                  <span className="pp-collect-desc">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        );
      case "usage":
        return (
          <ul className="pp-bullet-list">
            {usageItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        );
      case "choices":
        return (
          <ul className="pp-bullet-list">
            {choiceItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        );
      case "text":
        return <p className="pp-section-body">{section.body}</p>;
      default:
        return null;
    }
  };

  return (
    <div className="pp-page-container">
      {/* ── Back Button ── */}
      <div className="pp-header-top animate-in" style={{ animationDelay: "0s" }}>
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Privacy Policy
        </button>
      </div>

      {/* ── Hero ── */}
      <div className="pp-hero animate-in" style={{ animationDelay: "0.05s" }}>
        <div className="pp-hero-icon">🔒</div>
        <h1 className="text-h1">Your Privacy Matters</h1>
        <p className="text-body-lg">
          College Travel collects only the information needed to provide a safe
          and useful college travel experience.
        </p>
        <span className="pp-updated">Last updated · September 17, 2026</span>
      </div>

      {/* ── Sections ── */}
      {sections.map((section, index) => (
        <div
          key={section.num}
          className="pp-section animate-in"
          style={{ animationDelay: `${0.1 + index * 0.05}s` }}
        >
          <div className="pp-section-header">
            <span className="pp-section-num">{section.num}</span>
            <h2 className="pp-section-title">{section.title}</h2>
          </div>
          {renderSectionContent(section)}
        </div>
      ))}

      {/* ── Contact Card ── */}
      <div className="pp-contact-card animate-in" style={{ animationDelay: "0.45s" }}>
        <span className="pp-contact-emoji">💬</span>
        <h2 className="text-h2">Have a privacy question?</h2>
        <p className="text-body pp-contact-email">support@collegetravel.app</p>
        <button
          className="btn btn-primary btn-lg"
          style={{ marginTop: "8px" }}
          onClick={() => navigate("/contact")}
        >
          Contact Us →
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
