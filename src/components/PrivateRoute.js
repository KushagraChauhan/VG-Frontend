import React from 'react';
import {Navigate } from 'react-router-dom';
import Home from '../pages/Home';

const PrivateWrapper = ({ auth: { isAuthenticated } }) => {
    return isAuthenticated ? <Home /> : <Navigate to="/welcome" />;
  };

export default PrivateWrapper;
