"use client";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../CartContext";
import { WishlistContext } from "../../WishlistContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import env from "@/env";
import { FaShoppingCart, FaHeart, FaInfoCircle, FaSignOutAlt, FaFirstOrderAlt } from "react-icons/fa";
import OrderCard from "@/components/order";

const MyAccount = () => {
  const router = useRouter();
  const { cart, loading: cartLoading } = useContext(CartContext);
  const { wishlist, loading: wishlistLoading } = useContext(WishlistContext);
  const [orders,setOrders]=useState([]);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [activeTab, setActiveTab] = useState("cart");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoadingUser(true);
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("token_app");
          if (!token) {
            router.push("/auth/login");
          }
          const response = await axios.get(env.baseUrl + "/profile", {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching PROFILE:", error);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoadingUser(true);
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("token_app");
          
          if (!token) {
            router.push("/auth/login");
          }

          const response = await axios.get(env.baseUrl + "/my-orders", {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          setOrders(response.data.data)
          console.log(response.data.data)
        }
      } catch (error) {
        console.error("Error fetching my orders:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token_app");
    router.push("/auth/register");
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar */}
      <div className="md:w-1/4 w-full bg-gray-800 text-white p-6 md:min-h-screen">
        <h2 className="text-2xl font-bold mb-6 text-center">My Account</h2>
        <ul className="space-y-4">
          <li
            className={`p-3 flex items-center gap-2 mb-8 cursor-pointer rounded-lg transition-all ${
              activeTab === "cart" ? "bg-gray-700" : "hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("cart")}
          >
            <FaShoppingCart /> My Cart
          </li>
          <li
            className={`p-3 flex items-center gap-2 cursor-pointer rounded-lg transition-all ${
              activeTab === "wishlist" ? "bg-gray-700" : "hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("wishlist")}
          >
            <FaHeart /> My Wishlist
          </li>
          <li
            className={`p-3 flex items-center gap-2 cursor-pointer rounded-lg transition-all ${
              activeTab === "orders" ? "bg-gray-700" : "hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            <FaFirstOrderAlt /> My Orders
          </li>
          <li
            className={`p-3 flex items-center gap-2 cursor-pointer rounded-lg transition-all ${
              activeTab === "info" ? "bg-gray-700" : "hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("info")}
          >
            <FaInfoCircle /> My Info
          </li>
          <li
            className="p-3 flex items-center gap-2 cursor-pointer text-red-400 hover:text-red-500 rounded-lg"
            onClick={handleLogout}
          >
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="md:w-3/4 w-full p-6 bg-white rounded-lg shadow-md overflow-auto">
        {activeTab === "cart" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">🛒 My Cart</h2>
            {cart.length > 0 ? (
              <ul className="border p-4 rounded-lg">
                {cart.map((item) => (
                  <li key={item.id} className="flex justify-between p-2 border-b">
                    <span>{item.product.title} - {item.quantity}</span>
                    <span className="font-bold">${item.product.price}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">Your cart is empty.</p>
            )}
          </div>
        )}

        {activeTab === "wishlist" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">💖 My wishlist</h2>
            {wishlist.length > 0 ? (
              <ul className="border p-4 rounded-lg">
                {wishlist.map((item) => (
                  <li key={item.id} className="flex justify-between p-2 border-b">
                    <span>{item.title}</span>
                    <span className="font-bold">${item.price}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">Your wishlist is empty.</p>
            )}
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">💖 My orders</h2>
            {orders.length > 0 ? (
              orders.map((item) => (
                <OrderCard style={{marginBottom:"12px"}} key={item.id} order={item} />
              ))
            ) : (
              <p className="text-gray-600">You haven't ordered yet.</p>
            )}
          </div>
        )}

        {activeTab === "info" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">ℹ️ My Info</h2>
            {loadingUser ? (
              <p>Loading...</p>
            ) : (
              user && (
                <div className="space-y-2">
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Joined:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
