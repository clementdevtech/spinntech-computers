import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/Footer.css";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <div className="container">
        <div className="footer-container">
          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none d-block py-1">🏠 Home</Link></li>
              <li><Link to="/shop" className="text-light text-decoration-none d-block py-1">🛒 Shop</Link></li>
              <li><Link to="/contact" className="text-light text-decoration-none d-block py-1">📞 Contact Us</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Legal</h5>
            <ul className="list-unstyled">
              <li><Link to="/terms" className="text-light text-decoration-none d-block py-1">📜 Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-light text-decoration-none d-block py-1">🔒 Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Follow Us</h5>
            <div className="d-flex gap-3">
               <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={24} />
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} />
              </a>
              <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer">
                <FaTiktok size={24} />
                </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-4">
          <p className="mb-0">&copy; {new Date().getFullYear()} Computer Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
