import React from 'react';
import { DownOutlined, SettingOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { FaUser, FaUserAlt, FaUserAltSlash, FaUserCircle } from 'react-icons/fa';
const items = [
  {
    key: '1',
    label: 'My Account',
  },
  {
    type: 'divider',
  },
  {
    key: '2',
    label: 'Profile',
    extra: '⌘P',
  },
  {
    key: '3',
    label: 'Billing',
    extra: '⌘B',
  },
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