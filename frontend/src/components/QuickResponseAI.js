const QuickResponses = ({ sendMessage }) => {
    const responses = [
      "How can I track my order?",
      "What is your refund policy?",
      "Can I change my shipping address?",
    ];
  
    return (
      <div className="p-2">
        <h3 className="text-lg font-semibold">Quick Responses</h3>
        {responses.map((msg, index) => (
          <button
            key={index}
            onClick={() => sendMessage(msg)}
            className="block w-full text-left bg-gray-200 hover:bg-gray-300 p-2 rounded mt-1"
          >
            {msg}
          </button>
        ))}
      </div>
    );
  };
  
  export default QuickResponses;
  