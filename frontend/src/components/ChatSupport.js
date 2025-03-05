import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../assets/css/ChatSupport.css";
import { FaTimes } from "react-icons/fa";

const ChatSupport = ({ isOpen, toggleChat }) => {
  const [query, setQuery] = useState("");
  const [suggestedReplies, setSuggestedReplies] = useState([]);
  const [messages, setMessages] = useState([]);
  const chatRef = useRef(null);

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        toggleChat(); // ✅ Now correctly closes the chat
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, toggleChat]);

  // Fetch quick replies when user types
  useEffect(() => {
    if (query.length > 3) {
      axios.get(`/api/chat/suggested-replies?query=${query}`)
        .then(response => setSuggestedReplies(response.data))
        .catch(error => console.error("Error fetching suggestions:", error));
    } else {
      setSuggestedReplies([]);
    }
  }, [query]);

  // Handle message submission
  const sendMessage = async () => {
    if (!query.trim()) return;

    setMessages([...messages, { text: query, sender: "user" }]);
    setQuery("");

    try {
      await axios.post("/api/chat/store-query", { message: query });
    } catch (error) {
      console.error("Error sending query:", error);
    }
  };

  return (
    isOpen && (
      <div className="chat-container" ref={chatRef}>
        <div className="chat-header">
          <h4>Chat Support</h4>
          <button className="close-btn" onClick={toggleChat}>
            <FaTimes size={20} />
          </button>
        </div>
        <div className="chat-box">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>{msg.text}</div>
          ))}
          {suggestedReplies.length > 0 && (
            <div className="quick-replies">
              <p>Suggested Replies:</p>
              {suggestedReplies.map((reply, index) => (
                <button key={index} className="quick-reply" onClick={() => setQuery(reply.message)}>
                  {reply.message}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="chat-input">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your query..."
            className="input-box"
          />
          <button onClick={sendMessage} className="send-button">Send</button>
        </div>
      </div>
    )
  );
};

export default ChatSupport;
