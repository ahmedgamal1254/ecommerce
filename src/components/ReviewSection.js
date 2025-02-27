"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MySwiper = () => {
  return (
    <div className="reviews py-12 bg-gray-50 mb-5">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Customer Reviews</h2>
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          <SwiperSlide>
            <div className="p-8 bg-white rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-yellow-400 text-4xl mb-4">⭐️⭐️⭐️⭐️⭐️</div>
              <p className="text-gray-700 mb-4">
                "This product is amazing! It exceeded all my expectations. Highly recommend!"
              </p>
              <p className="text-gray-600 font-semibold">- John Doe</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="p-8 bg-white rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-yellow-400 text-4xl mb-4">⭐️⭐️⭐️⭐️⭐️</div>
              <p className="text-gray-700 mb-4">
                "Excellent service and fast delivery. Will definitely buy again!"
              </p>
              <p className="text-gray-600 font-semibold">- Jane Smith</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="p-8 bg-white rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-yellow-400 text-4xl mb-4">⭐️⭐️⭐️⭐️⭐️</div>
              <p className="text-gray-700 mb-4">
                "The quality is top-notch. I'm very satisfied with my purchase."
              </p>
              <p className="text-gray-600 font-semibold">- Alex Johnson</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="p-8 bg-white rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-yellow-400 text-4xl mb-4">⭐️⭐️⭐️⭐️⭐️</div>
              <p className="text-gray-700 mb-4">
                "Great value for money. I love it!"
              </p>
              <p className="text-gray-600 font-semibold">- Sarah Lee</p>
            </div>
          </SwiperSlide>
        </Swiper>
        {/* Custom Navigation Buttons */}
      </div>
    </div>
  );
};

export default MySwiper;