import { useState } from "react";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async () => {
    try {
      const response = await fetch(`${REACT_APP_API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setMessage(data.message);
      setError("");
    } catch (err) {
      setError(err.message);
      setMessage("");
    }
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
        <button 
          onClick={handleReset} 
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Reset Password
        </button>
        {message && <p className="text-green-600 mt-2">{message}</p>}
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
