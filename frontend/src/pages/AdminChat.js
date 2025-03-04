import { useState, useEffect } from "react";
import axios from "axios";

const AdminChat = () => {
  const [queries, setQueries] = useState([]);
  const [reply, setReply] = useState("");
  const [selectedQuery, setSelectedQuery] = useState(null);

  // Fetch unanswered queries
  useEffect(() => {
    axios.get("/api/chat/unanswered-queries")
      .then(response => setQueries(response.data))
      .catch(error => console.error("Error fetching queries:", error));
  }, []);

  // Send admin reply
  const sendReply = async () => {
    if (!selectedQuery || !reply.trim()) return;

    try {
      await axios.post("/api/chat/admin-reply", {
        query_id: selectedQuery.id,
        reply
      });

      setQueries(queries.filter(q => q.id !== selectedQuery.id));
      setReply("");
      setSelectedQuery(null);
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  return (
    <div className="admin-chat">
      <h2>Admin Chat Support</h2>

      <div className="query-list">
        <h3>Unanswered Queries:</h3>
        {queries.map((query, index) => (
          <div key={index} onClick={() => setSelectedQuery(query)}>
            {query.message}
          </div>
        ))}
      </div>

      {selectedQuery && (
        <div className="reply-box">
          <h3>Replying to: {selectedQuery.message}</h3>
          <textarea value={reply} onChange={(e) => setReply(e.target.value)} />
          <button onClick={sendReply}>Send Reply</button>
        </div>
      )}
    </div>
  );
};

export default AdminChat;
