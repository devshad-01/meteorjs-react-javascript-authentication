import { emailRegex } from "@netsu/js-utils";
import { Button, Input, message, Space, Typography, Card } from "antd";
import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorResponse } from "/imports/utils/errors";
import LocaLootLogo from "/imports/ui/components/LocaLootLogo";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // display loader while logging in
    const [loggingIn, setLoggingIn] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const cleanedEmail = email.trim();

        if (!emailRegex.test(cleanedEmail)) {
            return message.error("Email is invalid");
        }

        if (password.length < 8) {
            return message.error("Password is too short");
        }

        setLoggingIn(true);

        Meteor.loginWithPassword(cleanedEmail, password, (error) => {
            setLoggingIn(false);

            if (error) {
                return errorResponse(error, "Could not log in");
            }

            message.success("Successfully logged in!");
            navigate("/");
        });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px' }}>
            <Card style={{ width: '100%', maxWidth: 400 }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                    <LocaLootLogo width={250} height={100} style={{ marginBottom: '20px' }} />
                    
                    <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
                        Sign in to your account
                    </Typography.Title>

                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        type="email"
                        size="large"
                        onKeyPress={handleKeyPress}
                        disabled={loggingIn}
                    />
                    <Input.Password
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        size="large"
                        onKeyPress={handleKeyPress}
                        disabled={loggingIn}
                    />

                    <Button 
                        type="primary" 
                        onClick={handleSubmit} 
                        loading={loggingIn}
                        size="large"
                        style={{ width: '100%' }}
                    >
                        Log In
                    </Button>

                    <Typography style={{ textAlign: 'center' }}>
                        Don't have an account?{" "}
                        <Button type="link" onClick={() => navigate("/signup")}>
                            Create one
                        </Button>
                    </Typography>
                </Space>
            </Card>
        </div>
    );
};

export default LoginPage;
