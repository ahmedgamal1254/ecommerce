import React from 'react';
import { DownOutlined, SettingOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { FaUser, FaUserAlt, FaUserAltSlash, FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
const items = [
  {
    key: '1',
    label: (
      <Link href={"/my-account"}>
        حسابى
      </Link>
    ),
  },
  {
    type: 'divider',
  },
  {
    key: '2',
    label: (
      <Link href={"/shop"}>
      المتجر
      </Link>
    ),
    extra: '⌘P',
  }
];
const MyAccount = () => (
  <Dropdown menu={{ items }}>
    <a onClick={e => e.preventDefault()}>
      <Space>
        <span className='flex items-center gap-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>
         
          <FaUser />
          حسابى
        </span>
      </Space>
    </a>
  </Dropdown>
);
export default MyAccount;