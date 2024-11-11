import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import Sidebar from "./Sidebar";
import './Dash.css';

// Helper function to check token expiration
const isTokenExpired = (token) => {
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds
        return decodedToken.exp < currentTime;
    } catch (error) {
        return true; // If there's an error decoding, assume the token is invalid
    }
};

const Dash = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const validateToken = () => {
            const token = Cookies.get('token');
            
            // Debug log - remove in production
            console.log('Current token:', token);

            if (!token) {
                console.log('No token found');
                navigate('/');
                return;
            }

            // Check if token is expired
            if (isTokenExpired(token)) {
                console.log('Token expired');
                Cookies.remove('token'); // Clean up expired token
                navigate('/');
                return;
            }

            try {
                const decoded = jwtDecode(token);
                if (decoded.role === 'admin') {
                    setIsAdmin(true);
                    setIsLoading(false);
                } else {
                    console.log('User is not admin');
                    navigate('/');
                }
            } catch (error) {
                console.error('Token validation error:', error);
                Cookies.remove('token'); // Clean up invalid token
                navigate('/');
            }
        };

        validateToken();

        // Set up periodic token validation (every 5 minutes)
        const tokenCheckInterval = setInterval(validateToken, 5 * 60 * 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(tokenCheckInterval);
    }, [navigate]);

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className="loading">
                Loading...
            </div>
        );
    }

    // Only render dashboard if user is authenticated admin
    if (!isAdmin) {
        return null;
    }

    return (
        <div className="dashboard">
            <div className="sidebar-container">
                <Sidebar />
            </div>
            <div className="dashboard-content">
                <h1>Dashboard</h1>
                <p>This is the admin dashboard.</p>
            </div>
        </div>
    );
};

export default Dash;