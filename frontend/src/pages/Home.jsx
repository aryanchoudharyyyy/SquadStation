import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Car,
  ShoppingBag,
  MessageCircle,
  ArrowRight,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

function Home() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const stats = [
    ];

  const actions = [
    {
      icon: <Car size={28} />,
      title: "Find or Post a Trip",
      description: "Share a cab to the station or airport with your college mates and split the cost.",
      cta: "Browse Trips",
      route: "/trips",
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


        <div className="hero-badge">
          <Zap size={13} />
          <span>Your Campus, Connected</span>
        </div>
        <h1 className="hero-title">
          Welcome back to{" "}
          <span className="hero-gradient">College Travel</span>
        </h1>
        <p className="hero-subtitle">
          Plan trips, discover deals, and stay connected with your squad — all in one place.
        </p>

        {/* <div className="stats-row">
          {stats.map((s, i) => (
            <div key={i} className="stat-pill">
              <span className="stat-icon">{s.icon}</span>
              <div style={{display: "flex", flexDirection: "column"}}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
            </div>
          ))}
        </div> */}
      </section>
          
        </div>
        
        <div className="hero-right-col"> 
          <img src="/hero-img.png" alt="Railway Station" className="hero-image" />
        </div>
        </div>

      {/* ACTION CARDS */}
      <section className="actions-section">
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

              <div className="pro-card-glow" />
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