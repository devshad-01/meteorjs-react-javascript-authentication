import { Typography, Card, Row, Col, Statistic, Button, Space } from "antd";
import { UserOutlined, ClockCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Meteor } from "meteor/meteor";
import React from "react";

interface DashboardProps {
    userId?: string | null;
}

const Dashboard: React.FC<DashboardProps> = ({ userId }) => {
    const user = Meteor.user();

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <Typography.Title level={2}>Dashboard</Typography.Title>
            
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                <Col xs={24} sm={8}>
                    <Card>
                        <Statistic
                            title="User ID"
                            value={userId || 'N/A'}
                            prefix={<UserOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card>
                        <Statistic
                            title="Account Created"
                            value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                            prefix={<ClockCircleOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card>
                        <Statistic
                            title="Status"
                            value="Active"
                            prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={16}>
                    <Card title="Account Information">
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <div>
                                <Typography.Text strong>Username: </Typography.Text>
                                <Typography.Text>{user?.username || 'Not set'}</Typography.Text>
                            </div>
                            <div>
                                <Typography.Text strong>Email: </Typography.Text>
                                <Typography.Text>{user?.emails?.[0]?.address || 'Not set'}</Typography.Text>
                            </div>
                            <div>
                                <Typography.Text strong>Email Verified: </Typography.Text>
                                <Typography.Text>{user?.emails?.[0]?.verified ? 'Yes' : 'No'}</Typography.Text>
                            </div>
                        </Space>
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card title="Quick Actions">
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Button type="primary" block>
                                Update Profile
                            </Button>
                            <Button block>
                                Change Password
                            </Button>
                            <Button block>
                                View Settings
                            </Button>
                        </Space>
                    </Card>
                </Col>
            </Row>

            <Card title="Welcome Message" style={{ marginTop: '24px' }}>
                <Typography.Paragraph>
                    Welcome to your dashboard! This is a demo application showcasing a complete 
                    authentication system built with Meteor.js, React, and TypeScript. 
                </Typography.Paragraph>
                <Typography.Paragraph>
                    You can extend this application by adding more features like:
                </Typography.Paragraph>
                <ul>
                    <li>User profile management</li>
                    <li>Real-time data synchronization</li>
                    <li>File uploads and management</li>
                    <li>Social features and messaging</li>
                    <li>Administrative tools</li>
                </ul>
            </Card>
        </div>
    );
};

export default Dashboard;
