import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const [message, setMessage] = useState("Verifying...");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (!token) {
        setMessage("Invalid verification link");
        return;
      }

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/verify-email?token=${token}`);
        setMessage(response.data.message);
        setTimeout(() => navigate("/login"), 3000);
      } catch (error) {
        setMessage("Verification failed. The link may have expired.");
      }
    };

    verifyEmail();
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 shadow text-center">
        <h2>Email Verification</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default VerifyEmail;
