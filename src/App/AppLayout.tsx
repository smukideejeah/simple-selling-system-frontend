import { BookOutlined, DashboardOutlined, LogoutOutlined, MoonOutlined, ProductOutlined, ShoppingCartOutlined, SunOutlined, TagOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme, type MenuProps } from "antd";
import useAuth from "../providers/auth/Auth.hook";
import { useNavigate } from "react-router";
import { Outlet } from "react-router";
import { useState } from "react";
import useTheme from "../providers/theme/theme.hook";

export default function AppLayout(){
    const [collapsed, setCollapsed] =  useState(false);
    const {logout, role} = useAuth();
    const navigate = useNavigate();
    const {darkMode, toggleDarkMode} = useTheme();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    type MenuItem = Required<MenuProps>['items'][number];
    const items: MenuItem[] = [
        {
            key: '/',
            icon: <DashboardOutlined onClick={() => setCollapsed(!collapsed)} />,
            label: 'Inicio', 
        },
        ...(role === "GESTOR" ? [{
                key: '/products',
                icon: <ProductOutlined />,
                label: 'Productos',
            },
            {
                key: '/discounts',
                icon: <TagOutlined />,
                label: 'Descuentos',
            }, {
                key: '/reports',
                icon: <BookOutlined />,
                label: 'Reportes',
            }] : []), 
        ...(role === "VENDEDOR" ? [{
                key: '/orders',
                icon: <ShoppingCartOutlined />,
                label: 'Ordenes',
            }] : []),
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Cerrar sesión',
            onClick: () => {
                logout();
                navigate('/login');
            }
        }
    ];



return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{background: colorBgContainer}} >
        <div className="demo-logo-vertical" />
        <Menu mode="inline" defaultSelectedKeys={['/']} items={items} onClick={(ev) => {
            if(ev.key !== 'logout') navigate(ev.key);
        }} />
      </Layout.Sider>
      <Layout>
        <Layout.Header style={{ padding: '0 0 0 15px', background: colorBgContainer }} >
            <Button type={"text"} onClick={toggleDarkMode} icon={darkMode ? <MoonOutlined /> : <SunOutlined />} size={"large"} />
        </Layout.Header>
        <Layout.Content style={{ margin: '16px 16px' }}>
          <div
            style={{
              padding: 24,
              minHeight: '100%',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>
          &copy;{new Date().getFullYear()} Created by Smukideejeah
        </Layout.Footer>
      </Layout>
    </Layout>
  );
}