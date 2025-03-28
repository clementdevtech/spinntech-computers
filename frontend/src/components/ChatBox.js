import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, fetchAllMessages } from "../redux/chatSlice";

const ChatBox = () => {
    const dispatch = useDispatch();
    const { messages } = useSelector((state) => state.chat);
    const [message, setMessage] = useState("");

    useEffect(() => {
        dispatch(fetchAllMessages());
    }, [dispatch]);

    const handleSend = () => {
        if (message.trim()) {
            dispatch(sendMessage(message));
            setMessage("");
        }
    };

    return (
        <div className="chat-box">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <p><strong>You:</strong> {msg.user_message}</p>
                        <p><strong>Bot/Admin:</strong> {msg.bot_response || "Pending response..."}</p>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default ChatBox;
