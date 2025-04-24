import FeaturesAndAbout from "@/components/About";
import ContactUs from "@/components/contact";
import Footer from "@/components/Footer";
import HeroSection from "@/components/Hero";
import Navbar from "@/components/header/Navbar";
import Products from "@/components/Products";
import PromoOffer from "@/components/PromoSection";
import PromoSection from "@/components/PromoSection";
import ReviewsSection from "@/components/ReviewSection";
import Image from "next/image";
import HeroSlider from "@/components/caresoual/heroslider";
import CategoryTabs from "@/components/categorytabs";

export default function Home() {
  return (
    <>
    {/* <HeroSection /> */}
    <HeroSlider />
    <CategoryTabs />
    <Products />
    <FeaturesAndAbout />
    {/* <PromoOffer /> */}
    {/* <ContactUs /> */}
    </>
  );
}
