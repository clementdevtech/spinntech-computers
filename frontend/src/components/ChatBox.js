import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Connect to backend WebSocket server

const ChatBox = () => {
    const [messages, setMessages] = useState([
        { text: "Hello! How can I help you?", sender: "bot" },
    ]);
    const [input, setInput] = useState("");

    useEffect(() => {
        socket.on("receiveMessage", (message) => {
            setMessages((prev) => [...prev, { text: message.userMessage, sender: "user" }]);
            if (message.botResponse) {
                setTimeout(() => {
                    setMessages((prev) => [...prev, { text: message.botResponse, sender: "bot" }]);
                }, 500);
            }
        });

        return () => socket.off("receiveMessage");
    }, []);

    const sendMessage = () => {
        if (input.trim() === "") return;

        socket.emit("sendMessage", input); // Send message in real-time
        setMessages([...messages, { text: input, sender: "user" }]);
        setInput("");
    };

    return (
        <div className="chat-box">
            <h3>Live Chat</h3>
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatBox;