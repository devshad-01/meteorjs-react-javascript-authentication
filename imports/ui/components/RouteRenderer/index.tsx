import {
    HomeOutlined,
    LoginOutlined,
    LogoutOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Space, Typography } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { MenuItemType } from "antd/es/menu/interface";
import { Meteor } from "meteor/meteor";
import React from "react";
import { useLocation } from "wouter";
import { BasicSiteProps } from "/imports/ui/App";
import { SITE_NAME } from "/imports/utils/constants";
import { publicRoutes } from "/imports/utils/constants/routes";

interface RouteRendererProps extends BasicSiteProps {
    children: React.ReactNode;
}

interface RouteRenderMenuItem extends MenuItemType {
    label: string | React.JSX.Element;
}

const RouteRenderer: React.FC<RouteRendererProps> = ({
    children,
    userId,
}) => {
    const [location, navigate] = useLocation();

    const items: RouteRenderMenuItem[] = [
        {
            key: "home",
            icon: <HomeOutlined />,
            label: "Home",
            onClick: () => navigate("/"),
        },
    ];

    if (userId) {
        items.push({
            key: "user-menu",
            style: { marginLeft: "auto" },
            label: (
                <Space>
                    <UserOutlined />
                    <span>Account</span>
                </Space>
            ),
            children: [
                {
                    key: "logout",
                    icon: <LogoutOutlined />,
                    label: "Logout",
                    onClick: () => {
                        Meteor.logout(() => {
                            navigate("/login");
                        });
                    },
                },
            ],
        } as RouteRenderMenuItem);
    } else {
        items.push({
            key: "login",
            icon: <LoginOutlined />,
            label: "Login",
            onClick: () => navigate("/login"),
            style: { marginLeft: "auto" },
        } as RouteRenderMenuItem);
    }

    // Only show navigation if we're not on login/signup pages
    const showNavigation = !["/login", "/signup"].includes(location);

    if (!showNavigation) {
        return <>{children}</>;
    }

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header style={{ display: "flex", alignItems: "center", padding: "0 24px" }}>
                <Typography.Title level={4} style={{ color: "white", margin: 0, marginRight: "auto" }}>
                    {SITE_NAME}
                </Typography.Title>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    items={items}
                    style={{ flex: 1, justifyContent: "flex-end", border: "none" }}
                />
            </Header>

            <Content style={{ padding: "24px" }}>{children}</Content>

            <Footer style={{ textAlign: "center" }}>
                {SITE_NAME} © {new Date().getFullYear()} - Built with Meteor.js, React & TypeScript
            </Footer>
        </Layout>
    );
};

export default RouteRenderer;
