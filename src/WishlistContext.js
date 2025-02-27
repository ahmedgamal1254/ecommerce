"use client"
import axios from "axios";
import { createContext, useState, useEffect } from "react";
import env from "./env";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart data from API
  useEffect(() => {
    if (typeof window !== "undefined") {
      if(localStorage.getItem("token_app") != null){
        const fetchWishlist = async () => {
          try {
            const response = await axios.get(env.baseUrl +"/wishlist",{
              headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token_app")}`
              }
            }); 
            setWishlist(response.data.data);
          } catch (error) {
            console.error("Error fetching cart:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchWishlist();
       }
    }
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlist, setWishlist, loading }}>
      {children}
    </WishlistContext.Provider>
  );
};
