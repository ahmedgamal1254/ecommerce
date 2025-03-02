"use client";
import Navbar from "@/components/Navbar";
import env from "@/env";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token_app");

    if (token) {
      router.push("/my-account")          
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axios.post(env.baseUrl+"/register", formData, {
        headers: { "Content-Type": "application/json", Accept: "application/json" },
      });

      if (typeof window !== "undefined") {
        localStorage.setItem("token_app", res.data.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
      }

      // Reset form
      setFormData({ name: "", email: "", password: "" });
      setErrors({});

      Swal.fire({
        title: "Success",
        text: "تم التسجيل بنجاح",
        icon: "success",
        timer: 1500,
        confirmButtonText: "إغلاق",
      });

      router.push("/");
    } catch (error) {
      if(error.status == 422){
        let errors_data=error.response.data
        const newErrors = { ...errors };
        Object.keys(errors_data).forEach((key) => {
          newErrors[key] = errors_data[key][0];
        });
        setErrors(newErrors);
      }
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
          <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
              />
              {errors.name && <span className="text-sm text-red-500">{errors.name}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
              />
              {errors.email && <span className="text-sm text-red-500">{errors.email}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
              />
              {errors.password && <span className="text-sm text-red-500">{errors.password}</span>}
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Register
            </button>
          </form>

          <div className="mt-4 text-center">
            <p>Already have an account?</p>
            <button
              onClick={() => router.push("/auth/login")}
              className="text-indigo-600 hover:underline"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
