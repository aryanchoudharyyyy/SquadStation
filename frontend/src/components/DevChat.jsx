import { useEffect, useState, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { 
  Hash, Users, Search, MoreVertical, Paperclip, Smile, Send, 
  Reply, SmilePlus
} from "lucide-react";
import "../styles/DevChat.css";

// ---------------------------------------------------------
// COMPONENT: Sidebar
// ---------------------------------------------------------
const ChatSidebar = () => {
  return (
    <div className="chat-sidebar">
      <div className="sidebar-header">
        College Travel
      </div>
      <div className="sidebar-content">
        
        <div className="sidebar-section">
          <div className="sidebar-section-title">Active Trips</div>
          <div className="sidebar-item active">
            <Hash size={14} className="sidebar-icon" />
            <span>Noida to Delhi</span>
          </div>
          
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-title">Direct Messages</div>
          
          <div className="member-item">
            <div className="member-avatar">
              AR
              <div className="member-status-dot"></div>
            </div>
            <span className="member-name">Aryan (you)</span>
          </div>
          
          <div className="member-item">
            <div className="member-avatar">
              RA
              <div className="member-status-dot"></div>
            </div>
            <span className="member-name">Rahul</span>
          </div>
          
          <div className="member-item">
            <div className="member-avatar" style={{backgroundColor: '#e2e8f0'}}>
              PR
              <div className="member-status-dot" style={{backgroundColor: '#94a3b8'}}></div>
            </div>
            <span className="member-name" style={{opacity: 0.7}}>Priya</span>
          </div>

        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------
// COMPONENT: Chat Header
// ---------------------------------------------------------
const ChatHeader = ({ tripName, connected }) => {
  return (
    <div className="chat-header">
      <div className="chat-header-info">
        <h2 className="chat-room-name">
          <Hash size={18} color="#94a3b8" />
          {tripName}
        </h2>
        <div className="chat-room-meta">
          <div className="connection-indicator">
            <div className={`indicator-dot ${connected ? 'connected' : 'connecting'}`}></div>
            <span>{connected ? "Connected" : "Connecting..."}</span>
          </div>
          <span>|</span>
          <span>8 members</span>
        </div>
      </div>
      <div className="chat-header-actions">
        <button><Search size={18} /></button>
        <button><Users size={18} /></button>
        <button><MoreVertical size={18} /></button>
      </div>
    </div>
  );
};

// ---------------------------------------------------------
// COMPONENT: Message Group
// ---------------------------------------------------------
const MessageGroup = ({ msg, isGrouped, isOwn }) => {
  const initials = `U${msg.senderId}`;
  
  // Format time (e.g. 5:42 PM)
  const timeString = msg.sendAt 
    ? new Date(msg.sendAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) 
    : new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

  return (
    <div className={`message-group ${isGrouped ? 'grouped' : ''} ${isOwn ? 'is-own' : ''}`}>
      
      <div className="message-avatar-container">
        {!isGrouped ? (
          <div className="message-avatar">
            {initials}
          </div>
        ) : (
          <div className="message-time-hover">{timeString}</div>
        )}
      </div>

      <div className="message-content-area">
        {!isGrouped && (
          <div className="message-meta">
            <span className="message-author">User {msg.senderId} {isOwn && "(you)"}</span>
            <span className="message-time">{timeString}</span>
          </div>
        )}
        <div className="message-text">
          {msg.content}
        </div>
      </div>

      <div className="message-actions">
        <button title="Add Reaction"><SmilePlus size={16} /></button>
        <button title="Reply"><Reply size={16} /></button>
        <button title="More Actions"><MoreVertical size={16} /></button>
      </div>
    </div>
  );
};

// ---------------------------------------------------------
// MAIN COMPONENT: DevChat
// ---------------------------------------------------------
function DevChat() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);
  
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Setup ID & Auth
  const groupId = 9999;
  const tripName = "Noida to Delhi";
  const searchParams = new URLSearchParams(window.location.search);
  const userId = parseInt(searchParams.get("user")) || 101; 
  const dummyToken = "dummy-jwt-token";

  useEffect(() => {
    const socket = new SockJS("http://localhost:8085/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${dummyToken}`,
        userId: userId.toString()
      },
      onConnect: () => {
        setConnected(true);
        client.subscribe(`/topic/group.${groupId}`, (message) => {
          const receivedMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, receivedMessage]);
        });
      },
      onDisconnect: () => setConnected(false)
    });

    client.activate();
    setStompClient(client);

    return () => client.deactivate();
  }, [groupId, userId]);

  // Auto-scroll to bottom only when a new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  const handleInput = (e) => {
    setInputText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 300)}px`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (inputText.trim() && stompClient && connected) {
      const chatMessage = {
        groupId: groupId,
        content: inputText.trim()
      };
      stompClient.publish({
        destination: "/app/chat.sendMessage",
        body: JSON.stringify(chatMessage)
      });
      
      setInputText("");
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'; // reset height after send
      }
    }
  };

  return (
    <div className="devchat-layout">
      
      <ChatSidebar />

      <main className="chat-main">
        <ChatHeader tripName={tripName} connected={connected} />

        <div className="chat-messages-container">
          
          {/* Chat Intro (Empty state alternative) */}
          <div className="chat-intro">
            <h1 className="chat-intro-title">{tripName}</h1>
            <p className="chat-intro-desc">
              This is the start of the trip group chat. Coordinate with your co-passengers here!
            </p>
          </div>

          {messages.map((msg, idx) => {
            // Group messages if they are from the same user sequentially
            const prevMsg = messages[idx - 1];
            const isGrouped = prevMsg && prevMsg.senderId === msg.senderId;
            const isOwn = msg.senderId === userId;

            return (
              <MessageGroup 
                key={idx} 
                msg={msg} 
                isGrouped={isGrouped} 
                isOwn={isOwn} 
              />
            );
          })}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-composer-container">
          <div className="chat-composer">
            <textarea
              ref={textareaRef}
              className="composer-input"
              placeholder="Message group"
              value={inputText}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <div className="composer-toolbar">
              <div className="composer-tools-left">
                <button className="composer-btn" title="Attach file"><Paperclip size={16} /></button>
                <button className="composer-btn" title="Add emoji"><Smile size={16} /></button>
              </div>
              <div className="composer-tools-right">
              <button 
                className="btn btn-primary btn-sm"
                onClick={sendMessage}
                disabled={!inputText.trim() || !connected}
                title="Send message"
              >
                <Send size={14} />
              </button>
              </div>
            </div>
        </div>
        </div>
      </main>

    </div>
  );
}

export default DevChat;