import React from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';

const handleLogout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('email');
};

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light">
        <a className="navbar-brand" href="/home">Vibe Gurukul</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/courses">Courses</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact</a>
            </li>    
            <li className="nav-item">
              <a className="nav-link" href="/profile">Profile</a>
            </li>     
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
