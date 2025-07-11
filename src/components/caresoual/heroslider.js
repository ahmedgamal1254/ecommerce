"use client";

import React, { useState } from "react";
import { Carousel } from "antd";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    image: "/slider/bg-2.webp",
    title: "مرحبًا بكم في متجرنا",
    text: "تحديثات يومية وعروض مميزة",
    button: "تسوق الآن",
    path: "/shop",
    align: "right",
  },
  {
    image: "/slider/img1.webp",
    title: "مجموعاتنا الجديدة",
    text: "أناقة لا تضاهى في كل موسم",
    button: "استعرض المنتجات",
    path: "/shop",
    align: "center",
  },
  {
    image: "/slider/img1.webp",
    title: "توصيل سريع وآمن",
    text: "من الباب إلى الباب في وقت قياسي",
    button: "تعرف أكثر",
    path: "/about",
    align: "center",
  },
];

const fadeUp = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleAfterChange = (current) => {
    setCurrentSlide(current);
  };

  return (
    <div className="relative">
      <Carousel
        arrows
        infinite
        autoplay
        dotPosition="right"
        afterChange={handleAfterChange}
      >
        {slides.map((slide, index) => {
          // Determine alignment classes
          const alignment =
            slide.align === "left"
              ? "items-start text-left"
              : slide.align === "right"
              ? "items-end text-right"
              : "items-center text-center";

          return (
            <div key={index}>
              <motion.div
                key={currentSlide}
                className={`relative flex h-[600px] md:h-[700px] text-white justify-center`}
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50" />

                {/* Slide Content */}
                <motion.div
                  className={`relative z-10 flex flex-col justify-center gap-6 max-w-4xl w-full h-full px-6 ${alignment}`}
                  initial="initial"
                  animate="animate"
                  variants={fadeUp}
                >
                  <motion.h1
                    className="text-4xl md:text-6xl font-bold"
                    {...fadeUp}
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.p
                    className="text-xl md:text-2xl text-gray-200"
                    {...fadeUp}
                  >
                    {slide.text}
                  </motion.p>

                  <motion.div {...fadeUp}>
                    <Link
                      href={slide.path}
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-base font-medium transition-all shadow-lg"
                    >
                      {slide.button}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default HeroSlider;
