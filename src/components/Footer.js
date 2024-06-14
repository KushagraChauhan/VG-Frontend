import React from "react";
import './Footer.css';

const Footer = () => {
    return(
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Vibe Gurukul</h5>
            <p>© 2024 Vibe Gurukul. All rights reserved.</p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Courses</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>Email: info@vibegurukul.com</p>
            <p>Phone: +1 234 567 890</p>
          </div>
        </div>
      </div>
    </footer>
    );
};

export default Footer;