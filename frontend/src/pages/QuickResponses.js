const quickResponses = [
    { question: "How do I reset my password?", answer: "Go to settings and click 'Reset Password'." },
    { question: "What payment methods are accepted?", answer: "We accept PayPal, M-PESA, and bank transfers." }
  ];
  
  const QuickResponses = () => {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold mb-4">Quick Responses</h2>
        <div className="bg-white p-4 shadow-md rounded">
          {quickResponses.map((res, index) => (
            <div key={index} className="border-b p-3">
              <p className="font-semibold">{res.question}</p>
              <p className="text-gray-600">{res.answer}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default QuickResponses;
  