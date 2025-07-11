"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import env from "@/env";
import Swal from "sweetalert2";
import { getToken } from "@/lib/helper";
import toast from "react-hot-toast";
import { Rate } from "antd";

const ReviewProduct = (props) => {
  const [reviews, setReviews] = useState([]);
  const [avgreviews, setavgReviews] = useState(0);
  const [countreviews, setCountReviews] = useState(0);
  const [aggrReviews, setaggrReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const [review, setReview] = useState({
    rating: 0,
    comment: "",
  });

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleRating = (rating) => {
    setReview({ ...review, rating });
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(env.baseUrl + "/all-reviews/" + props.product_id, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${getToken("token_app")}`,
        },
      });
      const result = await response.json();
      setavgReviews(result.data.average);
      setCountReviews(result.data.count);
      setReviews(result.data.reviews.data);
      setaggrReviews(result.data.reviewCounts);
    } catch (error) {
      console.error("خطأ في جلب التقييمات:", error);
      toast.error("خطأ في جلب التقييمات")
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (getToken("token_app") != undefined) {
      let loadingToast=toast.loading("جارى إرسال التقييم")
      try {
        setLoading(true);
        await axios.post(
          env.baseUrl + "/review/store",
          {
            product_id: props.product_id,
            rate: review.rating,
            comment: review.comment,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${getToken("token_app")}`,
            },
          }
        );

        toast.success("تم إرسال التقييم بنجاح",{id:loadingToast})
    
        fetchReviews();
        setReview({ rating: 0, comment: "" });
      } catch (error) {
        toast.error("حدث خطأ أثناء إرسال التقييم",{id:loadingToast})
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("يجب تسجيل الدخول أولًا",{id:loadingToast})
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const ratingsSummary = [5, 4, 3, 2, 1].map((rating) => aggrReviews[rating.toFixed(2)] ?? 0);

  return (
    <section className="py-24 relative" dir="rtl">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        <div className="w-full">
          <h2 className="font-manrope font-bold text-4xl text-black mb-8 text-center">آراء العملاء</h2>

          {/* إجمالي التقييمات */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-11 pb-11 border-b border-gray-100 max-xl:max-w-2xl max-xl:mx-auto">
            <div className="box flex flex-col gap-y-4 w-full">
              {[5, 4, 3, 2, 1].map((rating, index) => (
                <div key={index} className="flex items-center w-full">
                  <p className="font-medium text-lg text-black ml-2">{rating}</p>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="#FBBF24">
                    <path d="M9.049 2.927a1 1 0 011.902 0l1.358 3.657 3.898.564a1 1 0 01.554 1.705l-2.829 2.757.669 3.898a1 1 0 01-1.451 1.054L10 14.347l-3.501 1.845a1 1 0 01-1.451-1.054l.669-3.898-2.829-2.757a1 1 0 01.554-1.705l3.898-.564L9.049 2.927z" />
                  </svg>
                  <div className="h-2 flex-1 bg-amber-50 rounded-3xl mx-3">
                    <div
                      className="h-full bg-amber-400 rounded-3xl"
                      style={{ width: `${ratingsSummary[index]}%` }}
                    ></div>
                  </div>
                  <p className="font-medium text-lg text-black">{ratingsSummary[index]}</p>
                </div>
              ))}
            </div>

            <div className="p-8 bg-amber-50 rounded-3xl flex items-center justify-center flex-col">
              <h2 className="font-manrope font-bold text-5xl text-amber-400 mb-6">
                {aggrReviews != null ? parseFloat(avgreviews).toFixed(2) : 0}
              </h2>
<div className="flex items-center justify-center gap-2 sm:gap-6 mb-4">
  {[...Array(Number.isFinite(Number(avgreviews)) ? Math.round(Number(avgreviews)) : 0)].map((_, i) => (
    <svg key={i} width="60" height="60" fill="#FBBF24" viewBox="0 0 20 20">
      <path d="M9.049 2.927a1 1 0 011.902 0l1.358 3.657 3.898.564a1 1 0 01.554 1.705l-2.829 2.757.669 3.898a1 1 0 01-1.451 1.054L10 14.347l-3.501 1.845a1 1 0 01-1.451-1.054l.669-3.898-2.829-2.757a1 1 0 01.554-1.705l3.898-.564L9.049 2.927z" />
    </svg>
  ))}
</div>

              <p className="font-medium text-xl leading-8 text-gray-900 text-center">{countreviews} تقييم</p>
            </div>
          </div>

          {/* التعليقات */}
          {reviews.map((item, index) => (
            <div key={index} className="pt-11 pb-8 border-b border-gray-100 max-xl:max-w-2xl max-xl:mx-auto">
              <div className="flex items-center gap-3 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="60" height="60" viewBox="0 0 30 30" fill={i < Math.floor(item.rate) ? "#FBBF24" : "#E5E7EB"}>
                    <path d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L..." />
                  </svg>
                ))}
              </div>
              <div className="flex sm:items-center flex-col min-[400px]:flex-row justify-between gap-5 mb-4">
                <div className="flex items-center gap-3">
                  <img src="https://pagedone.io/asset/uploads/1704349572.png" alt="صورة المستخدم" className="w-8 h-8 rounded-full object-cover" />
                  <h6 className="font-semibold text-lg leading-8 text-indigo-600">{item.user?.name || "مستخدم مجهول"}</h6>
                </div>
                <p className="font-normal text-lg leading-8 text-gray-400">
                  {new Date(item.created_at).toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <p className="font-normal text-lg leading-8 text-gray-700">{item.comment || "لم يتم إضافة تعليق."}</p>
            </div>
          ))}

          {/* نموذج التقييم */}
          <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">أضف تقييمك</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <p className="text-lg font-medium text-gray-700 mb-2">التقييم:</p>
                <Rate 
                  allowHalf 
                  value={review.rating}
                  onChange={(value) => handleRating(value)}
                />
              </div>

              <textarea
                name="comment"
                placeholder="اكتب تعليقك هنا..."
                value={review.comment}
                onChange={handleChange}
                required
                rows="4"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              ></textarea>

              <button
                type="submit"
                className="w-full p-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 100 101"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M100 50.5908C100..." fill="currentColor" />
                    </svg>
                    <span>جاري الإرسال...</span>
                  </span>
                ) : (
                  "إرسال التقييم"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewProduct;
