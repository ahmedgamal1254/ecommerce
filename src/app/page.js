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
import SectionIntroWithImage from "@/components/parts/SectionIntroWithImage";
import PromoSplitSection from "@/components/parts/PromoSplitSection";

export default function Home() {
  return (
    <>
    {/* <HeroSection /> */}
    <HeroSlider />
    <CategoryTabs />
     <SectionIntroWithImage
        title="الأناقة تبدأ من هنا"
        subtitle="مجموعة مميزة من الملابس العصرية التي تناسب كل الأوقات"
        imageUrl="/img1.webp"
    />
    <Products title="منتجات مختارة" />
    <PromoOffer />
    <Products title="أكثر المنتجات مبيعا" />
    <PromoSplitSection
      title="هوديز تناسب كل الأذواق"
      subtitle="احصل على هودي يعبر عن شخصيتك بتصميم فريد وجودة عالية"
      buttonText="عرض المنتجات"
      buttonUrl="/shop/category/11"
      imageUrl="/slider/bg-2.webp"
      reverse
    />
    <Products title="أحدث منتجاتنا" />
    <FeaturesAndAbout />
    {/* <PromoOffer /> */}
    {/* <ContactUs /> */}
    </>
  );
}
