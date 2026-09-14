import { useState, useMemo } from "react";
import {
  MapPin,
  Calendar,
  Users,
  ArrowRight,
  X,
  Plus,
  IndianRupee,
  Compass,
} from "lucide-react";

import "../styles/TripsPage.css";


// --- mock data -------------------------------------------------------

const TODAY = new Date("2026-09-13");

const daysUntil = (dateStr) =>
  Math.round(
    (new Date(dateStr) - TODAY) / (1000 * 60 * 60 * 24)
  );

const INITIAL_TRIPS = [
  {
    id: 1,
    sourcePoint: "KIET Gate",
    boardingStation: "Ghaziabad Railway Station",
    finalDestination: "Mumbai Central",
    travelDate: "2026-09-15",
    travelTime: "06:30 AM",
    vehicleNo: "12951",
    tag: "Train",
    postedBy: "Aryan C."
  },
  {
    id: 2,
    sourcePoint: "KIET Hostel",
    boardingStation: "New Delhi Railway Station",
    finalDestination: "Lucknow Charbagh",
    travelDate: "2026-09-18",
    travelTime: "09:00 PM",
    vehicleNo: "12429",
    tag: "Train",
    postedBy: "Sneha P."
  },
  {
    id: 3,
    sourcePoint: "College Gate",
    boardingStation: "Anand Vihar ISBT",
    finalDestination: "Dehradun",
    travelDate: "2026-09-20",
    travelTime: "11:30 PM",
    vehicleNo: "Volvo AC",
    tag: "Bus",
    postedBy: "Rahul V."
  }
];

const TAG_STYLES = {
  Train: { border: "road-trip", chip: "road-trip" },
  Bus: { border: "adventure", chip: "adventure" },
  Cab: { border: "beach", chip: "beach" }
};

const SORT_OPTIONS = [
  { key: "newest", label: "Newest first" },
  { key: "departure", label: "Leaving soonest" }
];

const fmtDate = (d) => {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
};

// --- form defaults ---------------------------------------------------

const EMPTY_FORM = {
  sourcePoint: "",
  boardingStation: "",
  finalDestination: "",
  travelDate: "",
  travelTime: "",
  vehicleNo: "",
  tag: "Train"
};

export default function TripsPage() {
  const [trips, setTrips] = useState(INITIAL_TRIPS);
  const [sortKey, setSortKey] = useState("newest");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const sortedTrips = useMemo(() => {
    const list = [...trips];

    switch (sortKey) {
      case "departure":
        return list.sort(
          (a, b) => daysUntil(a.travelDate) - daysUntil(b.travelDate)
        );
      case "newest":
      default:
        return list.sort((a, b) => b.id - a.id);
    }
  }, [trips, sortKey]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.sourcePoint || !form.boardingStation || !form.travelDate || !form.travelTime) {
      return;
    }

    const newTrip = {
      id: Date.now(),
      sourcePoint: form.sourcePoint,
      boardingStation: form.boardingStation,
      finalDestination: form.finalDestination,
      travelDate: form.travelDate,
      travelTime: form.travelTime,
      vehicleNo: form.vehicleNo,
      tag: form.tag,
      postedBy: "You"
    };

    setTrips((prev) => [newTrip, ...prev]);
    setForm(EMPTY_FORM);
    setShowForm(false);
  };

  return (
    <div className="trips-page">
      <div className="trips-container">

        {/* Header */}
        <div className="trips-header">
          <div className="header-content">

            <p className="header-label">
              <Compass size={16} strokeWidth={2.5} />
              Squad trips
            </p>

            <h1 className="header-title">
              Where's everyone headed?
            </h1>

            <p className="header-description">
              Browse trips other squads have posted, or put
              your own plan out there and let people join in.
            </p>

          </div>

          <button
            onClick={() => setShowForm(true)}
            className="post-trip-btn"
          >
            <Plus size={18} />
            Post a trip
          </button>
        </div>

        {/* Sort row */}
        <div className="sort-row">
          <span className="sort-label">
            Sort by
          </span>

          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSortKey(opt.key)}
              className={`sort-btn ${
                sortKey === opt.key ? "active" : ""
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Trip list */}
        <div className="trip-list">

          {sortedTrips.map((trip) => {
            const style =
              TAG_STYLES[trip.tag] ||
              TAG_STYLES["Road trip"];

            const spotsLeft =
              trip.squadSize - trip.joined;

            const isFull = spotsLeft <= 0;

            return (
              <div
                key={trip.id}
                className={`trip-card ${style.border}`}
              >

                {/* Main info */}
                <div className="trip-main">

                  <span
                    className={`trip-tag ${style.chip}`}
                  >
                    {trip.tag}
                  </span>

                  <h2 className="trip-title">
                    {trip.sourcePoint}
                    <ArrowRight
                      size={18}
                      className="trip-arrow"
                    />
                    {trip.boardingStation}
                  </h2>

                  {trip.finalDestination && (
                    <p className="trip-description">
                      Final Destination: {trip.finalDestination}
                    </p>
                  )}

                  <div className="trip-meta">

                    <span className="trip-meta-item">
                      <Calendar size={15} />
                      {fmtDate(trip.travelDate)} at {trip.travelTime}
                    </span>

                    <span className="trip-meta-item">
                      <Compass size={15} />
                      {trip.vehicleNo ? `Vehicle: ${trip.vehicleNo}` : "Vehicle TBD"}
                    </span>

                    <span>
                      Posted by {trip.postedBy}
                    </span>

                  </div>
                </div>

                {/* Perforation */}
                <div className="trip-perforation">
                  <span className="perforation-circle top" />
                  <span className="perforation-circle bottom" />
                </div>

                {/* Action */}
                <div className="trip-action">
                  <button
                    className="view-trip-btn"
                  >
                    View trip
                  </button>

                </div>
              </div>
            );
          })}

          {sortedTrips.length === 0 && (
            <div className="empty-state">
              No trips posted yet. Be the first to plan one.
            </div>
          )}

        </div>
      </div>

      {/* Post trip slide-over */}
      {showForm && (
        <div className="form-overlay">

          <div
            className="form-backdrop"
            onClick={() => setShowForm(false)}
          />

          <div className="form-panel">

            {/* Form header */}
            <div className="form-header">

              <h2 className="form-title">
                Post a trip
              </h2>

              <button
                onClick={() => setShowForm(false)}
                className="close-btn"
              >
                <X size={20} />
              </button>

            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="trip-form"
            >

              {/* Route */}
              <div className="form-grid">
                <Field label="Source Point (Start)">
                  <input
                    required
                    value={form.sourcePoint}
                    onChange={(e) => setForm({ ...form, sourcePoint: e.target.value })}
                    placeholder="e.g., KIET Gate"
                    className="input"
                  />
                </Field>
                <Field label="Boarding Station">
                  <input
                    required
                    value={form.boardingStation}
                    onChange={(e) => setForm({ ...form, boardingStation: e.target.value })}
                    placeholder="e.g., Ghaziabad Railway Station"
                    className="input"
                  />
                </Field>
              </div>

              <Field label="Final Destination (Optional)">
                <input
                  value={form.finalDestination}
                  onChange={(e) => setForm({ ...form, finalDestination: e.target.value })}
                  placeholder="e.g., Mumbai Central"
                  className="input"
                />
              </Field>

              {/* Schedule */}
              <div className="form-grid">
                <Field label="Travel Date">
                  <input
                    required
                    type="date"
                    value={form.travelDate}
                    onChange={(e) => setForm({ ...form, travelDate: e.target.value })}
                    className="input"
                  />
                </Field>
                <Field label="Travel Time">
                  <input
                    required
                    type="text"
                    value={form.travelTime}
                    onChange={(e) => setForm({ ...form, travelTime: e.target.value })}
                    placeholder="hh:mm AM/PM"
                    className="input"
                  />
                </Field>
              </div>

              {/* Extras */}
              <div className="form-grid">
                <Field label="Vehicle/Train No.">
                  <input
                    value={form.vehicleNo}
                    onChange={(e) => setForm({ ...form, vehicleNo: e.target.value })}
                    placeholder="e.g., 12951"
                    className="input"
                  />
                </Field>
                <Field label="Mode of Transport">
                  <select
                    value={form.tag}
                    onChange={(e) => setForm({ ...form, tag: e.target.value })}
                    className="input"
                  >
                    {Object.keys(TAG_STYLES).map((tag) => (
                      <option key={tag} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              {/* Submit */}
              <button type="submit" className="submit-trip-btn">
                <MapPin size={18} />
                Post trip
              </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="field">
      <span className="field-label">
        {label}
      </span>

      {children}
    </label>
  );
}