import { Drawer, Button } from "antd";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import {
  FaShoppingCart,
  FaHeart,
  FaFirstOrderAlt,
  FaInfoCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { useState } from "react";

export default function AccountDrawer({ activeTab, setActiveTab, handleLogout }) {
  const [open, setOpen] = useState(false);

  const showDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <div>

    </div>
  );
}
