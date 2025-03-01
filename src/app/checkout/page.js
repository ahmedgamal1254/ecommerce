"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import env from "@/env";
import { CartContext } from "@/CartContext";
import Swal from "sweetalert2";

const Checkout = () => {
  const router = useRouter();
  const { cart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    zip_code: "",
    note: "",
    payment: "credit_card",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Checkout Submission
  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await axios.post(env.baseUrl + "/checkout", {
        ...formData,
        cart,
        
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token_app")}`
        },
      });
      console.log("Order placed:", response.data);
      router.push("/");
      Swal.fire({
        title: 'Success',
        text: 'تم استلام طلبك بنجاح',
        icon: 'success',
        timer: 1500,
        confirmButtonText: 'إغلاق'
      })
      
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row p-6 gap-6 bg-gray-100 min-h-screen">
      {/* Billing Details */}
      <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Billing Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="p-3 border rounded" name="fname" placeholder="First Name" onChange={handleChange} />
          <input className="p-3 border rounded" name="lname" placeholder="Last Name" onChange={handleChange} />
          <input className="p-3 border rounded" name="email" placeholder="Email" onChange={handleChange} />
          <input className="p-3 border rounded" name="phone" placeholder="Phone" onChange={handleChange} />
          <input className="p-3 border rounded" name="address" placeholder="Address" onChange={handleChange} />
          <input className="p-3 border rounded" name="address2" placeholder="Address 2 (Optional)" onChange={handleChange} />
          <input className="p-3 border rounded" name="city" placeholder="City" onChange={handleChange} />
          <input className="p-3 border rounded" name="state" placeholder="State" onChange={handleChange} />
          <input className="p-3 border rounded" name="country" placeholder="Country" onChange={handleChange} />
          <input className="p-3 border rounded" name="zip_code" placeholder="ZIP Code" onChange={handleChange} />
          <textarea className="p-3 border rounded" name="note" placeholder="Order Notes (Optional)" onChange={handleChange}></textarea>
        </div>

        {/* Payment Methods */}
        <h2 className="text-2xl font-semibold mt-6 mb-4">Payment Details</h2>
        <fieldset>
          <legend className="sr-only">Payment Methods</legend>

          <div className="flex items-center mb-4">
            <input id="credit-card" type="radio" name="payment" value="credit_card" onChange={handleChange} checked={formData.payment === "credit_card"} />
            <label htmlFor="credit-card" className="ms-2">Credit Card</label>
          </div>

          <div className="flex items-center mb-4">
            <input id="paypal" type="radio" name="payment" value="paypal" onChange={handleChange} checked={formData.payment === "paypal"} />
            <label htmlFor="paypal" className="ms-2">PayPal</label>
          </div>

          <div className="flex items-center mb-4">
            <input id="cash-on-delivery" type="radio" name="payment" value="cash_on_delivery" onChange={handleChange} checked={formData.payment === "cash_on_delivery"} />
            <label htmlFor="cash-on-delivery" className="ms-2">💰 Cash on Delivery</label>
          </div>
        </fieldset>
      </div>

      {/* Order Summary */}
      <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between p-2 border-b">
              <span>{item.product.title} (x{item.quantity})</span>
              <span className="font-bold">${item.product.price * item.quantity}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={handleCheckout}
          className="mt-6 w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          disabled={loading}
        >
          {loading ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
