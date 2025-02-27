"use client";
import Navbar from "@/components/Navbar";
import env from "@/env";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token_app");
    
    if (token) {
      router.push("/my-account")          
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(env.baseUrl+"/login", formData, {
        headers: { "Content-Type": "application/json", Accept: "application/json" },
      });

      console.log(res)

      if (typeof window !== "undefined") {
        localStorage.setItem("token_app", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }


      Swal.fire({
        title: "Success",
        text: "تم تسجيل الدخول بنجاح",
        icon: "success",
        timer: 1500,
        confirmButtonText: "إغلاق",
      });

      router.push("/");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setErrors({ submit: "Invalid email or password. Please try again." });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
