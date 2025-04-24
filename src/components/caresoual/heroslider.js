"use client";

import React, { useState } from "react";
import { Carousel, Button } from "antd";
import { motion } from "framer-motion";

const slides = [
  {
    image: "/slider/img1.webp",
    title: "مرحبًا بكم في متجرنا",
    text: "أفضل المنتجات بين يديك",
    button: "تسوق الآن",
  },
  {
    image: "/slider/img2.webp",
    title: "اكتشف مجموعاتنا الجديدة",
    text: "تحديثات يومية وعروض مميزة",
    button: "استعرض المنتجات",
  },
  {
    image: "/slider/img1.webp",
    title: "توصيل سريع وآمن",
    text: "من الباب إلى الباب في وقت قياسي",
    button: "تعرف أكثر",
  },
];

const fadeUp = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
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
              <motion.div {...fadeUp}>
                <Button type="primary" size="large">
                  {slide.button}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroSlider;