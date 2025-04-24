
import { FaBars, FaWhatsapp } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';

const BelowHeader=() => {
    return (
        <>
            <div className="max-w-6xl mb-2 mx-auto px-4 hidden md:flex items-center justify-between bg-white py-2 rounded-lg mt-4 ">
            
                {/* Left: Categories Button */}
                <button className="w-60 padding-categories flex items-center justify-center gap-8 p-2 bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md">
                    <span className="mr-2">جميع الفئات</span>
                    <FaBars />
                </button>

                {/* Center: Search */}
                <div className="flex flex-1 mx-4 p-2 bg-gray-100 rounded-md overflow-hidden">
                    <input
                    type="text"
                    placeholder="ابحث عن منتج"
                    className="flex-grow px-4 py-2 bg-gray-100 focus:outline-none text-gray-700"
                    />
                    <select className="px-4 bg-gray-100 text-gray-700 border-l border-gray-300">
                        <option>الإلكترونيات</option>
                        <option>الملابس</option>
                        <option>الألعاب</option>
                    </select>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl flex items-center gap-1">
                        <AiOutlineSearch />
                        <span>بحث</span>
                    </button>
                </div>

                {/* Right: WhatsApp */}
                <div className="flex items-center bg-white border rounded-md px-3 py-2">
                    <FaWhatsapp className="text-green-600 text-xl mr-2" />
                    <div className="text-right">
                    <div className="text-xs text-gray-500">واتساب:</div>
                    <div className="font-bold text-black">+20 01091536978</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BelowHeader;
