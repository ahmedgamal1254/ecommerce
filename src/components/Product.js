"use client"
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { motion } from "framer-motion";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useContext, useState } from 'react';
import { CartContext } from '@/CartContext';
import { WishlistContext } from '@/WishlistContext';
import env from '@/env';
import Link from 'next/link';
import { getRandomInRange, getToken } from '@/lib/helper';
import { addToCart, getCart } from '@/lib/cart';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { cart, setCart } = useContext(CartContext);
  const { wishlist, setWishlist } = useContext(WishlistContext);
  const [loadingAddToCart, setLoadingAddToCart] = useState(false);
  const [loadingAddToWishlist, setLoadingAddToWishlist] = useState(false);
  const { id, title, price, salePrice, gallery, attributes } = product;
  const [srcImage, setSrcImage] = useState(gallery && gallery[0] ? `${gallery[0]}` : '/fallback.webp');

  const fetchCart = async () => {
    if(getToken("token_app")){
      try {
        const response = await axios.get(`${env.baseUrl}/cart`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${getToken("token_app")}`
          }
        });
        setCart(response.data.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    }else{
      setCart(getCart())
    }
  };

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(`${env.baseUrl}/wishlist`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${getToken("token_app")}`
        }
      });
      setWishlist(response.data.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const handleAddToCart = async (product_id) => {
    setLoadingAddToCart(true);
    if (getToken("token_app")) {
      let loadingtoast=toast.loading("جارى اضافة المنتج")
      try {
        await axios.post(`${env.baseUrl}/cart/store`, {
          product_id: product_id,
          quantity: 1,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${getToken("token_app")}`
          },
        });

        toast.success("تم اضافة المنتج بنجاح",{id:loadingtoast})
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("فشل اضافة المنتج بنجاح",{id:loadingtoast})
      }
    } else {
      let data={
        product_id:product_id,
        product:{
          title:title,
          price:price,
          salePrice:salePrice,
          gallery:gallery
        },
        quantity:1
      }
      toast.success("تم اضافة المنتج بنجاح")

      addToCart(data)
    }
      fetchCart();  
      setLoadingAddToCart(false);
  };

  const handleAddToWishlist = async (product_id) => {
    setLoadingAddToWishlist(true);
    if (getToken("token_app")) {
      let loadingtoast=toast.loading("جارى اضافة المنتج")

      try {
        await axios.post(`${env.baseUrl}/wishlist/store`, {
          product_id: product_id,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${getToken("token_app")}`
          },
        });
        fetchWishlist();
        
        toast.success("تم اضافة المنتج بنجاح",{id:loadingtoast})
      } catch (error) {
        console.error("Error adding to wishlist:", error);
        toast.error("فشلل اضافة المنتج بنجاح",{id:loadingtoast})        
      }
    } else {
      toast.error('أنت غير مسجل دخول بعد',{id:loadingtoast})     
    }
    
    setLoadingAddToWishlist(false);
  };

  const changeImage = (src) => {
    setSrcImage(src || '/fallback.webp');
  };

  return (
    <motion.div 
      className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl 
      transition-shadow duration-300 w-80 mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Image Section */}
      <div className="relative h-64 w-full overflow-hidden">
        <motion.img
          src={srcImage}
          alt={title}
          className="h-64 w-full object-cover transition-transform duration-500"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onMouseOver={() => {
            const random = getRandomInRange(1, gallery?.length - 1);
            changeImage(gallery?.[random]);
          }}
          onMouseOut={() => changeImage(gallery?.[0] || '/fallback.webp')}
        />
        {salePrice && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            Sale
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col gap-3">
        <Link href={`/shop/product/${id}`}>
          <h3 className="text-base font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
            {title ? title.split(" ").slice(0, 8).join(" ") : 'Product Title'}
          </h3>
        </Link>

        {/* Price Display */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">${salePrice || price}</span>
          {salePrice && (
            <span className="text-sm text-gray-500 line-through">${price}</span>
          )}
        </div>

        {/* Add to Cart & Wishlist */}
        <div className="flex items-center gap-3">
          {
            product && product.attributes?.length > 0 ? (
              <Link href={`/shop/product/${id}`}>
                <h3 className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex-1 text-sm font-medium">
                      <FaShoppingCart className="w-4 h-4" />
                          <span>عرض المنتج</span>
                            </h3>
              </Link>
            ):(
          <motion.button
            onClick={() => handleAddToCart(id)}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex-1 text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaShoppingCart className="w-4 h-4" />
            <span>أضف للعربة</span>
            {loadingAddToCart && (
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
              >
                <path
                  d="M100 50.59C100 78.205 77.614 100.591 50 100.591C22.386 100.591 0 78.205 0 50.59C0 22.977 22.386 0.591 50 0.591C77.614 0.591 100 22.977 100 50.59Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.968 39.04C96.393 38.404 97.862 35.912 97.008 33.554C95.293 28.823 92.871 24.369 89.817 20.348C85.845 15.119 80.883 10.724 75.212 7.413C69.542 4.102 63.275 1.94 56.77 1.051C51.767 0.368 46.698 0.447 41.735 1.279C39.261 1.693 37.813 4.198 38.45 6.623C39.087 9.049 41.569 10.472 44.051 10.107C47.851 9.549 51.719 9.527 55.54 10.049C60.864 10.777 65.993 12.546 70.633 15.255C75.274 17.965 79.335 21.562 82.585 25.841C84.918 28.912 86.8 32.291 88.181 35.876C89.083 38.216 91.542 39.678 93.968 39.041Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </motion.button>

            )
          }

          <motion.button
            onClick={() => handleAddToWishlist(id)}
            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {loadingAddToWishlist ? (
              <svg
                aria-hidden="true"
                className="inline w-5 h-5 text-gray-200 animate-spin fill-gray-600"
                viewBox="0 0 100 101"
                fill="none"
              >
                <path
                  d="M100 50.59C100 78.205 77.614 100.591 50 100.591C22.386 100.591 0 78.205 0 50.59C0 22.977 22.386 0.591 50 0.591C77.614 0.591 100 22.977 100 50.59Z"
                  fill="currentColor"
                />
                <path
                  d="M93.968 39.04C96.393 38.404 97.862 35.912 97.008 33.554C95.293 28.823 92.871 24.369 89.817 20.348C85.845 15.119 80.883 10.724 75.212 7.413C69.542 4.102 63.275 1.94 56.77 1.051C51.767 0.368 46.698 0.447 41.735 1.279C39.261 1.693 37.813 4.198 38.45 6.623C39.087 9.049 41.569 10.472 44.051 10.107C47.851 9.549 51.719 9.527 55.54 10.049C60.864 10.777 65.993 12.546 70.633 15.255C75.274 17.965 79.335 21.562 82.585 25.841C84.918 28.912 86.8 32.291 88.181 35.876C89.083 38.216 91.542 39.678 93.968 39.041Z"
                  fill="currentFill"
                />
              </svg>
            ) : (
              <FaHeart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;