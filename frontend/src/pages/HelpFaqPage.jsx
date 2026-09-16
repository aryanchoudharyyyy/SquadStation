import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, ChevronDown, MessageSquare } from "lucide-react";
import "../styles/HelpFaq.css";

const faqData = [
  {
    category: "Trips & Matching",
    items: [
      {
        id: "q1",
        icon: "🚌",
        question: "What is College Travel?",
        answer: "College Travel helps college students travelling from the same college to the same railway station connect with each other and share a cab or auto fare."
      },
      {
        id: "q2",
        icon: "📍",
        question: "How do I create a trip?",
        answer: "Create a trip by adding your source point, destination station, travel date, and expected departure time. Other students with similar travel plans can then discover your trip."
      },
      {
        id: "q3",
        icon: "🔎",
        question: "How does trip matching work?",
        answer: "College Travel looks for students with a similar college/source point, destination station, and travel time. Your train number is not required for matching."
      },
      {
        id: "q4",
        icon: "👥",
        question: "How do I join a trip?",
        answer: "Browse available trips, select one that matches your travel plans, and join it. Once connected, you can coordinate with your squad."
      }
    ]
  },
  {
    category: "Squads & Group Chat",
    items: [
      {
        id: "q5",
        icon: "🛡️",
        question: "What is a Squad?",
        answer: "A Squad is a group of students travelling together. Members can coordinate their journey and split the cost of shared transportation."
      },
      {
        id: "q6",
        icon: "💬",
        question: "How does Squad Chat work?",
        answer: "Every squad has its own group chat where members can discuss pickup points, timings, fare sharing, and other travel details."
      },
      {
        id: "q7",
        icon: "🚪",
        question: "Can I leave a Squad?",
        answer: "Yes. If your plans change, you can leave the squad. It's a good idea to inform the other members before leaving."
      }
    ]
  },
  {
    category: "Fare & Travel",
    items: [
      {
        id: "q8",
        icon: "💵",
        question: "How is the fare split?",
        answer: "The travel cost is shared between the members of the squad. Discuss and confirm the amount with your squad before starting the journey."
      },
      {
        id: "q9",
        icon: "💳",
        question: "Does College Travel process payments?",
        answer: "College Travel is designed to help students find travel partners and coordinate shared travel. Payment arrangements should be confirmed directly between squad members."
      },
      {
        id: "q10",
        icon: "🚕",
        question: "Do I have to book the cab or auto through College Travel?",
        answer: "No. College Travel helps you find people travelling with you. Your squad can decide how and where to arrange the actual transportation."
      }
    ]
  },
  {
    category: "Account & Privacy",
    items: [
      {
        id: "q11",
        icon: "✏️",
        question: "How do I edit my profile?",
        answer: "Go to Profile → Edit Profile to update your available profile information."
      },
      {
        id: "q12",
        icon: "🔐",
        question: "How do I keep my account safe?",
        answer: "Never share your password, OTP, or sensitive financial information with anyone. If you notice suspicious activity, report it immediately."
      },
      {
        id: "q13",
        icon: "🚩",
        question: "What should I do if I face a problem with another user?",
        answer: "If a user behaves inappropriately or makes you uncomfortable, stop interacting with them and use the available reporting options."
      }
    ]
  }
];

const HelpFaqPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [openQuestionId, setOpenQuestionId] = useState(null);

  const toggleQuestion = (id) => {
    setOpenQuestionId(openQuestionId === id ? null : id);
  };

  // Filter FAQs based on search query
  const filteredData = faqData.map(section => ({
    ...section,
    items: section.items.filter(item => 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  return (
    <div className="faq-page-container">
      <div className="faq-header-top animate-in" style={{ animationDelay: "0s" }}>
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Help & FAQs
        </button>
      </div>

      <div className="faq-hero animate-in" style={{ animationDelay: "0.05s" }}>
        <div className="faq-hero-icon">❓</div>
        <h1 className="text-h1">Got a question?<br/>Find your answer quickly.</h1>
        <p className="text-body-lg">Everything you need to know about using College Travel.</p>
      </div>

      <div className="faq-search-container animate-in" style={{ animationDelay: "0.1s" }}>
        <Search size={20} className="faq-search-icon" />
        <input 
          type="text" 
          className="faq-search-input" 
          placeholder="Search for a question..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="faq-content">
        {filteredData.length > 0 ? (
          filteredData.map((section, sectionIndex) => (
            <div key={section.category} className="faq-section animate-in" style={{ animationDelay: `${0.15 + (sectionIndex * 0.05)}s` }}>
              <h2 className="faq-section-title">{section.category}</h2>
              <div className="faq-accordion">
                {section.items.map((item) => {
                  const isOpen = openQuestionId === item.id;
                  return (
                    <div key={item.id} className={`faq-item ${isOpen ? 'active' : ''}`}>
                      <button 
                        className="faq-question" 
                        onClick={() => toggleQuestion(item.id)}
                        aria-expanded={isOpen}
                      >
                        <span className="faq-question-content">
                          <span>{item.icon}</span>
                          <span>{item.question}</span>
                        </span>
                        <ChevronDown size={18} className="faq-chevron" />
                      </button>
                      {isOpen && (
                        <div className="faq-answer animate-in" style={{ animationDelay: "0s" }}>
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="faq-section animate-in" style={{ textAlign: "center", padding: "2rem" }}>
            <p className="text-body-lg text-tertiary">No matching questions found.</p>
          </div>
        )}
      </div>

      <div className="help-support-card animate-in" style={{ animationDelay: "0.4s" }}>
        <div style={{fontSize: "32px", marginBottom: "12px"}}>🆘</div>
        <h2 className="text-h2">Still Need Help?</h2>
        <p className="text-body">Can't find what you're looking for? We're here to help.</p>
        <button className="btn btn-primary btn-lg" style={{marginTop: "8px"}}>
          <MessageSquare size={18} /> Contact Support
        </button>
      </div>
    </div>
  );
};

export default HelpFaqPage;
