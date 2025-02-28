import Image from 'next/image';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Swal from 'sweetalert2';
import axios from 'axios';
import { use, useContext, useState } from 'react';
import { CartContext } from '@/CartContext';
import { WishlistContext } from '@/WishlistContext';
import env from '@/env';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  const { cart, setCart } = useContext(CartContext);
  const { wishlist, setWishlist } = useContext(WishlistContext);
  const [ loadingaddtocat,setLoadingaddtocat ]=useState(false);
  const [ loadingaddtowishlist,setLoadingaddtowishlist ]=useState(false);

  const fetchCart = async () => {
    try {
      const response = await axios.get(env.baseUrl+"/cart", {
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

  const handleaddtocart = async (product_id) => {
    setLoadingaddtocat(true)
    if(localStorage.getItem("token_app") != null){
      await axios.post(env.baseUrl+"/cart/store", {
        "product_id": product_id,
        "quantity": 1
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token_app")}`
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
    }else{
      Swal.fire({
        title: 'error',
        text: 'أنت عير مسجل دخول بعد',
        icon: 'error',
        timer: 1500,
        confirmButtonText: 'إغلاق'
      });
    }

    setLoadingaddtocat(false)
  };

  const handleaddtowishlist = async (product_id) => {
    setLoadingaddtowishlist(true)
   if(localStorage.getItem("token_app") != null){
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
   }else{
    Swal.fire({
      title: 'error',
      text: 'أنت عير مسجل دخول بعد',
      icon: 'error',
      timer: 1500,
      confirmButtonText: 'إغلاق'
    });
  }

  setLoadingaddtowishlist(false)
  };

  const { id, title, price, salePrice, gallery } = product;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Image Swiper */}
      <div className="relative h-48">
        {gallery != null && gallery.length > 0 ? (
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            className="h-full"
          >
            {gallery.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`${title} - Image ${index + 1}`}
                  className="hover:scale-105 transition-transform duration-300"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <img src="./about.webp" className='img-product' alt="Placeholder" />
        )}
      </div>

      {/* Product Details */}
      
        <div className="p-4">
          <Link href={`/shop/product/${id}`}>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
          </Link>
          {/* Price and Sale Price */}
          <div className="flex items-center gap-2 mb-4">
            {salePrice ? (
              <>
                <span className="text-xl font-bold text-gray-800">${salePrice}</span>
                <span className="text-sm text-gray-500 line-through">${price}</span>
              </>
            ) : (
              <span className="text-xl font-bold text-gray-800">${price}</span>
            )}
          </div>

          {/* Add to Cart and Wishlist Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleaddtocart(id)}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex-1"
            >
              <FaShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            {loadingaddtocat?(<svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
  </svg>):('')}
            </button>
            <button onClick={() => handleaddtowishlist(id)} className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300">
              {
                loadingaddtowishlist?(<svg aria-hidden="true" class="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>):(
              <FaHeart className="w-5 h-5 text-gray-600" />)}    
            </button>
          </div>
        </div>
    </div>
  );
};

export default ProductCard;
