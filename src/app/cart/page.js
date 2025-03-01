"use client"
import React,{useState,useEffect,useContext}  from "react"
import Link from "next/link";
import { FaShoppingCart, FaHeart, FaTimes, FaTrashAlt, FaMinus, FaPlus } from "react-icons/fa";
import { CartContext } from "@/CartContext";
import { WishlistContext } from '@/WishlistContext';
import axios from "axios";
import Swal from "sweetalert2";
import env from "../../env";

export default function Home(){
    const { cart,setCart } = useContext(CartContext);
    const { wishlist, setWishlist } = useContext(WishlistContext);
    const [ sumcart,setSumCart ] =useState(0)

    // sum of cart items price
    function sumItems(){
        let total = 0;
        cart.forEach((item) => {
          total += item.quantity * item.product.price;
        });
        setSumCart(total);
    }

    const fetchCart = async () => {
        try {
            const response = await axios.get(env.baseUrl + "/cart", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token_app")}`
            }
            });
            setCart(response.data.data);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    const fetchWishlist = async () => {
        try {
          const response = await axios.get(env.baseUrl+"/wishlist", {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token_app")}`
            }
          });
          setWishlist(response.data.data);
        } catch (error) {
          console.error("Error fetching wishlist:", error);
        }
      };

    const removeitem = async (product_id) => {
        console.log("Clicked remove for product:", product_id);
        try {
          await axios.get(env.baseUrl+`/cart/destroy/${product_id}`, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token_app")}`
            },
          });
          fetchCart();
          Swal.fire({
            title: 'Success',
            text: 'تم حذف المنتج بنجاح',
            icon: 'success',
            timer: 1500,
            confirmButtonText: 'إغلاق'
          });
        } catch (error) {
          console.error("Error removing item:", error);
        }
    };

    const handleaddtowishlist = async (product_id) => {
        await axios.post(env.baseUrl+"/wishlist/store", {
          "product_id": product_id,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token_app")}`
          },
        });
    
        fetchWishlist();
        Swal.fire({
          title: 'Success',
          text: 'تم اضافة المنتج للمفضلة بنجاح',
          icon: 'success',
          timer: 1500,
          confirmButtonText: 'إغلاق'
        });
    };

    const incrementItem = async (product_id) => {
        try {
          await axios.get(env.baseUrl+`/cart/increment/${product_id}`, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token_app")}`
            },
          });
          fetchCart();
          Swal.fire({
            title: 'Success',
            text: 'تم تحديث المنتج بنجاح',
            icon: 'success',
            timer: 1500,
            confirmButtonText: 'إغلاق'
          });
        } catch (error) {
          console.error("Error removing item:", error);
        }
    };

    const decrementItem = async (product_id) => {
        console.log("Clicked remove for product:", product_id);
        try {
          await axios.get(env.baseUrl+`/cart/decrement/${product_id}`, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token_app")}`
            },
          });
          fetchCart();
          Swal.fire({
            title: 'Success',
            text: 'تم تعديل كمية المنتج بنجاح',
            icon: 'success',
            timer: 1500,
            confirmButtonText: 'إغلاق'
          });
        } catch (error) {
          console.error("Error removing item:", error);
        }
    };
      
    useEffect(() => {
        sumItems()
    } ,[cart])
    return (
        <>
        <section className="bg-white py-8 antialiased md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Shopping Cart</h2>

                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                    <div className="space-y-6">
                        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                            {cart.map((item) =>(
                                <div key={item.id} className="space-y-4 shadow-lg	p-2 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                    <a href="#" className="shrink-0 md:order-1">                                    
                                        {item.product.image != null?(
                                            <img className="hidden h-20 w-20 dark:block" src={`http://127.0.0.1:8000/public/app/${item.product.image}`}  />
                                        ):(
                                            <img className="hidden h-20 w-20 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="imac image" />
                                        )}
                                    </a>
        
                                    <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                                        <div className="flex items-center">
                                            <button 
                                            onClick={() => decrementItem(item.id)}
                                            type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100">
                                               <FaMinus />
                                            </button>
                                            <input type="text" id="counter-input" data-input-counter 
                                            className="w-10 shrink-0 border-0 bg-transparent text-center 
                                            text-sm font-medium text-gray-900 focus:outline-none focus:ring-0" placeholder="" 
                                            value={item.quantity} required />
                                            <button 
                                            onClick={() => incrementItem(item.id)}
                                            type="button" id="increment-button" data-input-counter-increment="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100">
                                                <FaPlus />
                                            </button>
                                            </div>
                                            <div className="text-end md:order-4 md:w-32">
                                            <p className="text-base font-bold text-gray-900">${item.product.price}</p>
                                        </div>
                                    </div>
        
                                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                        <a href="#" className="text-base font-medium text-gray-900 hover:underline">
                                            {item.product.title}
                                        </a>
    
                                        <div className="flex items-center gap-4">
                                            <button 
                                            onClick={() => handleaddtowishlist(item.product.id)}
                                            type="button" className="inline-flex items-center text-sm font-medium text-gray-500">
                                                <FaHeart />
                                                Add to Favorites
                                            </button>
            
                                            <button 
                                                type="button" 
                                                onClick={() => removeitem(item.id)}
                                                className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                                                <FaTrashAlt />
                                                حذف
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="hidden xl:mt-8 xl:block">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">People also bought</h3>
                        
                    </div>
                </div>

                <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                    <p className="text-xl font-semibold text-gray-900">Order summary</p>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <dl className="flex items-center justify-between gap-4">
                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                                <dd className="text-base font-medium text-gray-900">${sumcart}</dd>
                            </dl>

                            <dl className="flex items-center justify-between gap-4">
                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                                <dd className="text-base font-medium text-green-600">-$0</dd>
                            </dl>

                            <dl className="flex items-center justify-between gap-4">
                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                                <dd className="text-base font-medium text-gray-900">$0</dd>
                            </dl>

                            <dl className="flex items-center justify-between gap-4">
                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                                <dd className="text-base font-medium text-gray-900">$0</dd>
                            </dl>
                        </div>

                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                            <dt className="text-base font-bold text-gray-900">Total</dt>
                            <dd className="text-base font-bold text-gray-900">${sumcart}</dd>
                        </dl>
                    </div>

                    <Link href="/checkout" style={{ backgroundColor:"#2563eb",color:"#fff" }} className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 
                      py-2.5 text-sm font-medium hover:bg-primary-800">Proceed to Checkout
                    </Link>

                    <div className="flex items-center justify-center gap-2">
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                        <Link href="/shop" title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                            Continue Shopping
                            <FaShoppingCart />
                        </Link>
                    </div>
                    </div>

                    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                        <form className="space-y-4">
                            <div>
                            <label htmlFor="voucher" className="mb-2 block text-sm font-medium text-gray-900"> Do you have a voucher or gift card? </label>
                            <input type="text" id="voucher" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="" required />
                            </div>
                            <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300">Apply Code</button>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        </section>
        </>
    )
}