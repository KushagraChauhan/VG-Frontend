import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginOrRegisterPage from './pages/LoginOrRegisterPage';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public Routes to pages */}
          <Route path="/" element={<PublicRoute />}>
            <Route path = "/" element = {<LandingPage />}></Route>
            <Route path = "/welcome" element = {<LoginOrRegisterPage />} ></Route>
            <Route path='/login' element = {<LoginPage />}></Route>
            <Route path='/register' element = {<RegisterPage />}></Route>
          </Route>
          {/* Private Route to Home */}
          <Route path="/" element={<PrivateRoute />}>
          <Route path="home" element={<Home />} />
          </Route>
          {/* <Navigate from='/' to='/home' /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
