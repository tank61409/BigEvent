import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import {
  DatabaseOutlined,
  FileOutlined,
  HomeOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Home', '/', <HomeOutlined />),
  getItem('Category', '/category', <DatabaseOutlined />),
  getItem('User', '/user', <UserOutlined />  ),
  getItem('Setting', '9 ', <SettingOutlined />),
];

function MySider() {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div className="demo-logo-vertical" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={({ key }) => {
        navigate(key)
      }} />
    </Sider>
  )
}

export default MySider