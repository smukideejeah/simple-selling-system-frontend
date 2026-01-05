import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, ProductOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme, Typography, type MenuProps } from "antd";
import useAuth from "../providers/auth/Auth.hook";
import { useNavigate } from "react-router";
import { Outlet } from "react-router";
import { useState } from "react";
import useTheme from "../providers/theme/theme.hook";
import { Header } from "antd/es/layout/layout";

export default function AppLayout(){
    const [collapsed, setCollapsed] =  useState(false);
    const {logout} = useAuth();
    const navigate = useNavigate();
    const {darkMode, toggleDarkMode} = useTheme();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    type MenuItem = Required<MenuProps>['items'][number];
    const items: MenuItem[] = [
        {
            key: '/products',
            icon: <ProductOutlined />,
            label: 'Productos',
        },{
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Cerrar sesión',
            onClick: () => {
                logout();
                navigate('/login');
            }
        }
    ];



    return <Layout hasSider>
        <Layout.Sider collapsed={collapsed} theme={darkMode ? "dark" : "light"} 
        style={{
            overflow: 'auto',
            height: '100vh',
            position: 'sticky',
            insetInlineStart: 0,
            top: 0,
            scrollbarWidth: 'thin',
            scrollbarGutter: 'stable',
        }}
        >
            <div className="demo-logo-vertical"> </div>
            <Menu
                inlineCollapsed={collapsed}
                onClick={({key}) => {
                    if(key == 'logout'){
                        logout();
                        navigate('/login');
                        return;
                    }
                    navigate(key);
                }}
                defaultSelectedKeys={['/products']}
                mode="inline"
                items={items}
                theme={darkMode ? "dark" : "light"}
            />
        </Layout.Sider>
        <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }}>
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
                />
            </Header>
            <Layout.Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <Outlet />
            </div>
            </Layout.Content>
            <Layout.Footer style={{ textAlign: 'center' }}>
                <Typography.Text type="secondary">
                    Hecho por smukideejeah <Button type="link" onClick={toggleDarkMode}>{darkMode ? 'Modo Claro' : 'Modo Oscuro'}</Button>
                </Typography.Text>
            </Layout.Footer>
        </Layout>
    </Layout>;
}