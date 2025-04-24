import React from 'react';
import { DownOutlined, SettingOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { FaUser, FaUserAlt, FaUserAltSlash, FaUserCircle } from 'react-icons/fa';
const items = [
  {
    key: '1',
    label: 'Register',
    path: '/auth/register'
  },
  {
    key: '3',
    label: 'Login',
    path: '/auth/login'
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