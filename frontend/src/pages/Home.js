import { Link } from "react-router-dom";
import ProductListing from "../components/ProductListing";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <div className="bg-light min-vh-100">
      {/* Hero Section */}
      <section className="hero-section position-relative text-center text-white d-flex align-items-center justify-content-center" 
        style={{ backgroundImage: "url('/assets/hero-banner.jpg')", height: "500px", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="bg-dark bg-opacity-50 p-5 rounded shadow-lg">
          <h1 className="display-4 fw-bold">Shop the Latest Trends</h1>
          <p className="lead">Find exclusive deals on high-quality products.</p>
          <div className="mt-3">
            <Link to="/shop" className="btn btn-success btn-lg me-3 shadow-sm">
              Shop Now
            </Link>
            <Link to="/register" className="btn btn-primary btn-lg shadow-sm">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container py-5">
        <h2 className="text-center fw-bold mb-4">Featured Products</h2>
        <ProductListing />
      </section>

      {/* Why Choose Us Section */}
      <section className="container py-5 bg-white text-center rounded shadow-sm">
        <h3 className="fw-bold mb-4">Why Shop With Us?</h3>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="p-4 bg-light rounded shadow-sm">
              <h4 className="text-success fw-semibold">🚀 Fast Shipping</h4>
              <p>We deliver your products quickly and efficiently.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 bg-light rounded shadow-sm">
              <h4 className="text-primary fw-semibold">🔒 Secure Payments</h4>
              <p>Your transactions are safe and encrypted.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 bg-light rounded shadow-sm">
              <h4 className="text-warning fw-semibold">📞 24/7 Support</h4>
              <p>We are always here to assist you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="container py-5 bg-light text-center rounded shadow-sm">
        <h3 className="fw-bold mb-4">What Our Customers Say</h3>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="p-4 bg-white rounded shadow-sm">
              <p className="text-muted fst-italic">"Amazing products and super fast delivery!"</p>
              <p className="fw-bold text-secondary">- Sarah W.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 bg-white rounded shadow-sm">
              <p className="text-muted fst-italic">"The best shopping experience ever! Highly recommend."</p>
              <p className="fw-bold text-secondary">- James K.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 bg-white rounded shadow-sm">
              <p className="text-muted fst-italic">"Excellent customer service and great prices."</p>
              <p className="fw-bold text-secondary">- Emily R.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Offer */}
      <section className="container py-5 text-center bg-danger text-white rounded shadow-sm">
        <h3 className="fw-bold mb-2">Limited-Time Offer! 🚀</h3>
        <p>Enjoy exclusive discounts on select products. Hurry before the offer ends!</p>
        <Link to="/shop" className="btn btn-light btn-lg fw-bold mt-2 shadow-sm">
          Grab the Deals
        </Link>
      </section>
    </div>
  );
};

export default Home;
