import React from 'react';
import { DownOutlined, SettingOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { FaUser, FaUserAlt, FaUserAltSlash, FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
const items = [
  {
    key: '1',
    label: (<Link href={"/auth/register"}>
      MyAccount
    </Link>),
  },
  {
    key: '3',
    label: (<Link href={"/auth/login"}>
      MyAccount
    </Link>),
  },
];
const Register = () => (
  <Dropdown menu={{ items }}>
    <a onClick={e => e.preventDefault()}>
      <Space>
        <FaUser />
        Register
      </Space>
    </a>
  </Dropdown>
);
export default Register;