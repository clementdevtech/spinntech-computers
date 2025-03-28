import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnansweredQueries, adminReply } from "../redux/chatSlice";

const AdminChat = () => {
    const dispatch = useDispatch();
    const { unansweredQueries, loading } = useSelector((state) => state.chat);
    const [reply, setReply] = useState("");
    const [selectedQuery, setSelectedQuery] = useState(null);

    useEffect(() => {
        dispatch(fetchUnansweredQueries());
    }, [dispatch]);

    const handleReply = async () => {
        if (selectedQuery && reply.trim()) {
            await dispatch(adminReply({ query_id: selectedQuery.id, reply }));
            setReply("");
            setSelectedQuery(null);
        }
    };

    return (
        <div className="admin-chat">
            <h2>Admin Chat Panel</h2>
            {loading ? <p>Loading...</p> : unansweredQueries.length ? (
                <ul>
                    {unansweredQueries.map((query) => (
                        <li key={query.id} onClick={() => setSelectedQuery(query)}>
                            {query.user_message}
                        </li>
                    ))}
                </ul>
            ) : <p>No unanswered queries</p>}
            {selectedQuery && (
                <div>
                    <h3>Reply to: {selectedQuery.user_message}</h3>
                    <textarea value={reply} onChange={(e) => setReply(e.target.value)} />
                    <button onClick={handleReply}>Send Reply</button>
                </div>
            )}
        </div>
    );
};

export default AdminChat;
