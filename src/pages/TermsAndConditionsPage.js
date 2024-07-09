import React, {useEffect, useState} from 'react';
import './css/TermsAndConditions.css';
import Header from '../components/Header';
import LPHeader from '../components/LPHeader';
import Footer from "../components/Footer";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(() => {
      const token = localStorage.getItem('access_token');
      const email = localStorage.getItem('email');
      if (token && email) {
        setIsAuthenticated(true);
      }
    }, []);
  
    return isAuthenticated;
  };

const TermsAndConditionsPage = () => {
const isAuthenticated = useAuth();
  return (
    <div>
        {isAuthenticated ? <Header /> : <LPHeader />}
        <section className="terms-container">
        <h1>Terms and Conditions</h1>
        <p>Welcome to Vibe Gurukul!</p>
        <p>These terms and conditions outline the rules and regulations for the use of Vibe Gurukul's Website, located at vibegurukul.com</p>
        <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Vibe Gurukul if you do not agree to take all of the terms and conditions stated on this page.</p>

        <h2>Cookies</h2>
        <p>We employ the use of cookies. By accessing Vibe Gurukul, you agreed to use cookies in agreement with the Vibe Gurukul's Privacy Policy.</p>

        <h2>License</h2>
        <p>Unless otherwise stated, Vibe Gurukul and/or its licensors own the intellectual property rights for all material on Vibe Gurukul. All intellectual property rights are reserved. You may access this from Vibe Gurukul for your own personal use subjected to restrictions set in these terms and conditions.</p>

        <h2>Content Liability</h2>
        <p>We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website.</p>

        <h2>Reservation of Rights</h2>
        <p>We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request.</p>

        <h2>Removal of links from our website</h2>
        <p>If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.</p>

        <h2>Disclaimer</h2>
        <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website.</p>

        <h2>Changes to these Terms and Conditions</h2>
        <p>We may update our Terms and Conditions from time to time. We will notify you of any changes by posting the new Terms and Conditions on this page.</p>

        <p>These terms and conditions were last updated on 15 July, 2024.</p>
        </section>
        <Footer />
    </div>
  );
};

export default TermsAndConditionsPage;
