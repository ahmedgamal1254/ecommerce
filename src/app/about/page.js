import FeaturesAndAbout from "@/components/About";
import Footer from "@/components/Footer";
import HeroSection from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";
import PromoOffer from "@/components/PromoSection";
import PromoSection from "@/components/PromoSection";
import ReviewsSection from "@/components/ReviewSection";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <FeaturesAndAbout />
    <PromoOffer />
    <ReviewsSection />
    </>
  );
}