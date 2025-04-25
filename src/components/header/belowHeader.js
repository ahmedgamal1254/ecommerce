"use client"
import { FaBars, FaWhatsapp } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import CatDropdown from '../dropdown/categories';
import CategoriesDropdown from '../dropdown/categories';
import { useEffect, useState } from 'react';
import axios from 'axios';

const BelowHeader=() => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
    axios
        .get("https://ecommerce.ahmedgamaldev.com/api/parent-categories")
        .then((res) => {
        if (res.data?.status === 200) {
            setCategories(res.data.data);
        }
        });
    }, []);
    
    return (
        <>
            <div className="max-w-6xl mb-2 mx-auto px-4 hidden md:flex items-center justify-between bg-white py-2 rounded-lg mt-4 ">
                <CategoriesDropdown />

                {/* Center: Search */}
                <div className="flex flex-1 mx-4 p-2 bg-gray-100 rounded-md overflow-hidden">
                    <input
                    type="text"
                    placeholder="ابحث عن منتج"
                    className="flex-grow px-4 py-2 bg-gray-100 focus:outline-none text-gray-700"
                    />
                    <select className="px-4 bg-gray-100 text-gray-700 border-l border-gray-300">
                        {
                            categories && categories.length > 0 ? (
                                categories.map((item, idx) => (
                                <option key={idx} value={item.id}>
                                    {item.title}
                                </option>
                                ))
                            ) : (
                                ""
                            )
                        }
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
