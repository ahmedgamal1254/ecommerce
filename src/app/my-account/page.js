"use client";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../CartContext";
import { WishlistContext } from "../../WishlistContext";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { useRouter } from "next/navigation";
import env from "@/env";

const MyAccount = () => {
    const router=useRouter()
  const { cart, loading: cartLoading } = useContext(CartContext);
  const { wishlist, loading: wishlistLoading } = useContext(WishlistContext);
  const [ user,setUser ] = useState([]);
  const [ loading_user,setLoadingUser ] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoadingUser(true);

        if (typeof window !== "undefined") {
          const token = localStorage.getItem("token_app");
    
          if (!token) {
            router.push("/auth/login")          
          }
        }
  
        const response = await axios.get(env.baseUrl+"/profile", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        setUser(response.data.data);
        console.log(response.data.data)
        setLoadingUser(false)
      } catch (error) {
        console.error("Error fetching PROFILE:", error);
      } finally {
        setLoadingUser(false);
      }
    };
  
    fetchProfile();
  }, []); // يتم تنفيذ الطلب مرة واحدة فقط عند تحميل الصفحة
  
  
  const [activeTab, setActiveTab] = useState("cart"); // التحكم في التاب النشط

  const handleLogout = () => {
    localStorage.removeItem("token_app");
    router.push("/auth/register")
  };

  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-800 text-white p-6">
          <h2 className="text-2xl font-bold mb-6">My Account</h2>
          <ul className="space-y-4">
            <li 
              className={`p-3 cursor-pointer rounded-lg ${activeTab === "cart" ? "bg-gray-700" : ""}`} 
              onClick={() => setActiveTab("cart")}
            >
              🛒 My Cart
            </li>
            <li 
              className={`p-3 cursor-pointer rounded-lg ${activeTab === "wishlist" ? "bg-gray-700" : ""}`} 
              onClick={() => setActiveTab("wishlist")}
            >
              💖 My Wishlist
            </li>
            <li 
              className={`p-3 cursor-pointer rounded-lg ${activeTab === "info" ? "bg-gray-700" : ""}`} 
              onClick={() => setActiveTab("info")}
            >
              ℹ️ My Info
            </li>
            <li 
              className="p-3 cursor-pointer text-red-400 hover:text-red-500 rounded-lg"
              onClick={handleLogout}
            >
              🚪 Logout
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-8">
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
                <p>Your cart is empty.</p>
              )}
            </div>
          )}

          {activeTab === "wishlist" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">💖 My Wishlist</h2>
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
                <p>Your wishlist is empty.</p>
              )}
            </div>
          )}

          {activeTab === "info" &&(
            <div>
              <h2 className="text-xl font-semibold mb-4">ℹ️ My Info</h2>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Joined:</strong> {user.created_at}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyAccount;
