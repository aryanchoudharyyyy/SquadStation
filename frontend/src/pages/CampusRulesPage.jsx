import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Flag } from "lucide-react";
import "../styles/CampusRules.css";

const rules = [
  {
    id: 1,
    icon: "🛡️",
    title: "Respect Everyone",
    desc: "Treat every student with respect. No harassment, bullying, abuse, or discrimination.",
  },
  {
    id: 2,
    icon: "🎓",
    title: "Follow Campus Rules",
    desc: "Follow your college's security, entry, parking, and pickup-point rules.",
  },
  {
    id: 3,
    icon: "🚗",
    title: "Be Responsible While Travelling",
    desc: "Be on time, confirm your pickup point, and follow traffic and transportation rules.",
  },
  {
    id: 4,
    icon: "💰",
    title: "Keep Fare Sharing Fair",
    desc: "Agree on the fare beforehand and split the agreed amount fairly among the squad.",
  },
  {
    id: 5,
    icon: "🔐",
    title: "Protect Privacy",
    desc: "Never share another student's phone number, personal details, or travel information without permission.",
  },
  {
    id: 6,
    icon: "🚨",
    title: "Put Safety First",
    desc: "Meet at public locations and leave any trip if you feel unsafe or uncomfortable.",
  },
  {
    id: 7,
    icon: "📢",
    title: "No Fake Trips or Spam",
    desc: "Don't create fake trips, impersonate others, scam students, or use SquadStation for spam.",
  },
];

const CampusRulesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="rules-page-container">
      <div className="rules-header-top animate-in" style={{ animationDelay: "0s" }}>
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Campus Rules
        </button>
      </div>

      <div className="rules-hero animate-in" style={{ animationDelay: "0.05s" }}>
        <div className="rules-hero-icon">🏫</div>
        <h1 className="text-h1">
          Travel together.
          <br />
          Travel responsibly.
        </h1>
        <p className="text-body-lg">
          Keep every campus journey safe, respectful, and hassle-free.
        </p>
      </div>

      <div className="rules-cards-grid">
        {rules.map((item, index) => (
          <div
            key={item.id}
            className="rules-card animate-in"
            style={{ animationDelay: `${0.1 + index * 0.05}s` }}
          >
            <div className="rules-card-icon">{item.icon}</div>
            <div className="rules-card-content">
              <h3 className="text-h3">{item.title}</h3>
              <p className="text-body">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rules-report-card animate-in" style={{ animationDelay: "0.5s" }}>
        <div className="rules-report-icon">🚩</div>
        <h2 className="text-h2">Something doesn't feel right?</h2>
        <p className="text-body">
          Report a user or trip and let the SquadStation team review it.
        </p>
        <button className="btn btn-primary btn-lg" style={{ marginTop: "8px" }}>
          <Flag size={18} /> Report an Issue
        </button>
      </div>

      <div className="rules-footer animate-in" style={{ animationDelay: "0.55s" }}>
        <p className="text-caption">
          By using SquadStation you agree to follow these rules. Violations may
          lead to warnings, restrictions, or account removal.
        </p>
      </div>
    </div>
  );
};

export default CampusRulesPage;
