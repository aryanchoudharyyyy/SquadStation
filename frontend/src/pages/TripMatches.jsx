import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Clock, MessageSquare, User, ShieldPlus, Compass } from "lucide-react";
import "../styles/TripMatches.css";

// Mock data based on the requirements
const mockMatches = [
  { id: 1, name: "Aman Sharma", source: "Campus", destination: "Station", mode: "Cab", date: "Today", time: "10:30 AM", inGroup: true, groupId: 101 },
  { id: 2, name: "Priya Singh", source: "Campus", destination: "Station", mode: "Cab", date: "Today", time: "10:45 AM", inGroup: false, groupId: null },
  { id: 3, name: "Rahul Verma", source: "Campus", destination: "Station", mode: "Cab", date: "Today", time: "10:30 AM", inGroup: true, groupId: 102 }
];

// "Aman Sharma" -> "AS"
function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function TripMatches() {
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState(null);

  const toggleMenu = (id) => {
    setOpenMenuId((current) => (current === id ? null : id));
  };

  return (
    <div className="tm-trips-page">
      <div className="tm-trips-container">

        {/* Header */}
        <div className="tm-trips-header">
          <div className="tm-header-content">
            <p className="tm-header-label">
              <Compass size={16} strokeWidth={2.5} />
              Trip Matches
            </p>
            <h1 className="tm-header-title">
              Find your squad
            </h1>
            <p className="tm-header-description">
              We found {mockMatches.length} students traveling on similar routes.
            </p>
          </div>

          <button className="tm-post-trip-btn" onClick={() => navigate("/chats")}>
            <Users size={18} />
            Create Group
          </button>
        </div>

        {/* Matches List */}
        <div className="tm-match-list" style={{ paddingTop: "24px" }}>
          {mockMatches.map((match) => (
            <div key={match.id} className="tm-match-card">

              <div className="tm-match-avatar">
                {getInitials(match.name)}
              </div>

              <div className="tm-match-body">
                <div className="tm-match-top">
                  <h2 className="tm-match-name">{match.name}</h2>
                  {match.inGroup && (
                    <span className="tm-match-badge">In a group</span>
                  )}
                </div>

                <div className="tm-match-route">
                  <span className="tm-route-place">{match.source || "Campus"}</span>
                  <span className="tm-route-track">
                    <span className="tm-route-dot" />
                    <span className="tm-route-line" />
                    <span className="tm-route-dot end" />
                  </span>
                  <span className="tm-route-place">{match.destination || "Station"}</span>
                  <span className="tm-route-mode">{match.mode || "Cab"}</span>
                </div>

                <div className="tm-match-time">
                  <Clock size={14} />
                  {match.date || "Today"} at {match.time}
                </div>
              </div>

              <div className="tm-match-actions">
                <button
                  className="tm-chat-btn"
                  aria-expanded={openMenuId === match.id}
                  onClick={() => toggleMenu(match.id)}
                >
                  <MessageSquare size={16} />
                  Chat
                </button>

                {openMenuId === match.id && (
                  <>
                    {/* Click-outside catcher */}
                    <div
                      className="tm-menu-backdrop"
                      onClick={() => setOpenMenuId(null)}
                    />
                    <div className="tm-action-menu">
                      <button onClick={() => navigate("/chats")}>
                        <User size={14} /> Personal chat
                      </button>
                      {match.inGroup && (
                        <button onClick={() => navigate("/chats")}>
                          <ShieldPlus size={14} /> Join group
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TripMatches;