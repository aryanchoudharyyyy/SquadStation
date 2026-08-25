import { useState } from "react";
import { useNavigate } from "react-router-dom";
const mockListings = [
    { id: 1, title: "Shatabdi Express to Delhi (20th Aug)", price: "₹1200", type: "Train", icon: "🚆" },
    { id: 2, title: "Volvo Sleeper to Jaipur (22nd Aug)", price: "₹800", type: "Bus", icon: "🚌" },
    { id: 3, title: "Vande Bharat to Kanpur (25th Aug)", price: "₹1500", type: "Train", icon: "🚆" }
];

function Marketplace(){
    const[searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    return(
        <div className="marketplace-container">
            <div className="marketplace-header">
                <h1>Campus Marketplace</h1>
                <input
                type="text"
                className="search-bar"
                placeholder="Search for tickets..."
                value={searchQuery}
                onChange={(e)=>
                    setSearchQuery(e.target.value)
                }
                />
            </div>
            <div className="item-grid">
                {mockListings.filter((item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((item) => (
                    <div className="item-card" key={item.id} onClick={()=> navigate("/marketplace/" + item.id)} style={{cursor:"pointer"}}>
                        <div className="item-image-placeholder">
                            {item.icon}
                        </div>
                        <div className="item-details">
                            <p className="item-type">{item.type}</p>
                            <h3 className="item-title">{item.title}</h3>
                            <p className="item-price">{item.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Marketplace;