import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "../styles/AboutPage.css";

const features = [
  {
    id: 1,
    icon: "👥",
    title: "Find Your Squad",
    desc: "Discover students travelling from your college to the same station around the same time.",
  },
  {
    id: 2,
    icon: "🚗",
    title: "Share the Ride",
    desc: "Join a group and split the cab or auto fare instead of travelling alone.",
  },
  {
    id: 3,
    icon: "💬",
    title: "Stay Connected",
    desc: "Chat with your squad to coordinate pickup points, timing, and travel details.",
  },
  {
    id: 4,
    icon: "🛡️",
    title: "Travel With Confidence",
    desc: "Built around college communities to make student travel more organized and comfortable.",
  },
];

const journeySteps = [
  { icon: "🎓", label: "College" },
  { icon: "👥", label: "Squad" },
  { icon: "🚗", label: "Shared Ride" },
  { icon: "🚉", label: "Station" },
];

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page-container">
      {/* ── Back Button ── */}
      <div className="about-header-top animate-in" style={{ animationDelay: "0s" }}>
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> About College Travel
        </button>
      </div>

      {/* ── Hero ── */}
      <div className="about-hero animate-in" style={{ animationDelay: "0.05s" }}>
        <div className="about-hero-icon">✦</div>
        <h1 className="text-h1">
          Making college travel
          <br />
          easier, together.
        </h1>
        <p className="text-body-lg">
          College Travel helps college students find others travelling the same
          route, around the same time, so they can travel together and split the
          cost of a cab or auto.
        </p>
        <button
          className="btn btn-primary btn-lg"
          style={{ marginTop: "12px" }}
          onClick={() => navigate("/trips")}
        >
          Explore Trips →
        </button>
      </div>

      {/* ── Why We Built It ── */}
      <div className="about-section animate-in" style={{ animationDelay: "0.1s" }}>
        <div className="about-section-header">
          <span className="about-section-emoji">🎯</span>
          <h2 className="text-h2">Why We Built It</h2>
        </div>
        <p className="text-body about-section-body">
          Getting from college to the railway station can be inconvenient. A cab
          can be expensive alone. Autos may not always be comfortable or readily
          available. And often, other students are travelling the same way — you
          just don't know who they are.
        </p>
        <p className="text-body about-section-body" style={{ fontWeight: 600 }}>
          College Travel brings those students together.
        </p>

        {/* Journey Flow */}
        <div className="about-journey">
          {journeySteps.map((step, i) => (
            <React.Fragment key={step.label}>
              <div className="about-journey-step">
                <span className="about-journey-icon">{step.icon}</span>
                <span className="about-journey-label">{step.label}</span>
              </div>
              {i < journeySteps.length - 1 && (
                <span className="about-journey-arrow">→</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── What We Do ── */}
      <div className="about-section animate-in" style={{ animationDelay: "0.15s" }}>
        <div className="about-section-header">
          <span className="about-section-emoji">🚀</span>
          <h2 className="text-h2">What College Travel Does</h2>
        </div>
        <div className="about-features-grid">
          {features.map((item, index) => (
            <div
              key={item.id}
              className="about-feature-card animate-in"
              style={{ animationDelay: `${0.2 + index * 0.05}s` }}
            >
              <div className="about-feature-icon">{item.icon}</div>
              <h3 className="text-h3">{item.title}</h3>
              <p className="text-body">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Built for Students ── */}
      <div className="about-quote-card animate-in" style={{ animationDelay: "0.4s" }}>
        <span className="about-quote-emoji">💙</span>
        <h2 className="text-h2">Built for Students</h2>
        <p className="text-body">
          College Travel isn't just another travel platform. It's built around a
          simple idea:
        </p>
        <blockquote className="about-blockquote">
          "If we're already going the same way, why travel alone?"
        </blockquote>
        <p className="text-body">
          Whether you're heading home for a semester break, catching a train for
          the weekend, or simply need a reliable way to reach the station —
          College Travel helps you find your people.
        </p>
      </div>

      {/* ── Our Vision ── */}
      <div className="about-vision-card animate-in" style={{ animationDelay: "0.45s" }}>
        <span className="about-vision-emoji">🌱</span>
        <h2 className="text-h2">Our Vision</h2>
        <p className="text-body">
          Make student travel more connected, affordable, and convenient — one
          squad at a time.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
