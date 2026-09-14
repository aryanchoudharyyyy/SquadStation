import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import {
  Car,
  ShoppingBag,
  MessageCircle,
  ArrowRight,
  TrendingUp,
  Users,
  Zap,
  Ticket,
  ShieldCheck,
} from "lucide-react";

function Home() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      icon: <Users size={24} />,
      title: "Find Your Squad",
      desc: "Connect with students heading to the same destination and travel together.",
      bg: "#eff6ff",
      color: "#2563eb"
    },
    {
      icon: <Ticket size={24} />,
      title: "Share & Save",
      desc: "Split travel costs and save more when you journey as a group.",
      bg: "#f0fdf4",
      color: "#16a34a"
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Safe & Trusted",
      desc: "Verified profiles and secure interactions ensure a safe travel experience.",
      bg: "#f5f3ff",
      color: "#7c3aed"
    },
    {
      icon: <Zap size={24} />,
      title: "Quick & Easy",
      desc: "Post your trip or join others in just a few clicks.",
      bg: "#fffbeb",
      color: "#f59e0b"
    }
  ];

  const actions = [
    {
      icon: <Car size={28} />,
      title: "Find or Post a Trip",
      description: "Share a cab to the station or airport with your college mates and split the cost.",
      cta: "Post a Trip",
      route: "/post-trip",
      accent: "#2563eb",
      badge: "Popular",
    },
    {
      icon: <ShoppingBag size={28} />,
      title: "Buy or Sell Tickets",
      description: "Looking for a fest ticket or want to sell yours? Find tickets listed by students on campus.",
      cta: "Browse Tickets",
      route: "/marketplace",
      accent: "#10b981",
      badge: "New Listings",
    },
    {
      icon: <MessageCircle size={28} />,
      title: "My Groups & Chats",
      description: "View your active trip groups and marketplace conversations all in one place.",
      cta: "Open Chats",
      route: "/chats",
      accent: "#8b5cf6",
      badge: null,
    },
  ];

  return (
    <div className="home-wrapper">
      {/* HERO SECTION */}
      <div className="hero-split-container">
        <div className="hero-left-col">

          <section className="hero-section">


        
        <h1 className="hero-title animate-in" style={{ animationDelay: "0.05s" }}>
          Welcome back to{" "}
          <span className="hero-gradient">College Travel</span>
        </h1>
        <p className="hero-subtitle animate-in" style={{ animationDelay: "0.1s" }}>
          Plan trips, discover deals, and stay connected with your squad — all in one place.
        </p>

        <div className="hero-features-grid animate-in" style={{ animationDelay: "0.15s" }}>
          {features.map((f, i) => (
            <div key={i} className="hero-feature-card">
              <div className="hf-icon-box">
                {f.icon}
              </div>
              <div className="hf-text-box">
                <h3 className="hf-title">{f.title}</h3>
                <p className="hf-desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
        </div>
        
        <div className="hero-right-col animate-in" style={{ animationDelay: "0.2s" }}> 
          <img src="/hero-img.png" alt="Railway Station" className="hero-image" />
        </div>
      </div>

      {/* ACTION CARDS */}
      <section className="actions-section animate-in" style={{ animationDelay: "0.25s" }}>
        <div className="section-header">
          <h2 className="section-title">What would you like to do?</h2>
          <p className="section-sub">Pick an action to get started</p>
        </div>

        <div className="action-cards-grid">
          {actions.map((card, i) => (
            <div
              key={i}
              className="pro-action-card"
              onClick={() => navigate(card.route)}
              style={{ "--card-accent": card.accent }}
            >
              <div className="pro-card-top">
                <div className="pro-card-icon">{card.icon}</div>
                {card.badge && (
                  <span className="pro-card-badge">{card.badge}</span>
                )}
              </div>

              <div className="pro-card-body">
                <h3 className="pro-card-title">{card.title}</h3>
                <p className="pro-card-desc">{card.description}</p>
              </div>

              <div className="pro-card-footer">
                <span className="pro-card-cta">{card.cta}</span>
                <ArrowRight size={16} className="pro-card-arrow" />
              </div>


            </div>
          ))}
        </div>
      </section>

      {/* TIP BANNER */}
      <section className="tip-banner">
        <TrendingUp size={18} className="tip-icon" />
        <p>
          <strong>Pro tip:</strong> Post a trip at least 2 hours before departure to get more squad members to join!
        </p>
      </section>
    </div>
  );
}

export default Home;