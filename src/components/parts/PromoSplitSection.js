import Link from "next/link";

const PromoSplitSection = ({ title, subtitle, buttonText, imageUrl,buttonUrl, reverse }) => {
  return (
    <section className="bg-gray-50 py-12 px-4 rounded-2xl my-16 shadow-sm">
      <div
        className={`flex flex-col-reverse md:flex-row items-center gap-10 max-w-6xl mx-auto ${
          reverse ? 'md:flex-row-reverse' : ''
        }`}
      >
        {/* Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-right">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 leading-snug">
            {title}
          </h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">{subtitle}</p>
          <Link href={buttonUrl} className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-md">
            {buttonText}
          </Link>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src={imageUrl}
            alt="promo"
            className="w-full h-[280px] md:h-[400px] object-cover rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default PromoSplitSection;
