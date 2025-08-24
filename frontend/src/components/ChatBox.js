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

    const handleSend = async () => {
        if (!message.trim()) return;
    
        
        setMessages([...messages, { user_message: message, bot_response: "" }]);
    
        const welcomeMessages = [
            "Hello! Let me check if I can find an answer for you...",
            "Hi there! Give me a moment to fetch the best answer for you.",
            "Hey! I'm on it. Let me see what I can find.",
            "Greetings! Let me process your request quickly.",
            "Welcome! I'll find the best response for you in no time."
        ];
    
        const randomMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

        setMessages((prevMessages) => [
            ...prevMessages,
            { user_message: "", bot_response: randomMessage }
        ]);
    
        // Step 3: Send the message to the backend
        dispatch(sendMessage(message));
        setMessage("");
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
