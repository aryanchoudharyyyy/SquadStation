import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Clock, Hash, ChevronRight, Navigation, ArrowRight } from "lucide-react";
import "../styles/PostTrip.css";

function PostTrip() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Trip submitted! Redirecting to Trip Matches...");
    // After API is connected, we will navigate to matches with the trip ID
    navigate("/trip-matches");
  };

  return (
    <div className="pt-page">
      {/* ── Breadcrumb ── */}
      <nav className="pt-breadcrumb animate-in">
        <span className="pt-breadcrumb-link" onClick={() => navigate("/home")}>
          Home
        </span>
        <ChevronRight size={14} className="pt-breadcrumb-sep" />
        <span className="pt-breadcrumb-current">Post a Trip</span>
      </nav>

      {/* ── Page Header ── */}
      <div className="pt-header animate-in">
        <h1>Find Travel Buddies</h1>
        <p>Enter your travel details to find students going the same way.</p>
      </div>

      {/* ── Form Card ── */}
      <div className="pt-form-card card animate-in" style={{ animationDelay: "0.1s" }}>
        <form onSubmit={handleSubmit}>
          
          {/* ── 1. Route Details ── */}
          <div className="pt-section">
            <h3 className="pt-section-title">Your Route</h3>
            
            <div className="pt-route-container">
              <div className="pt-input-group">
                <label className="pt-label">Source Point (Start)</label>
                <div className="pt-input-wrapper">
                  <MapPin size={18} className="pt-input-icon text-blue" />
                  <input type="text" placeholder="e.g., KIET Gate" className="pt-input" required />
                </div>
              </div>

              <div className="pt-route-arrow">
                <ArrowRight size={20} className="text-gray" />
              </div>

              <div className="pt-input-group">
                <label className="pt-label">Boarding Station</label>
                <div className="pt-input-wrapper">
                  <Navigation size={18} className="pt-input-icon text-orange" />
                  <input type="text" placeholder="e.g., Ghaziabad Railway Station" className="pt-input" required />
                </div>
              </div>
            </div>

            <div className="pt-input-group" style={{ marginTop: "16px" }}>
              <label className="pt-label">Final Destination <span className="pt-optional">(Optional)</span></label>
              <div className="pt-input-wrapper">
                <MapPin size={18} className="pt-input-icon text-green" />
                <input type="text" placeholder="e.g., Mumbai Central" className="pt-input" />
              </div>
            </div>
          </div>

          <div className="pt-divider"></div>

          {/* ── 2. Schedule & Info ── */}
          <div className="pt-section pt-schedule-section">
            <h3 className="pt-section-title">Schedule & Info</h3>
            
            <div className="pt-grid-2">
              <div className="pt-input-group">
                <label className="pt-label">Travel Date</label>
                <div className="pt-input-wrapper">
                  <Calendar size={18} className="pt-input-icon text-blue" />
                  <input type="date" className="pt-input" required />
                </div>
              </div>

              <div className="pt-input-group">
                <label className="pt-label">Travel Time</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div className="pt-input-wrapper" style={{ flex: 1 }}>
                    <Clock size={18} className="pt-input-icon text-orange" />
                    <input type="text" placeholder="hh:mm" className="pt-input" required />
                  </div>
                  <select className="pt-input" style={{ width: '80px', padding: '0 12px', cursor: 'pointer', appearance: 'none', textAlign: 'center' }}>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-input-group" style={{ marginTop: "8px" }}>
              <label className="pt-label">Vehicle/Train No. <span className="pt-optional">(Optional)</span></label>
              <div className="pt-input-wrapper">
                <Hash size={18} className="pt-input-icon text-gray" />
                <input type="text" placeholder="e.g., 12951" className="pt-input" />
              </div>
            </div>
          </div>

          {/* ── Action Buttons ── */}
          <div className="pt-actions">
            <button type="button" className="btn btn-ghost" onClick={() => navigate("/home")}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Find matches
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default PostTrip;
