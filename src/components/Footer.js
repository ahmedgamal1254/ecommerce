import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-10" dir="rtl">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* 🏪 قسم عن المتجر */}
          <div>
            <div className="bg-white rounded-xl w-64 p-5 mb-5">
              <Image src={"/logo.png"} alt={"weaver"} width={200} height={200} />
            </div>
            <h2 className="text-xl font-semibold mb-4">من نحن</h2>
            <p className="text-gray-400">
              نحن متجر إلكتروني نقدم أفضل المنتجات ذات الجودة العالية والتوصيل السريع.
            </p>
          </div>

          {/* 🔗 الروابط السريعة */}
          <div>
            <h2 className="text-xl font-semibold mb-4">الروابط السريعة</h2>
            <ul className="text-gray-400 space-y-2">
              <li><Link href="/shop" className="hover:text-gray-200">التسوق</Link></li>
              <li><Link href="/about" className="hover:text-gray-200">من نحن</Link></li>
              <li><Link href="/contact-us" className="hover:text-gray-200">اتصل بنا</Link></li>
              <li><Link href="/auth/register" className="hover:text-gray-200">التسجيل</Link></li>
              <li><Link href="/auth/login" className="hover:text-gray-200">تسجيل الدخول</Link></li>
              <li><Link href="/my-account" className="hover:text-gray-200">حسابي</Link></li>
            </ul>
          </div>

          {/* 📞 قسم الاتصال */}
          <div>
            <h2 className="text-xl font-semibold mb-4">اتصل بنا</h2>
            <p className="text-gray-400">البريد الإلكتروني: info@ahmedgamaldev.com</p>
            <p className="text-gray-400">الهاتف: +20 01091536978</p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* قسم حقوق الطبع والنشر */}
        <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
          © {new Date().getFullYear()} weaver جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
