"use client";

import React, { useState } from "react";
import { Carousel, Button } from "antd";
import { motion } from "framer-motion";
import Link from "next/link";

const slides = [
  {
    image: "/slider/img1.webp",
    title: "مرحبًا بكم في متجرنا",
    text: "أفضل المنتجات بين يديك",
    button: "تسوق الآن",
    path:"/shop"
  },
  {
    image: "/slider/img2.webp",
    title: "اكتشف مجموعاتنا الجديدة",
    text: "تحديثات يومية وعروض مميزة",
    button: "استعرض المنتجات",
    path:"/shop"
  },
  {
    image: "/slider/img1.webp",
    title: "توصيل سريع وآمن",
    text: "من الباب إلى الباب في وقت قياسي",
    button: "تعرف أكثر",
    path:"/about"
  },
];

const fadeUp = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.8, ease: "easeInOut" },
};

const fadeDown = {
  initial: { y: -200, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.8, ease: "easeInOut" },
};

const fadeLeft = {
  initial: { x: -200, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.8, ease: "easeInOut" },
};

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Update current slide index after carousel changes
  const handleAfterChange = (current) => {
    setCurrentSlide(current);
  };

  return (
    <div className="">
      <Carousel
        arrows
        infinite
        autoplay
        dotPosition="right"
        afterChange={handleAfterChange} // Track slide changes
      >
        {slides.map((slide, index) => (
          <div key={index}>
            <motion.div
              key={currentSlide} // Force re-render on slide change
              style={{
                backgroundImage: `url(${slide.image})`,
                height: "600px",
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                gap: "12px",
              }}
            >
              <motion.h1 className="text-5xl font-bold mb-4" {...fadeUp}>
                {slide.title}
              </motion.h1>
              <motion.p className="text-xl mb-8" {...fadeUp}>
                {slide.text}
              </motion.p>
              <motion.div {...fadeDown}>
                <Link href={slide.path} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" size="large">
                  {slide.button}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroSlider;