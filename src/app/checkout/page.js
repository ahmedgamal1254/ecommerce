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

    try {
      const response = await axios.post(env.baseUrl + "/checkout", {
        data,
        cart,
        
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${getToken("token_app")}`
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
    }
  };

  return (
    <form onSubmit={handleSubmit(handleCheckout)}>
    <div className="flex flex-col lg:flex-row p-6 gap-6 bg-gray-100 min-h-screen">
      {/* Billing Details */}
      <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">بيانات الفاتورة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input {...register("fname")} className="p-3 border rounded w-full" placeholder="الاسم الأول" />
            {errors.fname && <p className="text-red-500">{errors.fname.message}</p>}
          </div>

          <div>
            <input {...register("lname")} className="p-3 border rounded w-full" placeholder="اسم العائلة" />
            {errors.lname && <p className="text-red-500">{errors.lname.message}</p>}
          </div>

          <div>
            <input {...register("email")} className="p-3 border rounded w-full" placeholder="البريد الإلكتروني" />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <input {...register("phone")} className="p-3 border rounded w-full" placeholder="رقم الهاتف" />
            {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
          </div>

          <div>
            <input {...register("address")} className="p-3 border rounded w-full" placeholder="العنوان" />
            {errors.address && <p className="text-red-500">{errors.address.message}</p>}
          </div>

          <div>
            <input {...register("address2")} className="p-3 border rounded w-full" placeholder="العنوان 2 (اختياري)" />
          </div>

          <div>
            <input {...register("city")} className="p-3 border rounded w-full" placeholder="المدينة" />
            {errors.city && <p className="text-red-500">{errors.city.message}</p>}
          </div>

          <div>
            <input {...register("state")} className="p-3 border rounded w-full" placeholder="المنطقة" />
            {errors.state && <p className="text-red-500">{errors.state.message}</p>}
          </div>

          <div>
            <input {...register("country")} className="p-3 border rounded w-full" placeholder="الدولة" />
            {errors.country && <p className="text-red-500">{errors.country.message}</p>}
          </div>

          <div>
            <input {...register("zip_code")} className="p-3 border rounded w-full" placeholder="الرمز البريدي" />
            {errors.zip_code && <p className="text-red-500">{errors.zip_code.message}</p>}
          </div>

          <div className="md:col-span-2">
            <textarea {...register("note")} className="p-3 border rounded w-full" placeholder="ملاحظات (اختياري)" />
            {errors.note && <p className="text-red-500">{errors.note.message}</p>}
          </div>
        </div>

        {/* Payment Methods */}
        <h2 className="text-2xl font-semibold mt-6 mb-4">طريقة الدفع</h2>
        <div className="flex flex-col gap-2">
          <label>
            <input type="radio" value="credit_card" {...register("payment")} defaultChecked /> بطاقة ائتمان
          </label>
          <label>
            <input type="radio" value="paypal" {...register("payment")} /> PayPal
          </label>
          <label>
            <input type="radio" value="cash_on_delivery" {...register("payment")} /> 💰 الدفع عند الاستلام
          </label>
          {errors.payment && <p className="text-red-500">{errors.payment.message}</p>}
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">ملخص الطلب</h2>
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between p-2 border-b">
              <span>{item.product.title} (x{item.quantity})</span>
              <span className="font-bold">${item.product.price * item.quantity}</span>
            </li>
          ))}
        </ul>
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`w-full mt-6 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700
             transition disabled:opacity-50
             ${isSubmitting?"opacity-50":"opacity-100"}
             `}
        >
          {isSubmitting ? "جاري المعالجة..." : "تنفيذ الطلب"}
        </button>
      </div>
    </div>
  </form>
  );
};

export default Checkout;
