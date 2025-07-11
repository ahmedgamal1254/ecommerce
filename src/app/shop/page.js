"use client";
import React, { useState, useContext, useEffect } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import ProductCard from "@/components/Product";
import env from "@/env";
import LoadingProduct from "@/components/loadingProduct";
import ProductSidebarFilter from "@/components/sidebar";
import { ProductsContext } from "@/ProductsContext";
import { Drawer, Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { Toast } from "@/lib/toast";

export default function ShopPage() {
  const { products, setProducts, loadingProduct } = useContext(ProductsContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [open, setOpen] = useState(false);

  const showDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const handleSearch = async (term) => {
    try {
      const response = await fetch(`${env.baseUrl}/products/search?search=${encodeURIComponent(term)}`);
      const result = await response.json();
      if (Array.isArray(result.data.data)) {
        setProducts(result.data.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      setProducts([]);
    }
  };

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    handleSearch(term);
  };

  const fetchData= async (currentPage) => {
    try {
        setLoadingMore(true);
        const response = await fetch(env.baseUrl + "/products?page=" + currentPage);
        const result = await response.json();
        if(result.data.data.length <= 0){
          Toast.fire({
            icon:"warning",
            title:"لا توجد نتائج أخرى",
            timer:2000
          })
        }

        setProducts((prevPosts) => [...prevPosts, ...result.data.data]);
        setLoadingMore(false);
      } catch (error) {
        console.error("Error loading more:", error);
        setLoadingMore(false);
      }
  }

  useEffect(() => {
    fetchData(page)
  },[page])

  const loadmore = async () => {
    setPage(page => page+1)
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-12 px-6 md:px-10">
  <div className="flex justify-between items-center mb-12">
      <h1 className="text-4xl font-extrabold text-gray-800">جميع المنتجات</h1>

      <Button
        type="primary"
        icon={<FilterOutlined />}
        onClick={showDrawer}
        className="bg-blue-600 text-lg p-4 md:hidden"
      >
        تصفية
      </Button>

      <Drawer
        title="فلترة المنتجات"
        placement="right"
        onClose={closeDrawer}
        open={open}
        width={300}
      >
        <ProductSidebarFilter />
      </Drawer>
    </div>

      {/* Search & Filter */}
      <div className="max-w-7xl mx-auto mb-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="hidden md:block md:col-span-3">
          <ProductSidebarFilter />
        </div>

        {/* Content */}
        <div className="md:col-span-9 space-y-6">
          {/* Search Bar */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="ابحث عن المنتجات..."
              value={searchTerm}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow"
            />
            <FaSearch className="absolute top-3.5 left-4 text-gray-500" />
          </div>

          {/* Product Grid */}
          {loadingProduct ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <LoadingProduct />
                </div>
              ))}
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-2xl overflow-hidden transition-transform"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Load More Button */}
          {!loadingProduct && products.length >= 6 && (
            <div className="flex justify-center mt-10">
              <button
                type="button"
                onClick={loadmore}
                className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 font-semibold px-6 py-3 rounded-lg shadow transition duration-300"
              >
                {loadingMore && (
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591..."
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393..."
                      fill="currentColor"
                    />
                  </svg>
                )}
                تحميل المزيد
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
