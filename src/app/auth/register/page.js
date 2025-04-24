"use client";
import env from "@/env";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "@/validation/registerSchema";

export default function Register() {
  const router = useRouter();

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token_app");

    if (token) {
      router.push("/my-account")          
    }
  }

  const { reset,register,handleSubmit,formState: {errors,isValid} } = useForm({
    resolver:yupResolver(RegisterSchema),
    mode:"onChange"
  })
  const [isSubmitting,SetIsSubmitting]=useState(false)
  const [errorsServer, setErrorsServer] = useState({});

  const submit=async (formData) => {
    try {
      SetIsSubmitting(true)
      const res = await axios.post(env.baseUrl+"/register", formData, {
        headers: { "Content-Type": "application/json", Accept: "application/json" },
      });

      if (typeof window !== "undefined") {
        localStorage.setItem("token_app", res.data.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
      }


      Swal.fire({
        title: "Success",
        text: "تم التسجيل بنجاح",
        icon: "success",
        timer: 1500,
        confirmButtonText: "إغلاق",
      });

      SetIsSubmitting(false)

      router.push("/");
    } catch (error) {
      if(error.status == 422){
        let errors_data=error.response.data
        const newErrors = { ...errors };
        Object.keys(errors_data).forEach((key) => {
          newErrors[key] = errors_data[key][0];
        });
        setErrorsServer(newErrors);
        SetIsSubmitting(false)
      }
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
          <form onSubmit={handleSubmit(submit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                {...register("name")}
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
              />
              {errors.name && <span className="text-sm text-red-500">{errors.name.message}</span>}
              {errorsServer.name && <span className="text-sm text-red-500">{errorsServer.name}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register("email")}
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
              />
              {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
              {errorsServer.email && <span className="text-sm text-red-500">{errorsServer.email}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                {...register("password")}
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
              />
              {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
              {errorsServer.password && <span className="text-sm text-red-500">{errorsServer.password}</span>}
            </div>
            <button
              type="submit"
              disabled={!isValid}

              className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
              ${
                  isValid
                    ? "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    : "bg-blue-600 opacity-50 cursor-not-allowed"
                }
              `}
            >
              {
                isSubmitting ? ("loading register"):("Register")
              }
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
