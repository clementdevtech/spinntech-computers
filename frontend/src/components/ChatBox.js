import { useState } from "react";

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
    // Simulate bot reply
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "We'll get back to you soon!", sender: "bot" }]);
    }, 1500);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 shadow-md rounded-lg w-80">
      <h3 className="text-lg font-semibold">Live Chat</h3>
      <div className="h-40 overflow-y-auto border p-2">
        {messages.map((msg, index) => (
          <div key={index} className={`p-1 rounded ${msg.sender === "user" ? "text-right" : "text-left"}`}>
            <span className={`inline-block p-2 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          className="w-full p-1 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-3 py-1 rounded ml-2">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
