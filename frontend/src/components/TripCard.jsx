import { TrainFront, BusFront, Clock, MoveRight, Flame, Edit, Trash2 } from "lucide-react";
import "../styles/TripCard.css"; 

function TripCard({ trip }) {
  if (!trip) return null;

  const isTrain = trip.mode === "TRAIN";

  const dateObj = new Date(trip.travelDateTime);
  const formattedDate = dateObj.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  const formattedTime = dateObj.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="tc-card">
      <div className="tc-header">
        <div className={`tc-icon-box ${isTrain ? 'tc-bg-train' : 'tc-bg-bus'}`}>
          {isTrain ? <TrainFront size={20} /> : <BusFront size={20} />}
        </div>
        
        <div className="tc-title">
          {trip.vehicleNumber ? `Vehicle: ${trip.vehicleNumber}` : `${isTrain ? 'Train' : 'Bus'} Trip`}
        </div>
        
        <span className="tc-time">
          <Clock size={14} /> {formattedTime}
        </span>
        
        <div className="tc-price">
          {trip.mode}
        </div>
      </div>

      <div className="tc-route-section">
        <span className="tc-route-city">{trip.sourcePoint}</span>
        <MoveRight size={14} className="tc-arrow" />
        <span className="tc-route-city">{trip.boardingStation}</span>
        <div className="tc-date-box">{formattedDate}</div>
      </div>

      <div className="tc-footer">
        <div className="tc-badge has-interest">
          <Flame size={14} /> 3 Interested
        </div>
        
        <div className="tc-action-column">
          <button className="tc-icon-btn"><Edit size={14} /></button>
          <button className="tc-icon-btn"><Trash2 size={14} /></button>
        </div>
      </div>
    </div>
  );
}

export default TripCard;