"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useContext, useState } from "react";
import env from "@/env";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Swal from "sweetalert2";
import axios from "axios";
import { CartContext } from "@/CartContext";
import { WishlistContext } from "@/WishlistContext";
import ReviewProduct from "@/components/ReviewProduct";
import Image from "next/image";
import { getToken } from "@/lib/helper";

const ProductPage = () => {
  const router=useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const id=params.id
  const { cart, setCart } = useContext(CartContext);
  const { wishlist, setWishlist } = useContext(WishlistContext);
  const [ loadingaddtocat,setLoadingaddtocat ]=useState(false);
  const [ loadingaddtowishlist,setLoadingaddtowishlist ]=useState(false);
  const defaultAttr = product && product.attributes_value && product.attributes_value.length > 0 ? product.attributes_value[0] : null;
  const [selectedAttr, setSelectedAttr] = useState(defaultAttr);
  const [srcImage, setSrcImage] = useState(defaultAttr?.image
    ? `https://ecommerce.ahmedgamaldev.com/public/app/${defaultAttr.image}`
    : (product && product.gallery && product.gallery[0])
      ? `${product.gallery[0]}`
      : ''
  );
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${env.baseUrl}/product/${id}`);
        setProduct(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get(env.baseUrl+"/cart", {
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
      const response = await axios.get(env.baseUrl+"/wishlist", {
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
    setLoadingaddtocat(true)
    if(getToken("token_app") != undefined){
      await axios.post(env.baseUrl+"/cart/store", {
        "product_id": product_id,
        "quantity": 1
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
   if(getToken("token_app") != undefined){
    await axios.post(env.baseUrl+"/wishlist/store", {
      "product_id": product_id,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${getToken("token_app")}`
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
  
  const changeImage = (src) => {
    setSrcImage(src);
  };

  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    const match = product && product.attributes_value?.find(attr => {
      return Object.entries(selectedAttributes).every(([key, val]) => attr[key] === val);
    });
    if (match) setSelectedVariant(match);
  }, [selectedAttributes]);

  const handleAttributeChange = (key, value) => {
    setSelectedAttributes(prev => ({ ...prev, [key]: value }));
  };

  const excludedKeys = ['price', 'image'];
  const groupedAttributes = {};

  if (Array.isArray(product && product.attributes_value)) {
    product.attributes_value.forEach(attr => {
      Object.entries(attr).forEach(([key, value]) => {
        if (!excludedKeys.includes(key)) {
          if (!groupedAttributes[key]) groupedAttributes[key] = new Set();
          groupedAttributes[key].add(value);
        }
      });
    });
  }

  if (loading){
    return (
      <div className="p-6 max-w-lg mx-auto">
      <div className="animate-pulse space-y-4">
        <div className="bg-gray-300 h-48 w-full rounded-lg"></div>
        <div className="h-6 bg-gray-300 w-3/4 rounded"></div>
        <div className="h-4 bg-gray-300 w-1/2 rounded"></div>
      </div>
    </div>
    )
  }

  if (error){
    router.push("/shop")
    return;
  }

  if (!product){
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">product not found</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* ✅ Swiper Gallery */}
        <div className="relative">
          {product.gallery && product.gallery.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              loop={true}
              slidesPerView={1}
              className="rounded-lg"
            >
              {product.gallery.map((image, index) => (
                <SwiperSlide key={index} className="max-h-600">
                  <img
                    height={600}
                    width={600}
                    src={selectedVariant?.image
              ? `https://ecommerce.ahmedgamaldev.com/public/app/${selectedVariant.image}`
              : image || './about.webp'}
                    
                    alt={`Product ${index + 1}`}
                    className="w-full max-h-600 rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <img
              src="/placeholder.jpg"
              alt="Placeholder"
              className="w-full h-auto rounded-lg"
            />
          )}
        </div>

        {/* ✅ Product Details */}
        <div className="space-y-4">
          {/* <img src={`${env.base}/public/app/${product.image}`} /> */}
          <h1 className="text-3xl text-right font-bold mb-8">{product.title}</h1>
          <div className="text-right" dangerouslySetInnerHTML={{ __html: product.long_description }} />
          <div className="flex items-center flex-row-reverse gap-2">
            {product.sale_price ? (
              <>
                <span className="text-2xl text-right font-bold text-gray-800">
                ${selectedVariant?.price || product.sale_price}
                </span>
                <span className="text-sm text-right text-gray-500 line-through">
                  ${selectedVariant?.price || product.price}
                </span>
              </>
            ) : (
              <span className="text-2xl text-right font-bold text-gray-800">
                ${selectedVariant?.price || product.price}
              </span>
            )}
          </div>

        {product && product.attributes_value?.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {Object.entries(groupedAttributes).map(([key, values]) => (
                <div key={key}>
                  <h4 className="font-semibold mb-1 capitalize">{key}:</h4>
                  <div className="flex flex-wrap gap-2">
                    {[...values].map((val, i) => (
                      <button
                        key={i}
                        onClick={() => handleAttributeChange(key, val)}
                        className={`px-3 py-1 border rounded text-sm capitalize ${
                          selectedAttributes[key] === val ? 'bg-blue-600 text-white' : 'bg-gray-100'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleaddtocart(product.id)}
              className="flex items-center  justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex-1"
            >
              <FaShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
              {loadingaddtocat?(<svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                </svg>):
                ('')
              }
            </button>
            <button
              onClick={() => handleaddtowishlist(product.id)}
              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300"
            >
               {loadingaddtowishlist?(<svg aria-hidden="true" class="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>):(
              <FaHeart className="w-5 h-5 text-gray-600" />)}
            </button>
          </div>
        </div>
      </div>

      {/* تقييم المنتج */}
      <ReviewProduct product_id={product.id} />
    </div>
  );
};

export default ProductPage;
