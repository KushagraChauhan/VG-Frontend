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
        <section className="privacy-policy" style={{ fontFamily: 'Roboto, sans-serif' }}>
        <h1>Privacy Policy</h1>
        <p>Last Updated: 06 September, 2024</p>

        <h4>1. Introduction</h4>
        <p>Welcome to Vibe Gurukul. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at contact@vibeindian.in</p>

        <h4>2. Information We Collect</h4>
        <p>We collect personal information that you voluntarily provide to us when registering at the Website, expressing an interest in obtaining information about us or our products and services, when participating in activities on the Website (such as posting messages in our online forums or entering competitions, contests or giveaways) or otherwise contacting us.</p>
        <ul>
            <li>Name and Contact Data: We collect your first and last name, email address, postal address, phone number, and other similar contact data.</li>
            <li>Credentials: We collect passwords, password hints, and similar security information used for authentication and account access.</li>
            <li>Payment Data: We collect data necessary to process your payment if you make purchases, such as your payment instrument number (such as a credit card number), and the security code associated with your payment instrument.</li>
        </ul>

        <h4>3. How We Use Your Information</h4>
        <p>We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
        <ul>
            <li>To facilitate account creation and logon process.</li>
            <li>To send administrative information to you for business purposes, legal reasons, and/or possibly for contractual reasons.</li>
            <li>To fulfill and manage your orders, payments, returns, and exchanges made through the Website.</li>
            <li>To deliver targeted advertising to you for our business purposes and/or with your consent.</li>
        </ul>

        <h4>4. Sharing Your Information</h4>
        <p>We only share and disclose your information in the following situations:</p>
        <ul>
            <li>Compliance with Laws: We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
            <li>Business Transfers: We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
            <li>With Your Consent: We may disclose your personal information for any other purpose with your consent.</li>
        </ul>

        <h4>5. Security of Your Information</h4>
        <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

        <h4>6. Your Privacy Rights</h4>
        <p>In some regions (like the European Economic Area), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability. In certain circumstances, you may also have the right to object to the processing of your personal information.</p>

        <h4>7. Refund Policy </h4>
        <ul>
          <li><strong>Course Fees</strong>
            <ul>
              <li>Refunds will only be provided under the following conditions:</li>
              <li>If you cancel your enrollment within 7 days of purchase and have not accessed or downloaded any course materials, you are eligible for a full refund.</li>
              <li>If you have accessed the course or downloaded any materials, no refunds will be issued.</li>
            </ul>
          </li>

          <li><strong>Technical Issues</strong>
            <ul>
              <li>If you experience technical difficulties that prevent you from accessing the course, we will provide technical support to resolve the issue. If the problem persists and remains unresolved after 7 days, you may request a refund, which will be processed on a case-by-case basis.</li>
            </ul>
          </li>

          <li><strong>Duplicate Payment</strong>
            <ul>
              <li>In the event of accidental duplicate payments, please contact us immediately. Upon verification, we will refund the duplicate charge.</li>
            </ul>
          </li>

          <li><strong>Non-Refundable Services</strong>
            <ul>
              <li>Please note that certain services, such as live workshops, events, and one-on-one sessions, are non-refundable once booked.</li>
            </ul>
          </li>
        </ul>

        <h4>8. Cancellation Policy</h4>
        <ul>
          <li><strong>Course Cancellations</strong>
            <ul>
              <li>You may cancel your course enrollment within 7 days of purchase for a full refund, provided you have not accessed or downloaded any course materials. Cancellations made after this period or after accessing materials will not be eligible for a refund.</li>
            </ul>
          </li>

          <li><strong>Subscription Services</strong>
            <ul>
              <li>If you have subscribed to a recurring service or membership, you can cancel your subscription at any time. Upon cancellation, you will continue to have access to the service until the end of the current billing cycle. No refunds will be issued for any unused portion of the subscription.</li>
            </ul>
          </li>

          <li><strong>Course Modifications or Cancellations by VIBE GURUKUL</strong>
            <ul>
              <li>In the unlikely event that we need to cancel or significantly modify a course you have purchased, you will be notified and offered a full refund or the option to transfer your enrollment to another course of equal value.</li>
            </ul>
          </li>
        </ul>

        <h4>How to Request a Refund or Cancellation</h4>
        <p>
          To request a refund or cancel your enrollment, please contact our support team at 
          <a href="mailto:contact@vibeindian.in"> contact@vibeindian.in</a> with your order details and the reason for your request. We will process your request within 7-10 business days.
        </p>

        <h4>9. Contact Us</h4>
        <p>If you have questions or comments about this policy, you may email us at contact@vibeindian.in</p>

        <h4>10. Our address:</h4>
        <p>VIBE INDIAN PRIVATE LIMITED <br></br>
        C/O Shakuntla D, near D.C. Office <br></br>
        Solan, Solan(T) <br></br>
        Solan - 173212 <br></br>
        Himachal Pradesh</p>

        </section>
        <Footer />
    </div>
    );
}

export default PrivacyPolicyPage;