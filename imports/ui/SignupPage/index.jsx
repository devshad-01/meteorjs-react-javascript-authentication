import { emailRegex } from "@netsu/js-utils";
import { Button, Input, message, Space, Typography, Card } from "antd";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorResponse } from "/imports/utils/errors";
import LocaLootLogo from "/imports/ui/components/LocaLootLogo";

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    // display loader while creating account
    const [loggingIn, setLoggingIn] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const cleanedEmail = email.trim();
        const cleanedUsername = username.trim();

        if (!emailRegex.test(cleanedEmail)) {
            return message.error("Email is invalid");
        }

        if (password.length < 8) {
            return message.error("Password is too short");
        }

        if (password !== confirmPassword) {
            return message.error("Passwords do not match");
        }

        if (cleanedUsername.length < 3) {
            return message.error("Username is too short");
        }

        setLoggingIn(true);

        try {
            const options = {
                email: cleanedEmail,
                password: password,
                username: cleanedUsername,
            };

            await new Promise((resolve, reject) => {
                Accounts.createUser(options, (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            });

            // User is automatically logged in after successful account creation
            message.success("Account created successfully! Welcome!");
            navigate("/");
        } catch (error) {
            setLoggingIn(false);
            return errorResponse(error, "Could not create account");
        }
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
                        Create your account
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
                    <Input
                        addonBefore="@"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
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
                    <Input.Password
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
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
                        Sign Up
                    </Button>

                    <Typography style={{ textAlign: 'center' }}>
                        Already have an account?{" "}
                        <Button type="link" onClick={() => navigate("/login")}>
                            Login
                        </Button>
                    </Typography>
                </Space>
            </Card>
        </div>
    );
};

export default SignupPage;
