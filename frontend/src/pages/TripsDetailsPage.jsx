import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  User,
  MessageCircle,
  Compass,
} from "lucide-react";

import "../styles/TripsDetailsPage.css";

const INITIAL_TRIPS = [
  {
    id: 1,
    sourcePoint: "KIET Gate",
    boardingStation: "Ghaziabad Railway Station",
    finalDestination: "Mumbai Central",
    travelDate: "2026-09-15",
    travelTime: "06:30 AM",
    postedBy: "Aryan C."
  },
  {
    id: 2,
    sourcePoint: "KIET Hostel",
    boardingStation: "New Delhi Railway Station",
    finalDestination: "Lucknow Charbagh",
    travelDate: "2026-09-18",
    travelTime: "09:00 PM",
    postedBy: "Sneha P."
  },
  {
    id: 3,
    sourcePoint: "College Gate",
    boardingStation: "Anand Vihar ISBT",
    finalDestination: "Dehradun",
    travelDate: "2026-09-20",
    travelTime: "11:30 PM",
    postedBy: "Rahul V."
  }
];

const fmtDate = (d) => {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
};

export default function TripDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const trip = location.state?.trip || INITIAL_TRIPS[0];

  const handleOpenChat = () => {
    navigate(`/chats?trip=${trip.id}`);
  };

  if (!trip) {
    return (
      <div className="trip-detail-page">
        <div className="trip-detail-container">
          <Link to="/trips" className="back-link">
            <ArrowLeft size={16} />
            Back to trips
          </Link>
          <div className="not-found-card">
            <p>This trip doesn't exist, or it's been taken down.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="trip-detail-page">
      <div className="trip-detail-container">

        <Link to="/trips" className="back-link animate-in">
          <ArrowLeft size={16} />
          Back to trips
        </Link>

        <div className="detail-card animate-in" style={{ animationDelay: "0.05s" }}>

          <p className="header-label">
            <Compass size={16} strokeWidth={2.5} />
            Squad trip
          </p>

          <h1 className="trip-detail-route">
            {trip.sourcePoint}
            <ArrowRight size={22} className="trip-arrow" />
            {trip.boardingStation}
          </h1>

          <div className="trip-detail-list">

            {trip.finalDestination && (
              <div className="trip-detail-item">
                <MapPin size={18} className="trip-detail-icon" />
                <div>
                  <span className="trip-detail-label">Final destination</span>
                  <span className="trip-detail-value">
                    {trip.finalDestination}
                  </span>
                </div>
              </div>
            )}

            <div className="trip-detail-item">
              <Calendar size={18} className="trip-detail-icon" />
              <div>
                <span className="trip-detail-label">Travel date</span>
                <span className="trip-detail-value">
                  {fmtDate(trip.travelDate)}
                </span>
              </div>
            </div>

            <div className="trip-detail-item">
              <Clock size={18} className="trip-detail-icon" />
              <div>
                <span className="trip-detail-label">Departure time</span>
                <span className="trip-detail-value">
                  {trip.travelTime}
                </span>
              </div>
            </div>

            <div className="trip-detail-item">
              <User size={18} className="trip-detail-icon" />
              <div>
                <span className="trip-detail-label">Posted by</span>
                <span className="trip-detail-value">
                  {trip.postedBy}
                </span>
              </div>
            </div>

          </div>

          <button className="chat-btn" onClick={handleOpenChat}>
            <MessageCircle size={18} />
            Chat with {trip.postedBy.split(" ")[0]}
          </button>

        </div>
      </div>
    </div>
  );
}