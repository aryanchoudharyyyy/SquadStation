import { useRef, useState } from "react";
import { Send, Paperclip, Smile } from "lucide-react";

export default function ChatComposer({
  placeholder,
  connected,
  onSendMessage,
}) {
  const [inputText, setInputText] = useState("");
  const textareaRef = useRef(null);

  const handleInput = (e) => {
    const value = e.target.value;

    setInputText(value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  };

  const handleSend = () => {
    const message = inputText.trim();

    if (!message || !connected) return;

    onSendMessage(message);

    setInputText("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-composer-wrap">
      <div className="chat-composer-box">

        <button
          className="chat-composer-btn icon-btn"
          title="Attach file"
          type="button"
        >
          <Paperclip size={20} />
        </button>

        <button
          className="chat-composer-btn icon-btn"
          title="Add emoji"
          type="button"
        >
          <Smile size={20} />
        </button>

        <textarea
          ref={textareaRef}
          className="chat-composer-input"
          placeholder={placeholder}
          value={inputText}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          rows={1}
        />

        <button
          className="chat-send-btn"
          onClick={handleSend}
          disabled={!inputText.trim() || !connected}
          title="Send message"
          type="button"
        >
          <Send size={18} />
        </button>

      </div>
    </div>
  );
}