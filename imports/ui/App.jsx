import { LoadingOutlined } from "@ant-design/icons";
import { ConfigProvider, theme } from "antd";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "/imports/ui/HomePage";
import LoginPage from "/imports/ui/LoginPage";
import SignupPage from "/imports/ui/SignupPage";
import Dashboard from "/imports/ui/Dashboard";
import RouteRenderer from "/imports/ui/components/RouteRenderer";

export const App = () => {
    const userId = useTracker(() => Meteor.userId());

    // still loading data from backend
    if (userId === undefined) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <LoadingOutlined style={{ fontSize: 48 }} />
            </div>
        );
    }

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.defaultAlgorithm,
            }}
        >
            <Router>
                <Routes>
                    {/* Public routes - accessible when not logged in */}
                    <Route 
                        path="/login" 
                        element={
                            userId ? <Navigate to="/" replace /> : <LoginPage />
                        } 
                    />
                    <Route 
                        path="/signup" 
                        element={
                            userId ? <Navigate to="/" replace /> : <SignupPage />
                        } 
                    />
                    
                    {/* Protected routes - require authentication */}
                    <Route 
                        path="/dashboard" 
                        element={
                            userId ? (
                                <RouteRenderer userId={userId}>
                                    <Dashboard userId={userId} />
                                </RouteRenderer>
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        } 
                    />
                    
                    {/* Home route - accessible to all but shows different content */}
                    <Route 
                        path="/" 
                        element={
                            userId ? (
                                <RouteRenderer userId={userId}>
                                    <HomePage userId={userId} />
                                </RouteRenderer>
                            ) : (
                                <HomePage userId={userId} />
                            )
                        } 
                    />
                    
                    {/* Catch-all route */}
                    <Route 
                        path="*" 
                        element={
                            userId ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
                        } 
                    />
                </Routes>
            </Router>
        </ConfigProvider>
    );
};
