import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../redux/chatSlice";

const ChatSupport = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.chat);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const updatedMessages = [...messages, { text: newMessage, sender: "user" }];
    setNewMessage("");

    // Simulate bot response
    setTimeout(() => {
      updatedMessages.push({ text: "Thank you for reaching out!", sender: "bot" });
    }, 1000);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4">Live Chat Support</h2>
      <div className="bg-white p-4 shadow-md rounded w-96 h-96 flex flex-col justify-between">
        <div className="overflow-y-auto flex-1">
          {messages.map((msg, index) => (
            <p key={index} className={msg.sender === "user" ? "text-right text-blue-600" : "text-left text-gray-600"}>
              {msg.text}
            </p>
          ))}
        </div>
        <div className="flex mt-4">
          <input 
            type="text" 
            className="flex-1 p-2 border rounded" 
            value={newMessage} 
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSupport;
