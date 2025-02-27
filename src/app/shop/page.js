"use client";
import React, { useState,useEffect, Suspense } from "react";
import { FaSearch } from "react-icons/fa";
import { motion } from "motion/react"
import ProductCard from "@/components/Product";
import env from "@/env";
import LoadingProduct from "@/components/loadingProduct";

const categories = [];

export default function ShopPage() {

  const [products,setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loadingProduct,setLoadingProduct] = useState(false);

  useEffect(() => {
      const fetchProducts = async () => {
        try {
          setLoadingProduct(true)
          const response = await fetch(env.baseUrl+"/products?limit=32&page=1");
          const result = await response.json();
          setProducts(result.data["data"]);
          setLoadingProduct(false)
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };

      fetchProducts();
  }, []);

  const handlesearch = async (term) => {
    try {
      const response = await fetch(
        env.baseUrl+`/products/search?search=${encodeURIComponent(term)}`
      );
      const result = await response.json();
      // Adjust this if your API response structure is different
      setProducts(result.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    handlesearch(term);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        Shop Now
      </h1>

      <div className="max-w-10xl mx-auto">
        {/* Search Bar & Category Filter */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="relative w-full md:w-1/2 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
            />
            <FaSearch className="absolute top-3 left-4 text-gray-500" />
          </div>
          <div className="flex space-x-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-800 border border-gray-300 hover:bg-blue-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        
        <Suspense fallback={<LoadingProduct />}>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {loadingProduct ? (
                Array.from({ length: 8 }).map((_, index) => (<LoadingProduct />))
              ):(
                products.map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-2xl shadow-2xl overflow-hidden transition transform duration-300"
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))
              )}
            </motion.div>
        </Suspense>
      </div>
    </div>
  );
}
