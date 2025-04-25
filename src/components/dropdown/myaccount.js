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
        MyAccount
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
        Shop
      </Link>
    ),
    extra: '⌘P',
  }
];
const MyAccount = () => (
  <Dropdown menu={{ items }}>
    <a onClick={e => e.preventDefault()}>
      <Space>
        <FaUser />
        MyAccount
      </Space>
    </a>
  </Dropdown>
);
export default MyAccount;