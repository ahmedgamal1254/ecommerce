"use client"
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { motion } from "framer-motion";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { CartContext } from '@/CartContext';
import { WishlistContext } from '@/WishlistContext';
import env from '@/env';
import Link from 'next/link';
import { getRandomInRange, getToken } from '@/lib/helper';

const ProductCard = ({ product }) => {
  const { cart, setCart } = useContext(CartContext);
  const { wishlist, setWishlist } = useContext(WishlistContext);
  const [loadingaddtocat, setLoadingaddtocat] = useState(false);
  const [loadingaddtowishlist, setLoadingaddtowishlist] = useState(false);

  const { id, title, price, salePrice, gallery, attributes_value } = product;
  const [srcImage, setSrcImage] = useState((gallery && gallery[0]) ? `${gallery[0]}`: '');

  const fetchCart = async () => {
    try {
      const response = await axios.get(env.baseUrl + "/cart", {
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
  };

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(env.baseUrl + "/wishlist", {
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

  const handleaddtocart = async (product_id) => {
    setLoadingaddtocat(true);
    if (getToken("token_app") != null) {
      await axios.post(env.baseUrl + "/cart/store", {
        product_id: product_id,
        quantity: 1,
        attribute_value: selectedAttr?.sizes
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${getToken("token_app")}`
        },
      });

      fetchCart();
      Swal.fire({
        title: 'Success',
        text: 'تم اضافة المنتج بنجاح',
        icon: 'success',
        timer: 1500,
        confirmButtonText: 'إغلاق'
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'أنت غير مسجل دخول بعد',
        icon: 'error',
        timer: 1500,
        confirmButtonText: 'إغلاق'
      });
    }
    setLoadingaddtocat(false);
  };

  const handleaddtowishlist = async (product_id) => {
    setLoadingaddtowishlist(true);
    if (getToken("token_app") != undefined) {
      await axios.post(env.baseUrl + "/wishlist/store", {
        product_id: product_id,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${getToken("token_app")}`
        },
      });

      setLoadingaddtowishlist(false);
      fetchWishlist();
      Swal.fire({
        title: 'Success',
        text: 'تم اضافة المنتج للمفضلة بنجاح',
        icon: 'success',
        timer: 1500,
        confirmButtonText: 'إغلاق'
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'أنت غير مسجل دخول بعد',
        icon: 'error',
        timer: 1500,
        confirmButtonText: 'إغلاق'
      });
    }
  };

  const changeImage = (src) => {
    setSrcImage(src);
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative h-96">
        <motion.img
          src={
            gallery?.[0] || './about.webp'
          }
          alt={`${title}`}
          className="h-full w-full object-contain"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.3 }}
          onMouseOver={
            () => {
                  const random = getRandomInRange(1, gallery?.length - 1);
                  changeImage(gallery?.[random]);
                }
          }
          onMouseOut={
            () => {
                  changeImage(gallery?.[0] || './about.webp');
                }
          }
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        <Link href={`/shop/product/${id}`}>
          <h3 className="text-lg font-semibold mb-2">{title ? title.split(" ").slice(0, 8).join(" ") : ''}</h3>
        </Link>

        {/* Price Display */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-gray-800">${price}</span>
        </div>

        {/* Add to Cart & Wishlist */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleaddtocart(id)}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex-1"
          >
            <FaShoppingCart className="w-5 h-5" />
            <span>أضف للعربة</span>
            {loadingaddtocat && (
              <svg aria-hidden="true" role="status" className="inline w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none">
                <path d="M100 50.59C100 78.205 77.614 100.591 50 100.591C22.386 100.591 0 78.205 0 50.59C0 22.977 22.386 0.591 50 0.591C77.614 0.591 100 22.977 100 50.59Z" fill="#E5E7EB"/>
                <path d="M93.968 39.04C96.393 38.404 97.862 35.912 97.008 33.554C95.293 28.823 92.871 24.369 89.817 20.348C85.845 15.119 80.883 10.724 75.212 7.413C69.542 4.102 63.275 1.94 56.77 1.051C51.767 0.368 46.698 0.447 41.735 1.279C39.261 1.693 37.813 4.198 38.45 6.623C39.087 9.049 41.569 10.472 44.051 10.107C47.851 9.549 51.719 9.527 55.54 10.049C60.864 10.777 65.993 12.546 70.633 15.255C75.274 17.965 79.335 21.562 82.585 25.841C84.918 28.912 86.8 32.291 88.181 35.876C89.083 38.216 91.542 39.678 93.968 39.041Z" fill="currentColor"/>
              </svg>
            )}
          </button>

          <button
            onClick={() => handleaddtowishlist(id)}
            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300"
          >
            {loadingaddtowishlist ? (
              <svg aria-hidden="true" className="inline w-6 h-6 text-gray-200 animate-spin fill-gray-600" viewBox="0 0 100 101" fill="none">
                <path d="M100 50.59C100 78.205 77.614 100.591 50 100.591C22.386 100.591 0 78.205 0 50.59C0 22.977 22.386 0.591 50 0.591C77.614 0.591 100 22.977 100 50.59Z" fill="currentColor"/>
                <path d="M93.968 39.04C96.393 38.404 97.862 35.912 97.008 33.554..." fill="currentFill"/>
              </svg>
            ) : (
              <FaHeart className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
