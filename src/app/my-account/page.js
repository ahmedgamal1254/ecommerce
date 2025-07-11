"use client";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../CartContext";
import { WishlistContext } from "../../WishlistContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import env from "@/env";
import { FaShoppingCart, FaHeart, FaInfoCircle, FaSignOutAlt, FaFirstOrderAlt } from "react-icons/fa";
import OrderCard from "@/components/order";
import { getToken, removeToken } from "@/lib/helper";

const MyAccount = () => {
  const router = useRouter();
  const { cart, loading: cartLoading } = useContext(CartContext);
  const { wishlist, loading: wishlistLoading } = useContext(WishlistContext);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [activeTab, setActiveTab] = useState("cart");
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoadingUser(true);
        const token = getToken("token_app");
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
      } catch (error) {
        console.error("Error fetching PROFILE:", error);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = getToken("token_app");
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

        setOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching my orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleLogout = () => {
    removeToken("token_app");
    router.push("/auth/register");
  };

  return (
    <div className="flex flex-col md:flex-row bg-blue-100">
      {/* Sidebar */}
      <div className="md:w-1/4 w-full bg-white text-white p-6 md:min-h-screen rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">حسابي</h2>
        <ul className="space-y-4">
          <li
            className={`p-3 flex items-center gap-2 bg-blue-700 cursor-pointer rounded-lg transition-all ${
              activeTab === "cart" ? "bg-blue-700" : "hover:bg-blue-600"
            }`}
            onClick={() => setActiveTab("cart")}
          >
            <FaShoppingCart /> سلة المشتريات
          </li>
          <li
            className={`p-3 flex items-center gap-2 bg-blue-700 cursor-pointer rounded-lg transition-all ${
              activeTab === "wishlist" ? "bg-blue-700" : "hover:bg-blue-600"
            }`}
            onClick={() => setActiveTab("wishlist")}
          >
            <FaHeart /> قائمة الأمنيات
          </li>
          <li
            className={`p-3 flex items-center bg-blue-700 gap-2 cursor-pointer rounded-lg transition-all ${
              activeTab === "orders" ? "bg-blue-700" : "hover:bg-blue-600"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            <FaFirstOrderAlt /> الطلبات
          </li>
          <li
            className={`p-3 flex items-center bg-blue-700 gap-2 cursor-pointer rounded-lg transition-all ${
              activeTab === "info" ? "bg-blue-700" : "hover:bg-blue-600"
            }`}
            onClick={() => setActiveTab("info")}
          >
            <FaInfoCircle /> معلوماتي
          </li>
          <li
            className="p-3 flex items-center gap-2 bg-red-700 cursor-pointer text-white hover:text-red-500 rounded-lg"
            onClick={handleLogout}
          >
            <FaSignOutAlt /> تسجيل الخروج
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="md:w-3/4 w-full p-6 bg-white rounded-lg shadow-md overflow-auto">
        {activeTab === "cart" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">🛒 سلة المشتريات</h2>
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
              <p className="text-gray-600">سلتك فارغة.</p>
            )}
          </div>
        )}

        {activeTab === "wishlist" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">💖 قائمة الأمنيات</h2>
            {wishlist?.length > 0 ? (
              <ul className="border p-4 rounded-lg">
                {wishlist.map((item) => (
                  <li key={item.id} className="flex justify-between p-2 border-b">
                    <span>{item.title}</span>
                    <span className="font-bold">${item.price}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">قائمة الأمنيات فارغة.</p>
            )}
          </div>
        )}

        {activeTab === "orders" && (
          <div className="mt-5">
            <h2 className="text-xl font-semibold mb-4">💖 الطلبات</h2>
            {orders.length > 0 ? (
              orders.map((item) => (
                <OrderCard style={{ marginBottom: "12px" }} key={item.id} order={item} />
              ))
            ) : (
              <p className="text-gray-600">لم تقم بالطلب بعد.</p>
            )}
          </div>
        )}

        {activeTab === "info" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">ℹ️ معلوماتي</h2>
            {loadingUser ? (
              <p>جاري التحميل...</p>
            ) : (
              user && (
                <div className="space-y-2">
                  <p><strong>الاسم:</strong> {user.name}</p>
                  <p><strong>البريد الإلكتروني:</strong> {user.email}</p>
                  <p><strong>تاريخ الانضمام:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
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
