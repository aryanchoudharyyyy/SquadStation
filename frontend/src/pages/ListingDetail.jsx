import { useParams, useNavigate } from "react-router-dom";
const mockListings = [
    { id: 1, title: "Shatabdi Express to Delhi (20th Aug)", price: "₹1200", type: "Train", icon: "🚆" },
    { id: 2, title: "Volvo Sleeper to Jaipur (22nd Aug)", price: "₹800", type: "Bus", icon: "🚌" },
    { id: 3, title: "Vande Bharat to Kanpur (25th Aug)", price: "₹1500", type: "Train", icon: "🚆" }
];
function ListingDetail(){
    const {id} = useParams();
    const navigate = useNavigate();
    const ticket = mockListings.find(item => item.id === Number(id));
    if(!ticket){
        return <h2 style={{textAlign: "center", marginTop:"50px"}}>Ticket Not Found! 😢</h2>

    }
    return (
        <div className="detail-container">
            <button onClick = {()=> navigate(-1)} style={{float:"left", cursor:"pointer"}}>⬅ Go Back</button>
            <div style={{clear: "both"}}></div>
            <div className="detail-icon">{ticket.icon}</div>
            <p style={{color: "#3b82f6", fontWeight: "bold"}}>{ticket.type}</p>
            <h1>{ticket.title}</h1>
            <p className="detail-price">{ticket.price}</p>
            <button className="buy-button">Buy Ticket Now</button>
        </div>
    );
}
export default ListingDetail;