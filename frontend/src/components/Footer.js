const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white p-6 mt-10">
        <div className="grid grid-cols-3 gap-4">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul>
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/shop" className="hover:underline">Shop</a></li>
              <li><a href="/contact" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>
  
          {/* Policies */}
          <div>
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul>
              <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
              <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
            </ul>
          </div>
  
          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex gap-2">
              <a href="#" className="hover:text-blue-400">📘 Facebook</a>
              <a href="#" className="hover:text-blue-500">🐦 Twitter</a>
              <a href="#" className="hover:text-red-500">📸 Instagram</a>
            </div>
          </div>
        </div>
  
        <p className="text-center mt-4">© {new Date().getFullYear()} Computer Store. All rights reserved.</p>
      </footer>
    );
  };
  
  export default Footer;
  