import React from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

// Function to handle user logout
const handleLogout = () => {
  // Remove user-related data from localStorage
  localStorage.removeItem('access_token');
  localStorage.removeItem('email');
  localStorage.removeItem('full_name');
  localStorage.removeItem('login_time');
};

// Header component for the application
const Header = () => {
  return (
    <header className="header">
      {/* Navigation bar */}
      <nav className="navbar navbar-expand-lg navbar-light">
        {/* Brand logo and name */}
        <a className="navbar-brand" href="/home">
          <img src='/vibeindian-logo.png' alt="Vibe Gurukul Logo" className="logo" />Vibe Gurukul
        </a>
        {/* Toggle button for mobile view */}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Navigation links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {/* Home link */}
            <li className="nav-item">
              <a className="nav-link" href="/home">Home</a>
            </li>
            {/* Courses link */}
            <li className="nav-item">
              <a className="nav-link" href="/courses">Courses</a>
            </li>
            {/* Workshops link */}
            <li className="nav-item">
              <a className="nav-link" href="/workshops">Workshops</a>
            </li>
            {/* Pledge link */}
            <li className="nav-item">
              <a className="nav-link" href="/pledge">Pledge</a>
            </li>
            {/* Profile link */}
            <li className="nav-item">
              <a className="nav-link" href="/profile">Profile</a>
            </li>
            {/* Cart link with an icon */}
            <li className='nav-item'>
              <Link className="btn btn-cart" to="/cart">
                <FontAwesomeIcon icon={faShoppingCart} /> Cart
              </Link>
            </li>
            {/* Sign Out button */}
            <li className="nav-item">
              <Link className="btn btn-primary" to="/" onClick={handleLogout}>Sign Out</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;