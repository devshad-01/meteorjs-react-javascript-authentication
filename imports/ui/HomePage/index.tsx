import { Typography, Button, Space, Card, Row, Col } from "antd";
import { UserOutlined, RocketOutlined, SecurityScanOutlined } from "@ant-design/icons";
import { Meteor } from "meteor/meteor";
import React from "react";
import { useLocation } from "wouter";

interface HomePageProps {
    userId?: string | null;
}

const HomePage: React.FC<HomePageProps> = ({ userId }) => {
    const [location, navigate] = useLocation();

    const handleLogout = () => {
        Meteor.logout(() => {
            navigate("/login");
        });
    };

    if (!userId) {
        return (
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <Typography.Title level={1} style={{ fontSize: '3.5rem', marginBottom: '20px' }}>
                        Welcome to Meteor App
                    </Typography.Title>
                    <Typography.Paragraph style={{ fontSize: '1.2rem', marginBottom: '40px' }}>
                        A modern full-stack application built with Meteor.js, React, TypeScript, and Ant Design.
                        Experience the power of real-time reactivity and modern web development.
                    </Typography.Paragraph>
                    <Space size="large">
                        <Button type="primary" size="large" onClick={() => navigate("/signup")}>
                            Get Started
                        </Button>
                        <Button size="large" onClick={() => navigate("/login")}>
                            Sign In
                        </Button>
                    </Space>
                </div>

                <Row gutter={[32, 32]} style={{ marginTop: '80px' }}>
                    <Col xs={24} sm={8}>
                        <Card style={{ textAlign: 'center', height: '100%' }}>
                            <RocketOutlined style={{ fontSize: '3rem', color: '#1890ff', marginBottom: '20px' }} />
                            <Typography.Title level={4}>Fast & Modern</Typography.Title>
                            <Typography.Paragraph>
                                Built with the latest technologies including React 18, TypeScript, and Meteor 3.0 
                                for optimal performance and developer experience.
                            </Typography.Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Card style={{ textAlign: 'center', height: '100%' }}>
                            <SecurityScanOutlined style={{ fontSize: '3rem', color: '#52c41a', marginBottom: '20px' }} />
                            <Typography.Title level={4}>Secure</Typography.Title>
                            <Typography.Paragraph>
                                Integrated authentication system with secure password handling and 
                                user management built on Meteor's accounts system.
                            </Typography.Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Card style={{ textAlign: 'center', height: '100%' }}>
                            <UserOutlined style={{ fontSize: '3rem', color: '#722ed1', marginBottom: '20px' }} />
                            <Typography.Title level={4}>User-Friendly</Typography.Title>
                            <Typography.Paragraph>
                                Clean and intuitive interface powered by Ant Design components 
                                providing a seamless user experience across all devices.
                            </Typography.Paragraph>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
            <Card style={{ textAlign: 'center' }}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <UserOutlined style={{ fontSize: '4rem', color: '#1890ff' }} />
                    <Typography.Title level={1}>Welcome back!</Typography.Title>
                    <Typography.Paragraph style={{ fontSize: '1.1rem' }}>
                        You are successfully logged in to your Meteor App account.
                        Your session is secure and all your data is synchronized in real-time.
                    </Typography.Paragraph>
                    <div style={{ background: '#f6f6f6', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
                        <Typography.Text strong>User ID: </Typography.Text>
                        <Typography.Text code>{userId}</Typography.Text>
                    </div>
                    <Space>
                        <Button type="primary" onClick={() => navigate("/dashboard")}>
                            Go to Dashboard
                        </Button>
                        <Button onClick={handleLogout}>
                            Logout
                        </Button>
                    </Space>
                </Space>
            </Card>
        </div>
    );
};

export default HomePage;
