import { TrainFront, BusFront, Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import "../styles/TripCard.css";

function TripCard({ trip }) {
  if (!trip) return null;

  const isTrain = trip.mode === "TRAIN";

  const dateObj = new Date(trip.travelDateTime);
  const formattedDate = dateObj.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  const formattedTime = dateObj.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="trip-card">
      <div className="tc-header">
        <div className={`tc-mode-badge ${isTrain ? "tc-bg-train" : "tc-bg-bus"}`}>
          {isTrain ? <TrainFront size={16} /> : <BusFront size={16} />}
          <span>{isTrain ? "Train" : "Bus"}</span>
        </div>
        
        {trip.vehicleNumber && (
          <span className="tc-vehicle-number">
            • {trip.vehicleNumber}
          </span>
        )}
      </div>

      <div className="tc-route-section">
        <div className="tc-route-point">
          <div className="tc-dot tc-dot-source"></div>
          <div className="tc-point-info">
            <span className="tc-label">Source Point</span>
            <h3 className="tc-station">{trip.sourcePoint}</h3>
          </div>
        </div>

        <div className="tc-route-divider">
          <div className="tc-dashed-line"></div>
          <ArrowRight size={18} className="tc-arrow" />
          <div className="tc-dashed-line"></div>
        </div>

        <div className="tc-route-point">
          <div className="tc-dot tc-dot-boarding"></div>
          <div className="tc-point-info">
            <span className="tc-label">Boarding Station</span>
            <h3 className="tc-station">{trip.boardingStation}</h3>
          </div>
        </div>
      </div>

      <div className="tc-datetime-section">
        <div className="tc-time-capsule">
          <Calendar size={15} />
          <span>{formattedDate}</span>
        </div>
        <div className="tc-time-capsule">
          <Clock size={15} />
          <span>{formattedTime}</span>
        </div>
      </div>

      {trip.destination && (
        <div className="tc-footer">
          <MapPin size={14} className="tc-pin-icon" />
          <span className="tc-footer-text">
            Traveling to: <strong>{trip.destination}</strong>
          </span>
        </div>
      )}
    </div>
  );
}

export default TripCard;