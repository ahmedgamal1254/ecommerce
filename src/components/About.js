import Link from "next/link";
import { FaShoppingBasket } from "react-icons/fa";

const FeaturesAndAbout = () => {
  return (
    <div className="container mx-auto px-6 lg:px-20 my-10" dir="rtl">
      
      {/* 🛍 قسم الميزات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white p-6 rounded-lg">
        <FeatureItem
          icon="🚚"
          title="توصيل مجاني"
          description="الطلبات لجميع المنتجات"
        />
        <FeatureItem
          icon="💲"
          title="الاسترجاع & الاسترداد"
          description="ضمان استرجاع الأموال"
        />
        <FeatureItem
          icon="🎟️"
          title="خصم للأعضاء"
          description="على كل طلب يزيد عن 5000.00 جنيه"
        />
        <FeatureItem
          icon="🎧"
          title="دعم على مدار الساعة"
          description="اتصل بنا على مدار اليوم"
        />
      </div>
  
      {/* ℹ️ قسم عن المتجر */}
      {/* <div className="mt-12 bg-gray-100 p-6 rounded-lg shadow flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 p-4">
          <h2 className="text-3xl font-bold mb-4">عن المتجر</h2>
          <p className="text-gray-600">
            نحن متجر إلكتروني رائد نقدم منتجات عالية الجودة بأسعار معقولة. مهمتنا هي ضمان رضا العملاء من خلال تقديم تجارب تسوق سلسة.
          </p>
          <p className="text-gray-600 mt-2">
            خدماتنا تشمل التوصيل السريع، استرجاع سهل، ودعم 24/7. انضم إلينا اليوم واستمتع بتجربة تسوق استثنائية!
          </p>
          <Link href="/shop" className="button-group text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            <FaShoppingBasket className="w-5 h-5" />
            <span>تسوق الآن</span>
          </Link>
        </div>
        <div className="md:w-1/2">
          <img
            src="./about.webp"
            alt="عن المتجر"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
      </div> */}
    </div>
  );
};

// 🏷 مكون العنصر القابل لإعادة الاستخدام
const FeatureItem = ({ icon, title, description }) => {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
      <span className="text-red-500 text-3xl">{icon}</span>
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default FeaturesAndAbout;
