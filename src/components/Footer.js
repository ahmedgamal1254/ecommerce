import Link from "next/link";

const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-10 mt-10">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* 🏪 About Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">About Us</h2>
              <p className="text-gray-400">
                We are an online store providing the best products with high quality and fast delivery.
              </p>
            </div>
  
            {/* 🔗 Quick Links */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
              <ul className="text-gray-400 space-y-2">
                <li><Link href="/shop" className="hover:text-gray-200">Shop</Link></li>
                <li><Link href="/about" className="hover:text-gray-200">About</Link></li>
                <li><Link href="/contact-us" className="hover:text-gray-200">Contact</Link></li>
                <li><Link href="/auth/register" className="hover:text-gray-200">Register</Link></li>
                <li><Link href="/auth/login" className="hover:text-gray-200">Login</Link></li>
                <li><Link href="/my-account" className="hover:text-gray-200">My-Account</Link></li>
              </ul>
            </div>
  
            {/* 📞 Contact Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
              <p className="text-gray-400">Email: info@ahmedgamaldev.com</p>
              <p className="text-gray-400">Phone: +20 01091536978</p>
              
              {/* Social Media Icons */}
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-facebook text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
              </div>
            </div>
          </div>
  
          {/* Copyright Section */}
          <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
            © {new Date().getFullYear()} YourStore. All rights reserved.
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  