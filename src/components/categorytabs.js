"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames";

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
    <div className="flex border rounded-md overflow-hidden rtl space-x-0 p-5 space-x-reverse">
      {categories.map((cat, index) => (
        <div
          key={cat.id}
          onClick={() => setActiveIndex(index)}
          className={classNames(
            "flex-1 p-4 text-center cursor-pointer transition-all duration-300",
            {
              "bg-gray-100 text-black shadow-md relative": index === activeIndex,
              "bg-white hover:bg-gray-100": index !== activeIndex,
            }
          )}
        >
          <img
            src={`${baseImageUrl}${cat.image}`}
            alt={cat.title}
            className="w-full mx-auto object-fit mb-2"
          />
          {/* <div className="font-medium">{cat.title}</div> */}
          {index === activeIndex && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-yellow-400" />
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryTabs;
