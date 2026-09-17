import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, CheckCircle } from "lucide-react";
import "../styles/ContactPage.css";

const categories = [
  {
    id: "bug",
    icon: "🐛",
    title: "Report a Problem",
    desc: "Something isn't working?",
  },
  {
    id: "feedback",
    icon: "💡",
    title: "Share Feedback",
    desc: "Have an idea to improve College Travel?",
  },
  {
    id: "question",
    icon: "❓",
    title: "General Question",
    desc: "Need help with College Travel?",
  },
  {
    id: "other",
    icon: "🤝",
    title: "Other",
    desc: "Something else? Tell us about it.",
  },
];

const topicOptions = [
  { value: "", label: "Select a topic" },
  { value: "bug", label: "Report a Problem" },
  { value: "feedback", label: "Share Feedback" },
  { value: "question", label: "General Question" },
  { value: "other", label: "Other" },
];

const ContactPage = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });

  const handleCategoryClick = (id) => {
    setForm((prev) => ({ ...prev, topic: id }));
    // Scroll the form into view
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const isValid = form.name.trim() && form.email.trim() && form.topic && form.message.trim();

  return (
    <div className="contact-page-container">
      {/* ── Back Button ── */}
      <div className="contact-header-top animate-in" style={{ animationDelay: "0s" }}>
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Contact Us
        </button>
      </div>

      {/* ── Hero ── */}
      <div className="contact-hero animate-in" style={{ animationDelay: "0.05s" }}>
        <div className="contact-hero-icon">📩</div>
        <h1 className="text-h1">Get in touch</h1>
        <p className="text-body-lg">
          Have a question, found a problem, or want to share feedback? Send us a
          message and we'll get back to you.
        </p>
      </div>

      <div className="contact-categories animate-in" style={{ animationDelay: "0.1s" }}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`contact-category-card${form.topic === cat.id ? " active" : ""}`}
            onClick={() => handleCategoryClick(cat.id)}
          >
            <div className="contact-category-icon">{cat.icon}</div>
            <div className="contact-category-content">
              <h3 className="contact-category-title">{cat.title}</h3>
              <p className="contact-category-desc">{cat.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* ── Contact Form ── */}
      <div className="contact-form-card animate-in" id="contact-form" style={{ animationDelay: "0.2s" }}>
        {!submitted ? (
          <>
            <h2 className="contact-form-title">Send us a message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="input-group">
                <label className="label" htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  className="input"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label className="label" htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  className="input"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label className="label" htmlFor="contact-topic">Topic</label>
                <select
                  id="contact-topic"
                  className="input contact-select"
                  name="topic"
                  value={form.topic}
                  onChange={handleChange}
                >
                  {topicOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label className="label" htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  className="input contact-textarea"
                  name="message"
                  placeholder="Tell us how we can help..."
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg contact-submit-btn"
                disabled={!isValid}
              >
                <Send size={18} /> Send Message
              </button>
            </form>
          </>
        ) : (
          <div className="contact-success animate-in" style={{ animationDelay: "0s" }}>
            <CheckCircle size={40} className="contact-success-icon" />
            <h2 className="text-h2">Message sent successfully!</h2>
            <p className="text-body">
              Thanks for reaching out. We'll get back to you soon.
            </p>
          </div>
        )}
      </div>

      {/* ── Still Need Help ── */}
      <div className="contact-help-card animate-in" style={{ animationDelay: "0.3s" }}>
        <span className="contact-help-emoji">📧</span>
        <h2 className="text-h2">Still need help?</h2>
        <p className="text-body contact-email-link">support@collegetravel.app</p>
        <p className="text-caption">We usually respond within 24–48 hours.</p>
      </div>
    </div>
  );
};

export default ContactPage;
