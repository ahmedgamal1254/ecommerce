"use client";
import env from "@/env";
import ProductCard from "./Product";
import React, { Suspense, useEffect, useState } from "react";
import LoadingProduct from "./loadingProduct";
import Link from "next/link";

export default function Products({title}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(env.baseUrl + "/products?limit=8&page=1");
        const result = await response.json();
        setProducts(result.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 mt-24" dir="rtl">
      {/* Title + Button */}
      <div className="w-full flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          {title}
        </h2>
        <Link href={"/shop"} className="bg-blue-600 text-white text-sm md:text-base font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          عرض جميع المنتجات
        </Link>
      </div>

      {/* Products Grid */}
      <Suspense fallback={<LoadingProduct />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products && products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            Array.from({ length: 4 }).map((_, index) => (
              <LoadingProduct key={index} />
            ))
          )}
        </div>
      </Suspense>
    </div>
  );
}
