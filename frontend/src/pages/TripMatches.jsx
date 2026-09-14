import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Clock, MessageSquare, User, ShieldPlus, Compass } from "lucide-react";
import "../styles/TripsPage.css";

// Mock data based on the requirements
const mockMatches = [
  { id: 1, name: "Aman Sharma", time: "10:30 AM", inGroup: true, groupId: 101 },
  { id: 2, name: "Priya Singh", time: "10:45 AM", inGroup: false, groupId: null },
  { id: 3, name: "Rahul Verma", time: "10:30 AM", inGroup: true, groupId: 102 }
];

function TripMatches() {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (id) => {
    if (activeDropdown === id) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(id);
    }
  };

  return (
    <div className="trips-page">
      <div className="trips-container">
        
        {/* Header */}
        <div className="trips-header">
          <div className="header-content">
            <p className="header-label">
              <Compass size={16} strokeWidth={2.5} />
              Trip Matches
            </p>
            <h1 className="header-title">
              Find your squad
            </h1>
            <p className="header-description">
              We found {mockMatches.length} students traveling on similar routes.
            </p>
          </div>
          
          <button className="post-trip-btn" onClick={() => navigate("/chats")}>
            <Users size={18} />
            Create Group
          </button>
        </div>

        {/* Matches List */}
        <div className="trip-list" style={{ paddingTop: '24px' }}>
          {mockMatches.map((match) => (
            <div key={match.id} className="trip-card">
              
              <div className="trip-main">
                <h2 className="trip-title" style={{ fontSize: '20px' }}>
                  {match.name}
                </h2>
                <div style={{ fontSize: "14px", color: "var(--stone-600)", margin: "8px 0" }}>
                  <strong>{match.source}</strong> to <strong>{match.destination}</strong> ({match.mode})
                </div>
                
                <div className="trip-meta">
                  <span className="trip-meta-item">
                    <Clock size={15} /> {match.date} at {match.time}
                  </span>
                </div>
              </div>

              {/* Action Dropdown */}
              <div className="trip-action" style={{ justifyContent: 'center' }}>
                <button 
                  className="view-trip-btn" 
                  onClick={() => toggleDropdown(match.id)}
                >
                  <MessageSquare size={16} style={{ marginRight: '6px' }} /> Chat
                </button>

                {activeDropdown === match.id && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => navigate("/chats")}>
                      <User size={14} /> Personal Chat
                    </button>
                    {match.inGroup && (
                      <button className="btn btn-secondary btn-sm" onClick={() => navigate("/chats")}>
                        <ShieldPlus size={14} /> Join Group
                      </button>
                    )}
                  </div>
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
