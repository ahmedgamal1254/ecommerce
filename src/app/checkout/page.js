"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import env from "@/env";
import { CartContext } from "@/CartContext";
import Swal from "sweetalert2";
import { getToken } from "@/lib/helper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CheckoutSchema } from "@/validation/checkout";
import { saveCart } from "@/lib/cart";
import toast from "react-hot-toast";

const Checkout = () => {
  const router = useRouter();
  const { cart,setCart } = useContext(CartContext);
  const { register,handleSubmit,formState:{errors,isSubmitting,isValid} } = useForm({
    resolver:yupResolver(CheckoutSchema),
    mode:'onChange'
  })

  // Handle Checkout Submission
  const handleCheckout = async (data) => {
    console.log(data)
    if(cart.length <= 0){
      Swal.fire({
        text: 'قم باضافة منتجات قم عملية الشراء',
        icon: 'warning',
        timer: 1500,
        confirmButtonText: 'إغلاق'
      })

      return;
    }

    let checkout_url="checkout-guest"
    checkout_url=getToken("token_app") ? "checkout":"checkout-guest"

    try {
      const response = await axios.post(env.baseUrl + "/" + checkout_url, {
        ...data,
        cart,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${getToken("token_app")}`
        },
      });

      saveCart([])
      router.push("/");
      toast.success('تم استلام طلبك بنجاح')

    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleCheckout)}>
  <div className="flex flex-col lg:flex-row p-6 gap-6 bg-gray-50 min-h-screen">
    
    {/* Billing Details */}
    <div className="lg:w-2/3 bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">🧾 بيانات الفاتورة</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <input
            {...register("fname")}
            className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-indigo-300 focus:outline-none"
            placeholder="الاسم الأول"
          />
          {errors.fname && <p className="text-red-500 text-sm mt-1">{errors.fname.message}</p>}
        </div>

        {/* Last Name */}
        <div>
          <input
            {...register("lname")}
            className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-indigo-300 focus:outline-none"
            placeholder="اسم العائلة"
          />
          {errors.lname && <p className="text-red-500 text-sm mt-1">{errors.lname.message}</p>}
        </div>

        {/* Email */}
        <div>
          <input
            {...register("email")}
            className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-indigo-300 focus:outline-none"
            placeholder="البريد الإلكتروني"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <input
            {...register("phone")}
            className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-indigo-300 focus:outline-none"
            placeholder="رقم الهاتف"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        {/* Address */}
        <div>
          <input
            {...register("address")}
            className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-indigo-300 focus:outline-none"
            placeholder="العنوان"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
        </div>

        {/* Address 2 */}
        <div>
          <input
            {...register("address2")}
            className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-indigo-300 focus:outline-none"
            placeholder="العنوان 2 (اختياري)"
          />
        </div>

        {/* City */}
        <div>
          <input
            {...register("city")}
            className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-indigo-300 focus:outline-none"
            placeholder="المدينة"
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
        </div>

        {/* State */}
        <div>
          <input
            {...register("state")}
            className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-indigo-300 focus:outline-none"
            placeholder="المنطقة"
          />
          {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
        </div>

        {/* Country */}
        <div>
          <input
            {...register("country")}
            className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-indigo-300 focus:outline-none"
            placeholder="الدولة"
          />
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
        </div>

        {/* Zip Code */}
        <div>
          <input
            {...register("zip_code")}
            className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-indigo-300 focus:outline-none"
            placeholder="الرمز البريدي"
          />
          {errors.zip_code && <p className="text-red-500 text-sm mt-1">{errors.zip_code.message}</p>}
        </div>

        {/* Notes */}
        <div className="md:col-span-2">
          <textarea
            {...register("note")}
            className="p-3 border rounded-lg w-full min-h-[100px] resize-none focus:ring-2 focus:ring-indigo-300 focus:outline-none"
            placeholder="ملاحظات إضافية (اختياري)"
          />
          {errors.note && <p className="text-red-500 text-sm mt-1">{errors.note.message}</p>}
        </div>
      </div>

      {/* Payment Methods */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4 border-b pb-3">💳 طريقة الدفع</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
        

        {/* Cash on Delivery Option */}
        <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:border-indigo-400 transition">
          <input
            type="radio"
            value="cash_on_delivery"
            {...register("payment")}
            className="accent-indigo-600"
          />
          <span className="text-sm text-gray-700">💰 الدفع عند الاستلام</span>
        </label>
      </div>
      {errors.payment && <p className="text-red-500 text-sm mt-2">{errors.payment.message}</p>}
    </div>

    {/* Order Summary */}
    <div className="lg:w-1/3 bg-white p-8 rounded-xl shadow-md h-fit">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">📦 ملخص الطلب</h2>
      <ul className="divide-y divide-gray-200">
        {cart.map((item) => (
          <>
          <li key={item.id} className="flex justify-between items-center py-3">
            <div>
              <p className="text-sm font-medium text-gray-700">{item.product.title}</p>
              <p className="text-xs text-gray-500">{!item.attributes && item.quantity + "منتج"}</p>
            </div>
            <span className="text-sm font-bold text-indigo-700">
              {!item.attributes && (item.product.price * item.quantity).toFixed(2) + "$"}
            </span>
          </li>
          
          {item.attributes?.length > 0 && (
            <table className="table-auto w-full mt-4 border">
              <thead>
                <tr>
                  <th className="border px-4 py-2">الخصائص</th>
                  <th className="border px-4 py-2">الكمية</th>
                  <th className="border px-4 py-2">السعر</th>
                </tr>
              </thead>
              <tbody>
                {item.attributes?.map((itemVal) => (
                  <tr key={itemVal.id}>
                    <td className="border px-4 py-2">
                      {Object.entries(itemVal.attributes)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(", ")}
                    </td>
                    <td className="border px-4 py-2">
                      <div className="flex items-center gap-2">
                        <span className="w-8 text-center">{itemVal.quantity}</span>
                      </div>
                    </td>
                    <td className="border px-4 py-2">{itemVal.price * itemVal.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          </>

        ))}
      </ul>

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className={`w-full mt-6 bg-indigo-600 text-white py-3 px-4 rounded-lg text-sm font-semibold 
        hover:bg-indigo-700 transition duration-200 disabled:opacity-50`}
      >
        {isSubmitting ? "🚚 جاري تنفيذ الطلب..." : "✅ تنفيذ الطلب"}
      </button>
    </div>
  </div>
</form>

  );
};

export default Checkout;
