import React, {useEffect, useState} from "react";
import './css/PrivacyPolicy.css';
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

const PrivacyPolicyPage = () => {
    const isAuthenticated = useAuth();
    return(  
    <div>
        {isAuthenticated ? <Header /> : <LPHeader />}
        <section className="privacy-policy">
        <h1>Privacy Policy</h1>
        <p>Effective Date: 15 July, 2024</p>

        <h2>1. Introduction</h2>
        <p>Welcome to Vibe Gurukul. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at support@vibeindian.in</p>

        <h2>2. Information We Collect</h2>
        <p>We collect personal information that you voluntarily provide to us when registering at the Website, expressing an interest in obtaining information about us or our products and services, when participating in activities on the Website (such as posting messages in our online forums or entering competitions, contests or giveaways) or otherwise contacting us.</p>
        <ul>
            <li>Name and Contact Data: We collect your first and last name, email address, postal address, phone number, and other similar contact data.</li>
            <li>Credentials: We collect passwords, password hints, and similar security information used for authentication and account access.</li>
            <li>Payment Data: We collect data necessary to process your payment if you make purchases, such as your payment instrument number (such as a credit card number), and the security code associated with your payment instrument.</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
        <ul>
            <li>To facilitate account creation and logon process.</li>
            <li>To send administrative information to you for business purposes, legal reasons, and/or possibly for contractual reasons.</li>
            <li>To fulfill and manage your orders, payments, returns, and exchanges made through the Website.</li>
            <li>To deliver targeted advertising to you for our business purposes and/or with your consent.</li>
        </ul>

        <h2>4. Sharing Your Information</h2>
        <p>We only share and disclose your information in the following situations:</p>
        <ul>
            <li>Compliance with Laws: We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
            <li>Business Transfers: We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
            <li>With Your Consent: We may disclose your personal information for any other purpose with your consent.</li>
        </ul>

        <h2>5. Security of Your Information</h2>
        <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

        <h2>6. Your Privacy Rights</h2>
        <p>In some regions (like the European Economic Area), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability. In certain circumstances, you may also have the right to object to the processing of your personal information.</p>

        <h2>7. Contact Us</h2>
        <p>If you have questions or comments about this policy, you may email us at support@vibeindian.in</p>

        </section>
        <Footer />
    </div>
    );
}

export default PrivacyPolicyPage;