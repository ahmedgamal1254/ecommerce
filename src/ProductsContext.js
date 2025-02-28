"use client";
import axios from "axios";
import { createContext, useState, useEffect } from "react";
import env from "./env";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(false);

  // Fetch product data from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProduct(true);
        const response = await axios.get(`${env.baseUrl}/products?limit=32&page=1`);
        setProducts(response.data.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoadingProduct(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, setProducts, loadingProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};