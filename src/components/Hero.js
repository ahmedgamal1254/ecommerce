import Link from "next/link";

const HeroSection = () => {
    return (
      <section className="relative bg-cover bg-center h-[92vh] flex items-center justify-center" style={{ backgroundImage: "url('hero3.webp')"}}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
  
        {/* Content */}
        <div className="relative text-center text-white max-w-2xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Welcome to MyStore</h1>
          <p className="text-xl mb-8">
            Discover the best products at unbeatable prices. Shop now and enjoy a seamless shopping experience!
          </p>
          <Link href="/shop" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300">
            Shop Now
          </Link>
        </div>
      </section>
    );
  };
  
  export default HeroSection;