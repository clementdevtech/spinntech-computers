import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying...");
  const [error, setError] = useState("");

  useEffect(() => {
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    if (!email || !token) {
      setError("Verification token or email is missing.");
      return;
    }

    console.log("Sending email and token:", email, token); // Debugging log

    axios
      .get("http://localhost:5000/api/auth/verify-email", {
        params: { email, token }, // Send email and token properly
      })
      .then((response) => {
        setMessage(response.data.message);
        setError("");
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Verification failed.");
      });
  }, [navigate, searchParams]);

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 shadow text-center">
        <h2>Email Verification</h2>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

export default VerifyEmail;
