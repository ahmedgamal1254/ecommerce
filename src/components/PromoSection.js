import Link from "next/link";

const PromoOffer = () => {
  return (
    <section className="bg-gray-50 px-4 py-12 md:py-16">
      <div className="mx-auto max-w-screen-xl rounded-lg bg-white p-6 shadow-lg md:p-8 lg:grid lg:grid-cols-12 lg:gap-8 lg:p-12 xl:gap-16">
        {/* 🖥️ Product Image */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <img
            className="h-56 w-56 sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-96 lg:w-96"
            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-components.svg"
            alt="iMac"
          />
        </div>

        {/* 🛒 Offer Details */}
        <div className="lg:col-span-7 mt-8 lg:mt-0">
          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
            Save <span className="text-blue-600">$500</span> today on your purchase <br />
            of a new <span className="text-blue-600">iMac computer</span>.
          </h1>
          <p className="mb-6 text-lg text-gray-600">
            Reserve your new Apple iMac 27” today and enjoy exclusive savings with qualified activation.
            Pre-order now to secure your discount.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-4 text-center text-lg font-semibold text-white hover:bg-blue-700 transition-colors duration-300"
          >
            Pre-order now
            <svg
              className="ml-2 h-5 w-5"
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
        </div>
      </div>
    </section>
  );
};

export default PromoOffer;