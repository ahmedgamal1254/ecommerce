import Link from "next/link";
import { FaShoppingBasket } from "react-icons/fa";

const FeaturesAndAbout = () => {
    return (
      <div className="container mx-auto px-6 lg:px-20 my-10">
        
        {/* 🛍 Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-gray-100 p-6 rounded-lg shadow">
          <FeatureItem
            icon="🚚"
            title="Free Delivery"
            description="Orders from all items"
          />
          <FeatureItem
            icon="💲"
            title="Return & Refund"
            description="Money back guarantee"
          />
          <FeatureItem
            icon="🎟️"
            title="Member Discount"
            description="On every order over 5000.00 EGP"
          />
          <FeatureItem
            icon="🎧"
            title="Support 24/7"
            description="Contact us 24 hours a day"
          />
        </div>
  
        {/* ℹ️ About Us Section */}
        <div className="mt-12 bg-gray-100 p-6 rounded-lg shadow flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 p-4">
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p className="text-gray-600">
              We are a leading online store providing high-quality products at affordable prices. Our mission is to ensure customer satisfaction by offering seamless shopping experiences.
            </p>
            <p className="text-gray-600 mt-2">
              Our services include fast delivery, easy returns, and 24/7 customer support. Join us today and enjoy an exceptional shopping journey!
            </p>
            <Link href="/shop" className="button-group text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              <FaShoppingBasket className="w-5 h-5" />
              <span>shop now</span>
            </Link>
          </div>
          <div className="md:w-1/2">
            <img
              src="./about.webp"
              alt="About Us"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
  
      </div>
    );
  };
  
  // 🏷 Reusable Feature Item Component
  const FeatureItem = ({ icon, title, description }) => {
    return (
      <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
        <span className="text-red-500 text-3xl">{icon}</span>
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-gray-500 text-sm">{description}</p>
        </div>
      </div>
    );
  };
  
  export default FeaturesAndAbout;
  