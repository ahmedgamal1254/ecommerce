"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import env from "@/env";
import { CartContext } from "@/CartContext";
import Swal from "sweetalert2";

const Checkout = () => {
  const router = useRouter();
  const { cart,setCart } = useContext(CartContext);
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

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!formData.fname.trim()) newErrors.fname = "First name is required";
    if (!formData.lname.trim()) newErrors.lname = "Last name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if(e.target.value.trim()){
      newErrors[e.target.name]=`please this feild is required`
    }
  };

  // Handle Checkout Submission
  const handleCheckout = async () => {

    if(cart.length <= 0){
      Swal.fire({
        text: 'قم باضافة منتجات قم عملية الشراء',
        icon: 'warning',
        timer: 1500,
        confirmButtonText: 'إغلاق'
      })

      return;
    }

    if (!validateForm()) {
      return;
    }

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

      setCart([]);

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
          <div className="flex flex-col">
            <input className="p-3 border rounded" name="fname" required placeholder="First Name" onChange={handleChange} />
            {errors.fname && <span style={{ color: "red" }}>{errors.fname}</span>}
          </div>
          <div className="flex flex-col">
              <input className="p-3 border rounded" name="lname" required placeholder="Last Name" onChange={handleChange} />
              {errors.lname && <span style={{ color: "red" }}>{errors.lname}</span>}
          </div>
          <div className="flex flex-col">
            <input className="p-3 border rounded" name="email" placeholder="Email" onChange={handleChange} />
            {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
          </div>
          <div className="flex flex-col">
            <input className="p-3 border rounded" name="phone" required placeholder="Phone" onChange={handleChange} />
            {errors.phone && <span style={{ color: "red" }}>{errors.phone}</span>}
          </div>
          <div className="flex flex-col">
            <input className="p-3 border rounded" name="address" required placeholder="Address" onChange={handleChange} />
            {errors.address && <span style={{ color: "red" }}>{errors.address}</span>}
          </div>
          <input className="p-3 border rounded" name="address2" placeholder="Address 2 (Optional)" onChange={handleChange} />
          <div className="flex flex-col">
            <input className="p-3 border rounded" name="city" required placeholder="City" onChange={handleChange} />
            {errors.city && <span style={{ color: "red" }}>{errors.city}</span>}
          </div>
          <div className="flex flex-col">
            <input className="p-3 border rounded" name="state" required placeholder="State" onChange={handleChange} />
            {errors.state && <span style={{ color: "red" }}>{errors.state}</span>}
          </div>
          <input className="p-3 border rounded" name="country" placeholder="Country" onChange={handleChange} />
          <input className="p-3 border rounded" name="zip_code" required placeholder="ZIP Code" onChange={handleChange} />
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
