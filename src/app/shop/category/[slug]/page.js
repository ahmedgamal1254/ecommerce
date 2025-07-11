"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/Product";
import env from "@/env";
import LoadingProduct from "@/components/loadingProduct";
import { useParams } from "next/navigation";
import { Toast } from "@/lib/toast";


export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(false);
const [loadedPages, setLoadedPages] = useState([]);

  const params = useParams();

  const fetchProducts = async () => {
    try {
      if (loadedPages.includes(page)) return;

      setLoading(true);
      const response = await fetch(
        `${env.baseUrl}/product/parent-category/${params.slug}?page=${page}`
      );
      const result = await response.json();

      if (result.data?.length === 0) {
        Toast.fire({
          icon: "warning",
          title: "لا توجد نتائج أخرى",
          timer: 2000,
        });
        return;
      }

        setProducts((prev) => {
          const ids = new Set(prev.map((item) => item.id));
          const newItems = result.data.filter((item) => !ids.has(item.id));
          return [...prev, ...newItems];
        });
        setLoadedPages((prev) => [...prev, page]);

    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  fetchProducts();
}, [page,params?.slug]);

  const loadMore = async () => {
    setPage(page => page+1)
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        تسوق الأن
      </h1>

      <div className="max-w-10xl mx-auto">

        <div className="flex flex-col sm:flex-row gap-8">
          {
            loading ? (        
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-2xl shadow-2xl overflow-hidden"
                  >
                    <LoadingProduct />
                  </motion.div>
                ))}
              </motion.div>):(
              (
              Array.isArray(products) && (
                <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {products.map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white rounded-2xl shadow-2xl overflow-hidden"
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              )
            )
            )
          }
        </div>

        
          {!loading && products.length >= 6 && (
            <div className="flex justify-center mt-10">
              <button
                type="button"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                onClick={loadMore}
                disabled={loadingMore}
              >
                {loadingMore ? (
                  <span className="flex items-center">
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 mr-2 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    عرض المزيد...
                  </span>
                ) : (
                  "عرض المزيد"
                )}
              </button>
            </div>
          )}
      </div>
    </div>
  );
}
