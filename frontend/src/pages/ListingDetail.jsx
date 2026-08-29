import { useParams, useNavigate } from "react-router-dom";
import {
  TrainFront,
  BusFront,
  MapPin,
  Calendar,
  Clock,
  MoveRight,
  Users,
  ShieldAlert,
  Trash2,
  ChevronRight,
  Share2,
  Package,
  User,
} from "lucide-react";
import "../styles/ListingDetail.css";

const dummyListing = {
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
  postedAt: "2h ago",
  interestCount: 3,
};

function ListingDetail() {
  // const {id} = useParams();
  const navigate = useNavigate();
  const currentUserId = 102;
  const isOwner = currentUserId === dummyListing.postedByUserId;
  const isTrain = dummyListing.listingType === "TRAIN";

  return (
    <div className="ld-page">
      {/* ── Breadcrumb ── */}
      <nav className="ld-breadcrumb">
        <span className="ld-breadcrumb-link" onClick={() => navigate("/marketplace")}>
          Marketplace
        </span>
        <ChevronRight size={14} className="ld-breadcrumb-sep" />
        <span className="ld-breadcrumb-current">{dummyListing.description}</span>
      </nav>

      <div className="ld-layout">
        {/* ════════════════ LEFT COLUMN ════════════════ */}
        <div className="ld-main-col">
          {/* ── Hero Ticket Card ── */}
          <div className={`ld-hero-card ${isTrain ? "ld-accent-train" : "ld-accent-bus"}`}>
            <div className="ld-hero-top">
              <div className="ld-hero-icon-wrap">
                {isTrain ? <TrainFront size={28} /> : <BusFront size={28} />}
              </div>
              <div className="ld-hero-info">
                <div className="ld-hero-title-row">
                  <h1 className="ld-hero-title">{dummyListing.description}</h1>
                  <span className={`ld-status-badge ld-status-${dummyListing.status.toLowerCase()}`}>
                    {dummyListing.status}
                  </span>
                </div>
                <div className="ld-hero-tags">
                  <span className="ld-tag">{dummyListing.ticketClass}</span>
                  <span className="ld-tag ld-tag-type">
                    {isTrain ? <TrainFront size={12} /> : <BusFront size={12} />}
                    {dummyListing.listingType}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Route Timeline ── */}
          <div className="ld-route-card ld-animate" style={{ animationDelay: "0.1s" }}>
            <h2 className="ld-section-label">Journey Route</h2>
            <div className="ld-route-timeline">
              <div className="ld-route-point">
                <div className="ld-route-dot ld-dot-origin"></div>
                <div className="ld-route-point-info">
                  <h3>{dummyListing.source}</h3>
                  <span>Origin</span>
                </div>
              </div>

              <div className="ld-route-line">
                <div className="ld-route-dash"></div>
                <MoveRight size={18} className="ld-route-arrow" />
                <div className="ld-route-dash"></div>
              </div>

              <div className="ld-route-point">
                <div className="ld-route-dot ld-dot-dest"></div>
                <div className="ld-route-point-info">
                  <h3>{dummyListing.destination}</h3>
                  <span>Destination</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Meta Info Grid ── */}
          <div className="ld-meta-grid ld-animate" style={{ animationDelay: "0.2s" }}>
            <div className="ld-meta-card">
              <div className="ld-meta-icon-wrap">
                <Calendar size={20} />
              </div>
              <div>
                <p className="ld-meta-label">Travel Date</p>
                <p className="ld-meta-value">{dummyListing.travelDate}</p>
              </div>
            </div>
            <div className="ld-meta-card">
              <div className="ld-meta-icon-wrap">
                <Clock size={20} />
              </div>
              <div>
                <p className="ld-meta-label">Posted</p>
                <p className="ld-meta-value">{dummyListing.postedAt}</p>
              </div>
            </div>
            <div className="ld-meta-card">
              <div className="ld-meta-icon-wrap">
                <Package size={20} />
              </div>
              <div>
                <p className="ld-meta-label">Quantity</p>
                <p className="ld-meta-value">
                  {dummyListing.quantity} {dummyListing.quantity > 1 ? "tickets" : "ticket"}
                </p>
              </div>
            </div>
            <div className="ld-meta-card">
              <div className="ld-meta-icon-wrap">
                <Users size={20} />
              </div>
              <div>
                <p className="ld-meta-label">Interested</p>
                <p className="ld-meta-value">{dummyListing.interestCount} people</p>
              </div>
            </div>
          </div>

          {/* ── Seller Info ── */}
          <div className="ld-seller-card ld-animate" style={{ animationDelay: "0.3s" }}>
            <h2 className="ld-section-label">Listed By</h2>
            <div className="ld-seller-row">
              <div className="ld-seller-avatar">
                <User size={20} />
              </div>
              <div className="ld-seller-info">
                <p className="ld-seller-name">User #{dummyListing.postedByUserId}</p>
                <p className="ld-seller-time">Posted {dummyListing.postedAt}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════ RIGHT COLUMN ════════════════ */}
        <div className="ld-side-col">
          <div className="ld-price-card ld-animate" style={{ animationDelay: "0.15s" }}>
            <p className="ld-price-label">Asking Price</p>
            <h2 className="ld-price-value">₹{dummyListing.price}</h2>
            <p className="ld-price-sub">per ticket</p>

            <div className="ld-price-divider"></div>

            {isOwner ? (
              <div className="ld-owner-actions">
                <div className="ld-interest-box">
                  <h3>🔥 {dummyListing.interestCount} Users Interested</h3>
                  <p>Check your messages to finalize the deal.</p>
                </div>
                <button className="ld-btn-delete">
                  <Trash2 size={18} />
                  Delete Listing
                </button>
              </div>
            ) : (
              <div className="ld-buyer-actions">
                <button className="ld-btn-primary">Express Interest</button>
                <p className="ld-safety-tip">
                  <ShieldAlert size={14} />
                  Only pay after verifying the ticket in person.
                </p>
              </div>
            )}

            <div className="ld-price-divider"></div>

            <button className="ld-btn-share">
              <Share2 size={16} />
              Share Listing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingDetail;