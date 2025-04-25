"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";

const baseImageUrl = "https://ecommerce.ahmedgamaldev.com/public/app/";

const CategoryTabs = () => {
  const [categories, setCategories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    axios
      .get("https://ecommerce.ahmedgamaldev.com/api/parent-categories")
      .then((res) => {
        if (res.data?.status === 200) {
          setCategories(res.data.data);
        }
      });
  }, []);

  return (
    <>
      {/* Mobile: Swiper */}
      <div className="md:hidden px-2">
        <Swiper spaceBetween={10} slidesPerView={1}>
          {categories.map((cat, index) => (
            <SwiperSlide key={cat.id}>
              <div
                onClick={() => setActiveIndex(index)}
                className={classNames(
                  "p-4 text-center cursor-pointer transition-all duration-300 relative rounded-md border",
                  {
                    "bg-gray-100 text-black shadow-md": index === activeIndex,
                    "bg-white hover:bg-gray-100": index !== activeIndex,
                  }
                )}
              >
                <Link href={`/shop/category/${cat.slug}`}>
                  <img
                    src={`${baseImageUrl}${cat.image}`}
                    alt={cat.title}
                    className="w-full h-300 object-contain mx-auto mb-2"
                  />
                </Link>
                {/* <div className="font-medium">{cat.title}</div> */}
                {index === activeIndex && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-yellow-400" />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop: Grid */}
      <div className="hidden md:grid md:grid-cols-6 border rounded-md overflow-hidden rtl p-5 gap-3">
        {categories.map((cat, index) => (
          <div
            key={cat.id}
            onClick={() => setActiveIndex(index)}
            className={classNames(
              "p-4 text-center cursor-pointer transition-all duration-300 relative",
              {
                "bg-gray-100 text-black shadow-md": index === activeIndex,
                "bg-white hover:bg-gray-100": index !== activeIndex,
              }
            )}
          >
            <Link href={`/shop/category/${cat.slug}`}>
              <img
                src={`${baseImageUrl}${cat.image}`}
                alt={cat.title}
                className="w-full h-30 object-contain mx-auto mb-2"
              />
            </Link>
            {index === activeIndex && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-yellow-400" />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryTabs;
