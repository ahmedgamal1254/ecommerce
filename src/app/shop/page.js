"use client";
import React, { useState, useEffect, Suspense, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import ProductCard from "@/components/Product";
import env from "@/env";
import LoadingProduct from "@/components/loadingProduct";
import ProductSidebarFilter from "@/components/sidebar";
import { ProductsContext } from "@/ProductsContext";

const categories = ["All", "Electronics", "Clothing", "Home & Kitchen"]; // Example categories

export default function ShopPage() {
  const { products, setProducts, loadingProduct } = useContext(ProductsContext);
  const [searchTerm, setSearchTerm] = useState("");

  // Handle search functionality
  const handleSearch = async (term) => {
    try {
      const response = await fetch(
        `${env.baseUrl}/products/search?search=${encodeURIComponent(term)}`
      );
      const result = await response.json();
      // Ensure the response data is an array
      if (Array.isArray(result.data.data)) {
        setProducts(result.data.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      setProducts([]);
    }
  };

  // Handle search input change
  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    handleSearch(term);
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
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-[auto_1fr] gap-8">
          {/* Sidebar */}
          <div className="w-64">
            <ProductSidebarFilter />
          </div>

          {/* Products Area */}
          <div className="">
            {loadingProduct ? (
              // Show loading skeletons
              <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-2xl shadow-2xl overflow-hidden transition transform duration-300"
                  >
                    <LoadingProduct />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              // Show actual products
              Array.isArray(products) && (
                <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white rounded-2xl shadow-2xl overflow-hidden transition transform duration-300"
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}