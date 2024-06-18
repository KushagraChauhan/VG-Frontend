import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PublicRoute = () => {
    const validateSession = () => {
        const token = localStorage.getItem('access_token');
        const user = localStorage.getItem('email');
    
        if (!token || !user) {
            return false;
        }
            return true;
        };
    
    return validateSession() ? <Navigate to="/home" replace /> : <Outlet />;
};

export default PublicRoute;
