"use client"
import React,{useState,useEffect} from "react";
import axios from "axios";
import env from "@/env";
import Swal from "sweetalert2";

const ReviewProduct=(props) =>{
  const [reviews,setReviews]=useState([])
  const [avgreviews,setavgReviews]=useState(0)
  const [countreviews,setCountReviews]=useState(0)
  const [aggrReviews,setaggrReviews]=useState([])
  const [loading,setLoading]=useState(false)

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
      const response = await fetch(env.baseUrl+"/all-reviews/"+props.product_id,{
        headers:{
          'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token_app")}`
        }
      });
      const result = await response.json();
      setavgReviews(result.data.average)
      setCountReviews(result.data.count)
      setReviews(result.data.reviews.data)
      setaggrReviews(result.data.reviewCounts)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSubmit = async (e) => {  // Add 'async' here
    e.preventDefault();
    console.log("Review Submitted:", review);
  
    if (localStorage.getItem("token_app") != null) {
      try {
        setLoading(true)
        await axios.post(env.baseUrl + "/review/store",
          {
            "product_id":props.product_id,
            "rate":review.rating,
            "comment":review.comment
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token_app")}`
            },
          }
        );
    
        Swal.fire({
          title: 'Success',
          text: 'تم حفظ التقييم بنجاح',
          icon: 'success',
          timer: 1500,
          confirmButtonText: 'إغلاق'
        });

        fetchReviews()
  
        setLoading(false)
      } catch (error) {
        console.error("Error submitting review:", error);
  
        Swal.fire({
          title: 'Error',
          text: 'حدث خطأ أثناء إرسال التقييم',
          icon: 'error',
          confirmButtonText: 'إغلاق'
        });
      }finally{
        setLoading(false)
      }
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
  

  useEffect(() => {

    fetchReviews();
  },[])

  const ratingsSummary = [5, 4, 3, 2, 1].map(rating => aggrReviews[rating.toFixed(2)] ?? 0);
  console.log(ratingsSummary)

    return (
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <div className="w-full">
            <h2 className="font-manrope font-bold text-4xl text-black mb-8 text-center">Our customer reviews</h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-11 pb-11 border-b border-gray-100 max-xl:max-w-2xl max-xl:mx-auto">
              <div className="box flex flex-col gap-y-4 w-full">
                {[5, 4, 3, 2, 1].map((rating, index) => (
                  <div key={index} className="flex items-center w-full">
                    <p className="font-medium text-lg text-black mr-0.5">{rating}</p>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_12042_8589)">
                        <path d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z" fill="#FBBF24" />
                      </g>
                      <defs>
                        <clipPath id="clip0_12042_8589">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <p className={`h-2 w-full ${rating === 5 ? 'sm:min-w-[278px]' : 'xl:min-w-[278px]'} rounded-3xl bg-amber-50 ml-5 mr-3`}>
                      <span className={`h-full w-[${ratingsSummary[index]}%] rounded-3xl bg-amber-400 flex`}></span>
                    </p>
                    <p className="font-medium text-lg text-black mr-0.5">{ratingsSummary[index]}</p>
                  </div>
                ))}
              </div>
              <div className="p-8 bg-amber-50 rounded-3xl flex items-center justify-center flex-col">
                <h2 className="font-manrope font-bold text-5xl text-amber-400 mb-6">{aggrReviews != null?parseFloat(avgreviews).toFixed(2):0}</h2>
                <div className="flex items-center justify-center gap-2 sm:gap-6 mb-4">
                  {[...Array(Math.round(avgreviews))].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                      <g clipPath="url(#clip0_13624_2608)">
                        <path d="M21.1033 2.9166C21.4701 2.17335 22.5299 2.17335 22.8967 2.9166L28.233 13.729C28.3786 14.0241 28.6602 14.2287 28.9859 14.276L40.9181 16.0099C41.7383 16.1291 42.0658 17.137 41.4723 17.7156L32.8381 26.1318C32.6024 26.3616 32.4949 26.6926 32.5505 27.017L34.5888 38.9009C34.7289 39.7178 33.8714 40.3408 33.1378 39.9551L22.4653 34.3443C22.174 34.1911 21.826 34.1911 21.5347 34.3443L10.8622 39.9551C10.1286 40.3408 9.27114 39.7178 9.41125 38.9009L11.4495 27.017C11.5051 26.6926 11.3976 26.3616 11.1619 26.1318L2.52771 17.7156C1.93419 17.137 2.2617 16.1291 3.08192 16.0099L15.0141 14.276C15.3398 14.2287 15.6214 14.0241 15.767 13.729L21.1033 2.9166Z" fill="#FBBF24" />
                      </g>
                      <defs>
                        <clipPath id="clip0_13624_2608">
                          <rect width="44" height="44" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  ))}
                </div>
                <p className="font-medium text-xl leading-8 text-gray-900 text-center">{countreviews} Ratings</p>
              </div>
            </div>

            {reviews.map((item, index) => (
              <div key={index} className="pt-11 pb-8 border-b border-gray-100 max-xl:max-w-2xl max-xl:mx-auto">
                <div className="flex items-center gap-3 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill={i < Math.floor(item.rate) ? "#FBBF24" : "#E5E7EB"}
                    >
                      <path d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z" />
                    </svg>
                  ))}
                </div>
                <div className="flex sm:items-center flex-col min-[400px]:flex-row justify-between gap-5 mb-4">
                  <div className="flex items-center gap-3">
                    <img src="https://pagedone.io/asset/uploads/1704349572.png" alt="User image" className="w-8 h-8 rounded-full object-cover" />
                    <h6 className="font-semibold text-lg leading-8 text-indigo-600">{item.user?.name || "Anonymous"}</h6>
                  </div>
                  <p className="font-normal text-lg leading-8 text-gray-400">{new Date(item.created_at).toLocaleDateString()}</p>
                </div>
                <p className="font-normal text-lg leading-8 text-gray-400 max-xl:text-justify">{item.comment || "No review comment provided."}</p>
              </div>
            ))}
          </div>
          <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Write a Review</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Star Rating */}
        <div>
          <p className="text-lg font-medium text-gray-700 mb-2">Rating:</p>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                onClick={() => handleRating(star)}
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 20 20"
                fill={star <= review.rating ? "#FBBF24" : "#E5E7EB"}
                className="cursor-pointer transition-all duration-200"
              >
                <path d="M9.049 2.927a1 1 0 011.902 0l1.358 3.657 3.898.564a1 1 0 01.554 1.705l-2.829 2.757.669 3.898a1 1 0 01-1.451 1.054L10 14.347l-3.501 1.845a1 1 0 01-1.451-1.054l.669-3.898-2.829-2.757a1 1 0 01.554-1.705l3.898-.564L9.049 2.927z" />
              </svg>
            ))}
          </div>
        </div>

        {/* Comment */}
        <textarea
          name="comment"
          placeholder="Write your review here..."
          value={review.comment}
          onChange={handleChange}
          required
          rows="4"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all"
        >
          Submit Review

          {loading ?(<svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
  </svg>):('')}
        </button>
      </form>
    </div>
        </div>
      </section>
    )
}

export default ReviewProduct;