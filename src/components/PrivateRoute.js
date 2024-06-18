import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const validateSession = () => {
    const token = localStorage.getItem('access_token');
    const user = localStorage.getItem('email');

    if (!token || !user) {
      return false;
    }
    return true;
  };

  return validateSession() ? <Outlet /> : <Navigate to="/welcome" replace />;
};

export default PrivateRoute;
