import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resendVerificationEmail } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [errorMessage, setErrorMessage] = useState("");
  const [showVerifyButton, setShowVerifyButton] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setShowVerifyButton(false);
    setEmailSent(false);

    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      navigate("/dashboard");
    } else {
      setErrorMessage(result.payload?.message || "An unexpected error occurred.");
      if (result.payload?.action === "verify") {
        setShowVerifyButton(true);
      }
    }
  };

  const handleResendVerification = async () => {
    setErrorMessage(""); 
    setEmailSent(false);

    const result = await dispatch(resendVerificationEmail(email));

    if (resendVerificationEmail.fulfilled.match(result)) {
      setEmailSent(true);
    } else {
      setErrorMessage(result.payload || "Failed to resend verification email.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4 w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center fw-bold mb-3">Login</h2>

        {/* Show error message */}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        {/* Show Resend Verification Button */}
        {showVerifyButton && (
          <div className="mt-2">
            <button className="btn btn-warning w-100" onClick={handleResendVerification}>
              Resend Verification Email
            </button>
          </div>
        )}

        {/* Show Success Message After Sending Email */}
        {emailSent && (
          <div className="alert alert-success mt-2">
            Verification email has been sent. Please check your inbox.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input with Toggle */}
          <div className="mb-3 position-relative">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="text-center mt-3">
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
