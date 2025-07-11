import Link from "next/link";

const PromoOffer = () => {
  return (
    <section className="bg-gray-50 px-6 py-12 md:py-16">
      <div className="mx-auto max-w-screen-xl rounded-xl bg-white p-8 px-2 md:px-8 shadow-xl lg:grid lg:grid-cols-12 lg:gap-8 lg:p-12 xl:gap-16">
        {/* 👕 صورة المنتج */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <img
            className="h-56 w-96 sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-96 lg:w-96 rounded-lg shadow-lg object-cover"
            src="img1.webp" // صورة ملابس
            alt="ملابس"
          />
        </div>

        {/* 🛍️ تفاصيل العرض */}
        <div className="lg:col-span-7 mt-8 lg:mt-0 flex flex-col justify-center">
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl leading-tight">
            خصم <span className="text-blue-600">20%</span> اليوم على جميع الملابس <br />
            اختار من مجموعتنا الجديدة.
          </h1>
          <p className="mb-6 text-lg text-gray-600 leading-relaxed">
            تسوق الآن واستمتع بخصم حصري على الملابس الجديدة. عروض محدودة المدة، لا تفوت الفرصة!
          </p>
          <div className="flex justify-start items-center flex-wrap space-x-4">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-4 text-center text-lg font-semibold text-white hover:bg-blue-700 hover:shadow-lg transition duration-300 ease-in-out"
            >
              تسوق الآن
              <svg
                className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link
              href="/shop"
              className="inline-flex hidden md:block items-center justify-center rounded-lg border-2 border-blue-600 px-8 py-4 text-center text-lg font-semibold text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-lg transition duration-300 ease-in-out"
            >
              اعرف المزيد
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoOffer;
