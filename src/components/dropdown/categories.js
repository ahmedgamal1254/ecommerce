"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dropdown, Space } from 'antd';
import { FaBars } from 'react-icons/fa';
import * as Icons from 'react-icons/fa';
import Link from 'next/link';

const CategoriesDropdown = () => {
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

  const items = categories.map((category) => {
    const IconComponent = Icons.FaShoppingBag; // fallback للأيقونة الافتراضية
    return {
      key: category.id,
      label: (
        <Link href={"/shop/category/"+category.slug}>
            <div className="flex items-center gap-2">
                <span className='w-full text-gray-600 rounded-md'>{category.title}</span>
            </div>
        </Link>
      ),
    };
  });

  return (
    <Dropdown
      menu={{ items }}
      trigger={['click']}
      placement="bottomRight"
    >
      <button className="w-60 padding-categories flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-700 transition-all">
        <Space>
          <span className="mr-2">جميع الفئات</span>
          <FaBars />
        </Space>
      </button>
    </Dropdown>
  );
};

export default CategoriesDropdown;
