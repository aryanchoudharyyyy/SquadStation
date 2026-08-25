import { Ticket } from "lucide-react";
import { Link } from "react-router-dom";
function Footer(){
    return (
        <footer className="footer">
            <div className="footer-content">

                <div className="footer-brand-section">
                    <div className="nav-brand" style={{cursor: "default"}}>
                        <div className="brand-icon-wrapper">
                            <Ticket size={20} strokeWidth={2.5}/>

                        </div>
                        College Travel
                    </div>
                    <p className="footer-tagline">
                        Your campus, connected. Plan trips, split costs, and discover local deals with your college squad.
                    </p>
                </div>

          
            {/* Links Grid */}
        <div className="footer-links-grid">
          <div className="footer-column">
            <h4>Platform</h4>
            <Link to="/trips">Find a Trip</Link>
            <Link to="/marketplace">Marketplace</Link>
            <Link to="/chats">My Groups</Link>
          </div>
          <div className="footer-column">
            <h4>Resources</h4>
            <Link to="#">Safety Guidelines</Link>
            <Link to="#">FAQs</Link>
            <Link to="#">Campus Rules</Link>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <Link to="#">About Us</Link>
            <Link to="#">Contact</Link>
            <Link to="#">Privacy Policy</Link>
          </div>
        </div>
      </div>
       {/* Copyright Bar */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} College Travel. All rights reserved.</p>
      </div>
        </footer>
    );

}
export default Footer;