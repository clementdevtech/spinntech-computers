import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <div className="container">
        <div className="row">
          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none d-block py-1">🏠 Home</a></li>
              <li><a href="/shop" className="text-light text-decoration-none d-block py-1">🛒 Shop</a></li>
              <li><a href="/contact" className="text-light text-decoration-none d-block py-1">📞 Contact Us</a></li>
            </ul>
          </div>

          {/* Policies */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Legal</h5>
            <ul className="list-unstyled">
              <li><a href="/terms" className="text-light text-decoration-none d-block py-1">📜 Terms of Service</a></li>
              <li><a href="/privacy" className="text-light text-decoration-none d-block py-1">🔒 Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Follow Us</h5>
            <div className="d-flex gap-3">
              <a href="#" className="text-light fs-5">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-light fs-5">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-light fs-5">
                <i className="fab fa-instagram"></i>
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
