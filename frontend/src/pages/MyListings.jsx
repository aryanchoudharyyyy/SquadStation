import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TrainFront, BusFront, Clock, MoveRight, Flame, Trash2, Edit } from "lucide-react";
import "../styles/MyListings.css";
import TripCard from "../components/TripCard";

const myListings = [
    {
        id: 1, listingType: "TRAIN", source: "Noida", destination: "Delhi",
        travelDate: "27 May", price: 120, description: "Vande Bharat Express",
        postedAt: "2h ago", interestCount: 3, status: "OPEN"
    }
];

const myTrips = [
    {
        id: 101,
        mode: "TRAIN",
        sourcePoint: "Rajiv Chowk",
        boardingStation: "New Delhi Railway",
        travelDateTime: "2024-10-24T10:30:00",
        vehicleNumber: "12951",
        destination: "Mumbai Central"
    },
    {
        id: 102,
        mode: "BUS",
        sourcePoint: "Campus",
        boardingStation: "Station",
        travelDateTime: "2024-05-29T08:00:00",
        vehicleNumber: null,
        destination: null
    }
];

function MyListings() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("listings");

    return (
        <div className="pr-page">
             <h1 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "24px", color: "var(--color-text-main)" }}>My Dashboard</h1>
             <div className="pr-tabs pr-animate">
                <button className={`pr-tab ${activeTab==="listings"? 'active' : ''}`}
                onClick={()=> setActiveTab('listings')}>
                    My Listings ({myListings.length})
                </button>
                <button className={`pr-tab ${activeTab === 'trips' ? 'active' : ''}`}
                onClick={() => setActiveTab('trips')}>
                    My Trips ({myTrips.length})
                </button>
                <button className={`pr-tab ${activeTab === 'interests' ? 'active' :''}`}
                onClick={() => setActiveTab('interests')}>
                    My Interests (0)
                </button>
             </div>
             
             <div className="pr-content pr-animate" style={{animationDelay: '0.1s'}}>
                {activeTab === 'listings' && (
                    <div className="pr-listings-grid">
                        {myListings.length===0 ? (
                            <div className="pr-empty-state">
                                <p>You haven't posted any tickets yet.</p>
                                <button className="pr-btn-primary" onClick={()=>
                                    navigate("/marketplace/create")
                                }>Sell a Ticket</button>
                            </div>):(
                                myListings.map(item=>(
                                    <div key={item.id} className="pr-ticket-card">
                                        <div className="pr-ticket-top">
                                            <div className={`pr-ticket-icon ${item.listingType === 'TRAIN' ? 'bg-blue' : 'bg-green'}`}>
                                                {item.listingType === 'TRAIN' ? <TrainFront size={20} className="text-blue"/> : <BusFront size={20} className="text-green"/>}
                                            </div>
                                            <div className="pr-ticket-title">
                                                <h3>{item.description}</h3>
                                                <span className="pr-time"><Clock size={12}/> {item.postedAt}</span>
                                            </div>
                                            <div className="pr-ticket-price">
                                                {item.price ? `₹${item.price}` : "Varies"}
                                            </div>
                                        </div>
                                        <div className="pr-ticket-route">
                                            <span className="route-city">{item.source}</span>
                                            <MoveRight size={14} className="text-gray" />
                                            <span className="route-city">{item.destination}</span>
                                            <div className="pr-ticket-date">{item.travelDate}</div>
                                        </div>
                                        <div className="pr-ticket-actions">
                                            <div 
                                                className={`pr-interest-badge ${item.interestCount > 0 ? 'has-interest' : ''}`}
                                                onClick={() => item.interestCount > 0 && navigate(`/marketplace/${item.id}`)}
                                            >
                                                <Flame size={14} /> {item.interestCount} Interested
                                            </div>
                                            
                                            <div className="pr-action-btns">
                                                <button className="pr-icon-btn"><Edit size={16} /></button>
                                                <button className="pr-icon-btn delete"><Trash2 size={16} /></button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        )}
                    </div>
                )}
                
                {activeTab === 'trips' && (
                    <div className="pr-listings-grid">
                        {myTrips.length === 0 ? (
                            <div className="pr-empty-state">
                                <p>You haven't posted any trips yet.</p>
                            </div>
                        ) : (
                            myTrips.map(tripItem => (
                                <TripCard key={tripItem.id} trip={tripItem} />
                            ))
                        )}
                    </div>
                )}
                
                {activeTab === 'interests' && (
                    <div className="pr-empty-state">
                        <p>You haven't expressed interest in any tickets yet.</p>
                        <button className="pr-btn-primary" onClick={() => navigate("/marketplace")}>Browse Marketplace</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyListings;
