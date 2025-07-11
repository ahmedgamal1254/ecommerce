"use client"
import React, { useState, useEffect, useContext } from "react"
import Link from "next/link"
import { FaShoppingCart, FaHeart, FaTrashAlt, FaMinus, FaPlus } from "react-icons/fa"
import { CartContext } from "@/CartContext"
import { WishlistContext } from "@/WishlistContext"
import axios from "axios"
import Swal from "sweetalert2"
import env from "../../env"
import { getToken } from "@/lib/helper"
import { decrementProductCart, decrementProductCartAttributesQuantity, getCart, incrementProductCart, incrementProductCartAttributesQuantity, removeFromCart } from "@/lib/cart"
import toast from "react-hot-toast"
import loadCustomRoutes from "next/dist/lib/load-custom-routes"

export default function Home() {
  const { cart, setCart } = useContext(CartContext)
  const { wishlist, setWishlist } = useContext(WishlistContext)
  const [sumcart, setSumCart] = useState(0)

  function sumItems() {
    let total = 0
    cart.forEach(item => {
      if(item.attributes != null){
        item.attributes.forEach(element => {
          total+= element.quantity * element.price
        });
      }else{
      total += item.quantity * item.product.price

      }
    })
    setSumCart(total)
  }

  const fetchCart = async () => {
    if(getToken("token_app")){
      try {
        const res = await axios.get(env.baseUrl + "/cart", {
          headers: {
            'Authorization': `Bearer ${getToken("token_app")}`
          }
        })
        setCart(res.data.data)
      } catch (err) {
        console.error("Error fetching cart:", err)
      }
    }else{
      setCart(getCart())
    }
  }

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(env.baseUrl + "/wishlist", {
        headers: {
          'Authorization': `Bearer ${getToken("token_app")}`
        }
      })
      setWishlist(res.data.data)
    } catch (err) {
      console.error("Error fetching wishlist:", err)
    }
  }

  const removeItem = async (productId,itemId) => {
    if(getToken("token_app")){
      const loadingToast = toast.loading('جاري تحديث الكمية...'); // تظهر مباشرة

      try {
        await axios.get(env.baseUrl + `/cart/destroy/${itemId}`, {
          headers: {
            'Authorization': `Bearer ${getToken("token_app")}`
          }
        })

          toast.success('تم حذف المنتج بنجاح', { id: loadingToast }); // إلغاء القديمة وعرض نجاح
      } catch (err) {
        console.error("Error removing item:", err)
            toast.error('حدث خطأ أثناء الحذف', { id: loadingToast }); // إلغاء القديمة وعرض خطأ

      }
    }else{
      removeFromCart(productId)
      toast.success('تم حذف المنتج بنجاح')
    }
    fetchCart()
  }

  const handleAddToWishlist = async (productId) => {
    try {
      await axios.post(env.baseUrl + "/wishlist/store", { product_id: productId }, {
        headers: {
          'Authorization': `Bearer ${getToken("token_app")}`
        }
      })
      fetchWishlist()
      Swal.fire({ icon: 'success', text: 'تمت إضافة المنتج للمفضلة', timer: 1500, showConfirmButton: false })
    } catch (err) {
      console.error("Error adding to wishlist:", err)
    }
  }

  const incrementItem = async (productId,itemId) => {
    if(getToken("token_app")){
      const loadingToast = toast.loading('جاري تحديث الكمية...');

      try {
        await axios.get(env.baseUrl + `/cart/increment/${itemId}`, {
          headers: { 'Authorization': `Bearer ${getToken("token_app")}` }
        })

      toast.success("تم تحديث المنتج بنجاح",{id:loadingToast})

      } catch (err) {
        console.error("Error incrementing:", err)
        toast.error('حدث خطأ أثناء التحديث', { id: loadingToast }); // إلغاء القديمة وعرض خطأ
      }
    }else{
      console.log(productId)
      incrementProductCart(productId)
      toast.success("تم تحديث المنتج بنجاح")
    }

    fetchCart()

  }

  const decrementItem = async (productId,itemId) => {
    if(getToken("token_app")){
      const loadingToast = toast.loading('جاري تحديث الكمية...');
      try {
        await axios.get(env.baseUrl + `/cart/decrement/${itemId}`, {
          headers: { 'Authorization': `Bearer ${getToken("token_app")}` }
        })

        toast.success("تم تحديث المنتج بنجاح",{id:loadingToast})
      } catch (err) {
        console.error("Error decrementing:", err)
        toast.error("فشل تحديث المنتج بنجاح",{id:loadingToast})
      }
    }else{
      decrementProductCart(productId)
      toast.success("تم تحديث المنتج بنجاح")
    }
    fetchCart()
  }

  const incrementCartAttributesQuantity = async (product_id, itemVal) => {
    if (getToken("token_app")) {
      const loadingToast = toast.loading('جاري تحديث الكمية...'); // تظهر مباشرة
      try {
        await axios.post(
          env.baseUrl + "/cart/increment-inner",
          {
            product_id: product_id,
            attribute_id: itemVal,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${getToken("token_app")}`,
            },
          }
        );
        fetchCart();
        toast.success('تم تحديث الكمية بنجاح', { id: loadingToast }); // إلغاء القديمة وعرض نجاح

      } catch (error) {
        console.error("Increment error", error.response?.data || error);
            toast.error('حدث خطأ أثناء التحديث', { id: loadingToast }); // إلغاء القديمة وعرض خطأ
      }
    } else {
      incrementProductCartAttributesQuantity(product_id, itemVal); // guest mode
      fetchCart();
      toast.success('تم تحديث الكمية بنجاح',); // إلغاء القديمة وعرض نجاح
    }
  };

  const decrementCartAttributesQuantity = async (product_id, itemVal) => {
    if (getToken("token_app")) {
      const loadingToast = toast.loading('جاري تحديث الكمية...'); // تظهر مباشرة

      try {
        await axios.post(
          env.baseUrl + "/cart/decrement-inner",
          {
            product_id: product_id,
            attribute_id: itemVal,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${getToken("token_app")}`,
            },
          }
        );
        fetchCart();
        toast.success('تم تحديث الكمية بنجاح', { id: loadingToast }); // إلغاء القديمة وعرض نجاح
      } catch (error) {
        console.error("Decrement error", error.response?.data || error);
        toast.error('حدث خطأ أثناء التحديث', { id: loadingToast }); // إلغاء القديمة وعرض خطأ
      }
    } else {
      decrementProductCartAttributesQuantity(product_id, itemVal); // guest mode
      fetchCart();
      toast.success('تم تحديث الكمية بنجاح',); // إلغاء القديمة وعرض نجاح
    }
  };

  useEffect(() => {
    sumItems()
  }, [cart])

  return (
    <section className="bg-white py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">🛒 سلة التسوق</h2>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3 space-y-4">
            {cart.length === 0 ? (
              <p className="text-gray-600">سلة التسوق فارغة</p>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex flex-col gap-4 border rounded-lg p-4 shadow-sm items-start">
                  <div className="flex flex-col items-start md:flex-row gap-4  p-4 shadow-sm">
                    <div className="w-24 h-24">
                      <img
                        src={item.product.gallery?.[0] || item.product.images?.[0] || "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"}
                        alt={item.product.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold text-lg text-gray-800">{item.product.title}</h3>
                      <p className="text-sm text-gray-600">${item.product.price}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <button
                          onClick={() => handleAddToWishlist(item.product.id)}
                          className="text-gray-500 hover:text-red-500 text-sm flex items-center gap-1"
                        >
                          <FaHeart /> مفضلة
                        </button>
                        <button
                          onClick={() => removeItem(item.product_id,item.id)}
                          className="text-red-600 hover:underline text-sm flex items-center gap-1"
                        >
                          <FaTrashAlt /> حذف
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      
                        {
                          item.attributes == null?(<div className="flex items-center gap-2">
                          <button onClick={() => decrementItem(item.product_id,item.id)} className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 flex items-center justify-center">
                          <FaMinus className="text-sm" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button onClick={() => incrementItem(item.product_id,item.id)} className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 flex items-center justify-center">
                          <FaPlus className="text-sm" />
                        </button>
                      </div>):('')
                        }
                    </div>
                  </div>

                  {item.attributes?.length > 0 && (
                    <table className="table-auto w-full mt-4 border">
                      <thead>
                        <tr>
                          <th className="border px-4 py-2">الخصائص</th>
                          <th className="border px-4 py-2">الكمية</th>
                          <th className="border px-4 py-2">السعر</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.attributes?.map((itemVal) => (
                          <tr key={itemVal.id}>
                            <td className="border px-4 py-2">
                              {Object.entries(itemVal.attributes)
                                .map(([key, value]) => `${key}: ${value}`)
                                .join(", ")}
                            </td>
                            <td className="border px-4 py-2">
                              <div className="flex items-center gap-2">
                                <button onClick={() => decrementCartAttributesQuantity(item.product_id,itemVal.id)} className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 flex items-center justify-center">
                                  <FaMinus className="text-sm" />
                                </button>
                                <span className="w-8 text-center">{itemVal.quantity}</span>
                                <button onClick={() => incrementCartAttributesQuantity(item.product_id,itemVal.id)} className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 flex items-center justify-center">
                                  <FaPlus className="text-sm" />
                                </button>
                              </div>
                            </td>
                            <td className="border px-4 py-2">{itemVal.price * itemVal.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Summary */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">ملخص الطلب</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>المجموع الفرعي</span>
                  <span>${sumcart}</span>
                </div>
                <div className="flex justify-between">
                  <span>الضريبة</span>
                  <span>$0</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2 mt-2">
                  <span>المجموع الكلي</span>
                  <span>${sumcart}</span>
                </div>
              </div>
              <Link href="/checkout" className="block mt-6 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
                إتمام الشراء
              </Link>
              <Link href="/shop" className="block mt-2 text-center text-blue-600 hover:underline text-sm">
                ← متابعة التسوق
              </Link>
            </div>

            {/* كوبون */}
            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <label htmlFor="voucher" className="block text-sm font-medium mb-2 text-gray-700">
                هل لديك كوبون خصم؟
              </label>
              <input
                type="text"
                id="voucher"
                className="w-full rounded border-gray-300 focus:ring focus:ring-blue-200 text-sm p-2"
                placeholder="أدخل كود الخصم"
              />
              <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded">
                تطبيق
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
