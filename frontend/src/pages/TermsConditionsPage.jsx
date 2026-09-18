import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "../styles/PrivacyPolicy.css";

const usingItems = [
  "Provide accurate information when creating your account.",
  "Use the platform only for genuine travel coordination.",
  "Follow applicable college, transportation, and local rules.",
  "Use the platform respectfully and responsibly.",
];

const tripItems = [
  { icon: "🚗", text: "Provide accurate trip details." },
  { icon: "🕐", text: "Confirm the pickup point and timing with your group." },
  { icon: "✓", text: "Be on time for agreed travel arrangements." },
  { icon: "✕", text: "Don't create fake, misleading, or duplicate trips." },
];

const fareItems = [
  "Agree on the expected fare before travelling.",
  "Split costs fairly among the group.",
  "Resolve payment disagreements directly and respectfully.",
];

const conductItems = [
  "Harass, threaten, or abuse another user.",
  "Impersonate someone else.",
  "Spam or scam users.",
  "Share inappropriate or harmful content.",
  "Misuse another user's personal information.",
];

const safetyItems = [
  "Choosing safe meeting and pickup locations.",
  "Verifying travel details before leaving.",
  "Making their own decisions about whether to join a trip.",
  "Following applicable transportation and safety rules.",
];

const accountItems = [
  "Violate these Terms.",
  "Misuse the platform.",
  "Create fraudulent or harmful activity.",
  "Put other users or the platform at risk.",
];

const sections = [
  {
    num: "01",
    title: "Using College Travel",
    type: "using",
    intro: "By using College Travel, you agree to:",
  },
  {
    num: "02",
    title: "Trips & Groups",
    type: "trips",
    intro: "When creating or joining a trip:",
  },
  {
    num: "03",
    title: "Fare Sharing",
    type: "fare",
    intro:
      "College Travel helps students coordinate shared travel but does not set or guarantee the fare.",
    introLabel: "Users should:",
    callout:
      "College Travel helps coordinate shared travel, but does not set or guarantee the fare.",
  },
  {
    num: "04",
    title: "User Conduct",
    type: "conduct",
    intro: "You must not use College Travel to:",
  },
  {
    num: "05",
    title: "Safety",
    type: "safety",
    intro:
      "College Travel is a coordination platform and does not provide transportation services.",
    introLabel: "Users are responsible for:",
  },
  {
    num: "06",
    title: "Account & Access",
    type: "text",
    body: "We may restrict or suspend accounts that violate these Terms, misuse the platform, create fraudulent or harmful activity, or put other users or the platform at risk.",
  },
  {
    num: "07",
    title: "Changes to These Terms",
    type: "text",
    body: "We may update these Terms when College Travel's features or practices change. Updated Terms will be posted on this page.",
  },
];

const TermsConditionsPage = () => {
  const navigate = useNavigate();

  const renderSectionContent = (section) => {
    switch (section.type) {
      case "using":
        return (
          <>
            <p className="pp-section-body" style={{ marginBottom: "var(--space-4)" }}>
              {section.intro}
            </p>
            <ul className="pp-bullet-list">
              {usingItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </>
        );
      case "trips":
        return (
          <>
            <p className="pp-section-body" style={{ marginBottom: "var(--space-4)" }}>
              {section.intro}
            </p>
            <div className="pp-collect-list">
              {tripItems.map((item) => (
                <div key={item.text} className="pp-collect-item">
                  <span className="pp-collect-icon">{item.icon}</span>
                  <div className="pp-collect-info">
                    <span className="pp-collect-desc">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        );
      case "fare":
        return (
          <>
            <p className="pp-section-body" style={{ marginBottom: "var(--space-4)" }}>
              {section.intro}
            </p>
            <p
              className="pp-section-body"
              style={{ marginBottom: "var(--space-4)", fontWeight: 500 }}
            >
              {section.introLabel}
            </p>
            <ul className="pp-bullet-list">
              {fareItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div
              style={{
                marginTop: "var(--space-5)",
                padding: "var(--space-4)",
                backgroundColor: "var(--surface-subtle)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-sm)",
                fontSize: "13px",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
              }}
            >
              {section.callout}
            </div>
          </>
        );
      case "conduct":
        return (
          <>
            <p className="pp-section-body" style={{ marginBottom: "var(--space-4)" }}>
              {section.intro}
            </p>
            <ul className="pp-bullet-list">
              {conductItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </>
        );
      case "safety":
        return (
          <>
            <p className="pp-section-body" style={{ marginBottom: "var(--space-4)" }}>
              🛡️ {section.intro}
            </p>
            <p
              className="pp-section-body"
              style={{ marginBottom: "var(--space-4)", fontWeight: 500 }}
            >
              {section.introLabel}
            </p>
            <ul className="pp-bullet-list">
              {safetyItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </>
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
          <ArrowLeft size={18} /> Terms & Conditions
        </button>
      </div>

      {/* ── Hero ── */}
      <div className="pp-hero animate-in" style={{ animationDelay: "0.05s" }}>
        <div className="pp-hero-icon">📄</div>
        <h1 className="text-h1">Use College Travel responsibly.</h1>
        <p className="text-body-lg">
          These terms explain the basic rules for using College Travel to find
          trips, join travel groups, communicate with students, and coordinate
          shared travel.
        </p>
        <span className="pp-updated">Last updated · September 18, 2026</span>
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
      <div className="pp-contact-card animate-in" style={{ animationDelay: "0.5s" }}>
        <span className="pp-contact-emoji">💬</span>
        <h2 className="text-h2">Have a question?</h2>
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

export default TermsConditionsPage;
