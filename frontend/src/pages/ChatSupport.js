import { useState } from "react";

const ChatSupport = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message.trim()) return;
    const newMessages = [...messages, { text: message, sender: "user" }];
    setMessages(newMessages);
    setMessage("");
    
    // Simulating bot response
    setTimeout(() => {
      setMessages([...newMessages, { text: "Thank you for reaching out! How can we assist you?", sender: "bot" }]);
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
            value={message} 
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatSupport;
