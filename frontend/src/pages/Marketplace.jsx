import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, LayoutGrid, TrainFront, BusFront, ArrowDownUp, ChevronDown, MoveRight, Clock } from "lucide-react";
import "../styles/Marketplace.css";

const mockListings = [
    { 
        id: 1, 
        postedByUserId: 101,
        listingType: "TRAIN", 
        status: "OPEN",
        ticketClass: "Sleeper",
        source: "Noida", 
        destination: "Delhi",
        travelDate: "27 May", 
        price: 120,
        quantity: 1,
        description: "Vande Bharat Express",
        active: true,
        postedAt: "2h ago",
        interestCount: 3
    },
    { 
        id: 2, 
        postedByUserId: 102,
        listingType: "BUS", 
        status: "OPEN",
        ticketClass: "AC Seater",
        source: "Ghaziabad", 
        destination: "Delhi",
        travelDate: "28 May", 
        price: 100,
        quantity: 2,
        description: "Volvo Premium Bus",
        active: true,
        postedAt: "5h ago",
        interestCount: 1
    }
];

function Marketplace(){
    const[searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const[activeFilter, setActiveFilter] = useState("All");
    
    return(
        <div className="marketplace-wrapper">
            <div className="marketplace-hero">
                <h1>Find your next journey</h1>
                <p>Buy, sell and discover train and bus tickets within your campus community.</p>
                <div className="search-container">
                    <Search className="search-icon" size={20} strokeWidth={2.5} />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search for destination, train, or bus..."
                        value={searchQuery} 
                        onChange={(e)=> setSearchQuery(e.target.value)}
                    />
                </div>

                {/* --- PREMIUM FILTER BAR --- */}
                <div className="filter-container-premium">
                    <div className="filter-tabs-group">
                        <button 
                            className={`filter-btn ${activeFilter === "All" ? "active-all" : ""}`}
                            onClick={() => setActiveFilter("All")}
                        >
                            <LayoutGrid size={18} /> All
                        </button>
                        <button 
                            className={`filter-btn ${activeFilter === "TRAIN" ? "active-train" : ""}`}
                            onClick={() => setActiveFilter("TRAIN")}
                        >
                            <TrainFront size={18} /> Train
                        </button>
                        <button 
                            className={`filter-btn ${activeFilter === "BUS" ? "active-bus" : ""}`}
                            onClick={() => setActiveFilter("BUS")}
                        >
                            <BusFront size={18} /> Bus
                        </button>
                    </div>
                    
                    <div className="filter-divider"></div>
                    
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <button className="sort-btn">
                            <ArrowDownUp size={16} className="sort-icon" />
                            Newest First
                            <ChevronDown size={16} />
                        </button>
                        <button 
                            className="post-ticket-btn" 
                            onClick={() => navigate("/marketplace/create")}
                        >
                            + Sell Ticket
                        </button>
                    </div>
                </div>
            </div>

            <div className="list-card-container" style={{marginTop: "40px"}}>
                {mockListings
                    .filter((item) => {
                        const searchStr = `${item.source} ${item.destination} ${item.description}`.toLowerCase();
                        const matchesSearch = searchStr.includes(searchQuery.toLowerCase());
                        const matchesFilter = activeFilter === "All" ? true : item.listingType === activeFilter;
                        return matchesSearch && matchesFilter;
                    })
                    .map((item) => (
                        <div 
                            className="premium-list-card" 
                            key={item.id} 
                            onClick={() => navigate("/marketplace/" + item.id)} 
                        >
                            {/* Top Header */}
                            <div className="list-card-header">
                                <div className="list-card-title-section">
                                    <div className="list-icon-wrapper">
                                        {item.listingType === 'TRAIN' ? (
                                            <TrainFront size={20} className="icon-train" />
                                        ) : (
                                            <BusFront size={20} className="icon-bus" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="list-title">{item.description}</h3>
                                        <p className="list-subtitle">Class: {item.ticketClass}</p>
                                    </div>
                                </div>
                                <div className="posted-time">
                                    <Clock size={14} />
                                    <span>Posted {item.postedAt}</span>
                                </div>
                            </div>

                            <div className="list-card-body">
                                {/* Route Info */}
                                <div className="route-info">
                                    <div className="route-stop">
                                        <span className="stop-city">{item.source}</span>
                                        <span className="stop-date">{item.travelDate}</span>
                                    </div>
                                    
                                    <div className="route-connector">
                                        <div className="connector-dot"></div>
                                        <div className="connector-line"><MoveRight size={16} className="route-arrow-icon" /></div>
                                        <div className="connector-dot"></div>
                                    </div>

                                    <div className="route-stop">
                                        <span className="stop-city">{item.destination}</span>
                                        <span className="stop-date">{item.travelDate}</span>
                                    </div>
                                </div>

                                {/* Divider & Price */}
                                <div className="price-section-list">
                                    <div className="price-divider"></div>
                                    <div className="price-content">
                                        <div className="price">₹{item.price}</div>
                                      
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
export default Marketplace;