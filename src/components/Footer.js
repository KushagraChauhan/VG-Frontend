import React from "react";
import './css/Footer.css';

const Footer = () => {
    return(
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Vibe Gurukul</h5>
            <ul>
              <li><a href="/privacypolicy">Privacy Policy</a></li>
              <li><a href="/termsconditions">Terms and Conditions</a></li>
            </ul>
            <p>© 2024 Vibe Indian. All rights reserved.</p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul>
              <li><a href="/home">Home</a></li>
              <li><a href="/courses">Courses</a></li>
              <li><a href="/aboutus">About Us</a></li>
              <li><a href="#">Join Us</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>Have more topic suggestions?<br></br> Want to discuss with our team? <br></br>Want to join and vibe together? <br></br><strong>Oops! </strong>any mistakes done?</p>
            <p>Email: contact@vibeindian.in</p>
            {/* <p>Phone: +1 234 567 890</p> */}
          </div>
        </div>
      </div>
    </footer>
    );
};

export default Footer;