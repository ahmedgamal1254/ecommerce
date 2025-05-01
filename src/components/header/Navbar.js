"use client";
import { useState, useContext } from "react";
import Link from "next/link";
import { FaShoppingCart, FaHeart, FaTimes, FaBars, FaShoppingBasket, FaShoppingBag } from "react-icons/fa";
import { faShoppingBag } from '@fortawesome/free-regular-svg-icons';
import { CartContext } from "@/CartContext";
import { WishlistContext } from "@/WishlistContext";
import Image from "next/image";
import MyAccount from "../dropdown/myaccount";
import Register from "../dropdown/register";
import { getToken } from "@/lib/helper";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarType, setSidebarType] = useState("cart"); // "cart" or "wishlist"
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openSidebar = (type) => {
    setSidebarType(type);
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      <nav className="bg-white pt-5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <span className="text-xl font-bold text-gray-800 cursor-pointer">
                  <Image src={"/logo.png"} width={200} height={200} />
                </span>
              </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-1">
              <Link href="/">
                <span className="text-gray-800 hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition-colors duration-300 cursor-pointer">Home</span>
              </Link>
              <Link href="/shop">
                <span className="text-gray-800 hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition-colors duration-300 cursor-pointer">Shop</span>
              </Link>
              <Link href="/cart">
                <span className="text-gray-800 hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition-colors duration-300 cursor-pointer">Cart</span>
              </Link>
              <Link href="/about">
                <span className="text-gray-800 hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition-colors duration-300 cursor-pointer">About</span>
              </Link>
              <Link href="/contact-us">
                <span className="text-gray-800 hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition-colors duration-300 cursor-pointer">Contact Us</span>
              </Link>
              {getToken("token_app") !== null ? (
                <Link href="/my-account">
                  <span className="text-gray-800 hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition-colors duration-300 cursor-pointer">My Account</span>
                </Link>
              ) : (
                <Link href="/auth/register">
                  <span className="text-gray-800 hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition-colors duration-300 cursor-pointer">Register</span>
                </Link>
              )}
            </div>

            
            {/* Icons & Menu Button (Visible on Both Desktop & Mobile) */}
            <div className="flex items-center space-x-4">
              <div className="hidden lg:block">
                {
                  getToken("token_app") ? (<MyAccount />):(<Register />)
                }
              </div>

              {/* Wishlist Button */}
              <button onClick={() => openSidebar("wishlist")} className="relative text-gray-800 hover:text-gray-600 focus:outline-none">
                <FaHeart className="w-6 h-6 text-blue-500" />
                {(
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button onClick={() => openSidebar("cart")} className="relative text-gray-800 hover:text-gray-600 focus:outline-none">
                <FaShoppingBag className="w-6 h-6 text-blue-500" />
                {
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                    {cart.length}
                  </span>
                }
              </button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-gray-800 hover:text-gray-600 focus:outline-none "
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <FaBars className="w-6 h-6" />
              </button>
            </div>
          </div>

          

          {/* Mobile Menu */}
          <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
            <div className="flex flex-col space-y-4 pb-4">

              <Link href="/">
                <span className="block text-gray-800 hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition-colors duration-300 cursor-pointer">Home</span>
              </Link>
              <Link href="/shop">
                <span className="block text-gray-800 hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition-colors duration-300 cursor-pointer">Shop</span>
              </Link>
              <Link href="/cart">
                <span className="block text-gray-800 hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition-colors duration-300 cursor-pointer">Cart</span>
              </Link>
              <Link href="/about">
                <span className="block text-gray-800 hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition-colors duration-300 cursor-pointer">About</span>
              </Link>
              <Link href="/contact-us">
                <span className="block text-gray-800 hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition-colors duration-300 cursor-pointer">Contact Us</span>
              </Link>
              { getToken("token_app") !== null ? (
                <Link href="/my-account">
                  <span className="block text-gray-800 hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition-colors duration-300 cursor-pointer">My Account</span>
                </Link>
              ) : (
                <Link href="/auth/register">
                  <span className="block text-gray-800 hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition-colors duration-300 cursor-pointer">Register</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">{sidebarType === "cart" ? "Shopping Cart" : "Wishlist"}</h2>
          <button onClick={closeSidebar} className="text-gray-600 hover:text-gray-800">
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="p-4 space-y-2 flex-1 overflow-y-auto">
          {sidebarType === "cart" && cart.length === 0 && <p className="text-gray-600">Your cart is empty.</p>}
          {sidebarType === "cart" &&
            cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-2 border-b">
                <span>{item.product.title}</span>
                <span className="text-gray-600">x{item.quantity}</span>
              </div>
            ))}

          {sidebarType === "wishlist" && wishlist.length === 0 && <p className="text-gray-600">Your wishlist is empty.</p>}
          {sidebarType === "wishlist" &&
            wishlist.map((item) => (
              <div key={item.id} className="p-2 border-b">{item.title}</div>
            ))}
        </div>
      </div>

      {/* Sidebar Background Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeSidebar}></div>
      )}
    </>
  );
};

export default Navbar;
