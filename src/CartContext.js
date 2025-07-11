"use client"
import axios from "axios";
import { createContext, useState, useEffect } from "react";
import env from "./env";
import { getToken } from "./lib/helper";
import { getCart } from "./lib/cart";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart data from API
  useEffect(() => {
    if (typeof window !== "undefined") {
      if(getToken("token_app") != null){
        const fetchCart = async () => {
          try {
            const response = await axios.get(env.baseUrl+"/cart",{
              headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${getToken("token_app")}`
              }
            }); 
    
            setCart(response.data.data);
          } catch (error) {
            console.error("Error fetching cart:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchCart();
      }else{
          console.log(getCart())      
          setCart(getCart())
      }
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, loading }}>
      {children}
    </CartContext.Provider>
  );
};
