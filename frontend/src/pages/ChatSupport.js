import { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/ChatSupport.css";

const ChatSupport = () => {
  const [query, setQuery] = useState("");
  const [suggestedReplies, setSuggestedReplies] = useState([]);
  const [messages, setMessages] = useState([]);

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
    <div className="chat-container">
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
  );
};

export default ChatSupport;
