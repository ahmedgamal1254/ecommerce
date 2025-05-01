"use client";
import env from "@/env";
import { getToken, setToken } from "@/lib/helper";
import { LoginSchema } from "@/validation/loginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function Login() {
  const router = useRouter();

  const {register,reset,handleSubmit,formState:{errors,isValid}} = useForm({
    resolver:yupResolver(LoginSchema),
    mode:"onChange"
  });
  
  const [errorsServer, setErrorsServer] = useState({});
  const [loading,setLoading] = useState(false)

    
    if (getToken("token_app")) {
      router.push("/my-account")          
    }


  const Submit = async (data) => {
    try {
      setLoading(true)
      const res = await axios.post(env.baseUrl+"/login", data, {
        headers: { "Content-Type": "application/json", Accept: "application/json" },
      });

      setToken("token_app", res.data.token)
      setToken("user", JSON.stringify(res.data.user))

      setLoading(false)

      Swal.fire({
        title: "Success",
        text: "تم تسجيل الدخول بنجاح",
        icon: "success",
        timer: 1500,
        confirmButtonText: "إغلاق",
      });

      router.push("/");
    } catch (error) {
      setLoading(false)
      if(error.status == 422){
        setErrorsServer({})
        let errors_data=error.response.data
        const newErrors = { ...errors };

        Object.keys(errors_data).forEach((key) => {
          newErrors[key] = errors_data[key][0];
        });

        setErrorsServer(newErrors);
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          <form onSubmit={handleSubmit(Submit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register("email")}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.email && <span className="text-sm text-red-500">{errors.email.email}</span>}
              {errorsServer.email && <span className="text-sm text-red-500">{errorsServer.email}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                {...register("password")}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
              {errorsServer.password && <span className="text-sm text-red-500">{errorsServer.password}</span>}
            </div>
            <button
              type="submit"
              disabled={!isValid}
              className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700
                ${
                  isValid 
                  ? "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    : "bg-blue-600 opacity-50 cursor-not-allowed"
                }
                `}
            >
              Login
              {loading ? (<svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
  </svg>):('')}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
