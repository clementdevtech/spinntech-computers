import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = () => {
    setMessage("A password reset link has been sent to your email.");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4">Forgot Password</h2>
      <div className="bg-white p-4 shadow-md rounded w-96">
        <label className="block text-gray-700">Enter your email</label>
        <input 
          type="email" 
          className="w-full p-2 border border-gray-300 rounded mt-1" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleReset} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Reset Password</button>
        {message && <p className="text-green-600 mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
