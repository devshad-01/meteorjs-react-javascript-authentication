import {
    HomeOutlined,
    LoginOutlined,
    LogoutOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Space, Typography, message } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Meteor } from "meteor/meteor";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SITE_NAME } from "/imports/utils/constants";

const RouteRenderer = ({
    children,
    userId,
}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const items = [
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
                            message.success("Successfully logged out!");
                            navigate("/login");
                        });
                    },
                },
            ],
        });
    } else {
        items.push({
            key: "login",
            icon: <LoginOutlined />,
            label: "Login",
            onClick: () => navigate("/login"),
            style: { marginLeft: "auto" },
        });
    }

    // Only show navigation if we're not on login/signup pages
    const showNavigation = !["/login", "/signup"].includes(location.pathname);

    if (!showNavigation) {
        return <>{children}</>;
    }

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header style={{ display: "flex", alignItems: "center", padding: "0 24px" }}>
                <div style={{ display: "flex", alignItems: "center", marginRight: "auto" }}>
                    <img 
                        src="/icon.svg" 
                        alt="LocaLoot Logo" 
                        style={{ height: "32px", width: "32px", marginRight: "12px" }}
                    />
                    <Typography.Title level={4} style={{ color: "white", margin: 0 }}>
                        {SITE_NAME}
                    </Typography.Title>
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    items={items}
                    style={{ flex: 1, justifyContent: "flex-end", border: "none" }}
                />
            </Header>

            <Content style={{ padding: "24px" }}>{children}</Content>

            <Footer style={{ textAlign: "center" }}>
                {SITE_NAME} © {new Date().getFullYear()} - Built with Meteor.js & React
            </Footer>
        </Layout>
    );
};

export default RouteRenderer;
