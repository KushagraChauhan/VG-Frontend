import React, {useState,useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import axios from 'axios';
import LoadingSpinner from "./Loading";
import './css/Payments.css';

const Payments = () => {
    const location = useLocation();
    const { order_id, amount, currency, courseTitle } = location.state || {};
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [mobile, setMobile] = useState('');

    const token = localStorage.getItem('access_token');
    const email = localStorage.getItem('email');

    useEffect(() => {
        setIsLoading(false);
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => {
            console.log("Razorpay script loaded");
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleNameChange = (event) => {
        setFullName(event.target.value);
      };
      const handleMobileChange = (value) => {
        setMobile(value);
    };

    const handlePayment = () => {
        
        // Check for missing payment details
        if (!order_id || !amount || !currency || !courseTitle) {
            alert('Missing payment details');
            return;
        }
  
        // Configure Razorpay options
        const options = {
            key: "rzp_live_gYA13dbogY6Ai7",
            amount: amount, // Amount in paise
            currency: currency,
            name: "Vibe Indian Pvt. Ltd.",
            description: "Course Transaction",
            image: 'vibeindian-logo.png',
            order_id: order_id, // Razorpay order_id
            handler: async function (response) {
                setIsLoading(true);
                // This function runs when the payment is completed successfully
                try {
                    // Send payment details to your backend for verification
                    const res = await axios.post('https://dev.vibegurukul.in/api/v1/payments/verify-payment', {
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature
                    });
    
                    // Check the response status
                    if (res.status === 200) {
                        // alert('Payment successful and verified!');
                        await clearCart();
                        navigate('/cart');
                        
                    } else {
                        alert('Payment verification failed.');
                        navigate('/cart');
                    }
                } catch (error) {
                    console.error('Error verifying payment:', error);
                    alert('Payment verification failed.');
                    setIsLoading(false);
                    navigate('/cart');
                } finally {
                    setIsLoading(false);
                }
            },
            prefill: {
                name: fullName,
                email: email,
                contact: mobile
            },
            notes: {
                address: "VIBE INDIAN PRIVATE LIMITED, C/O Shakuntla D, near D.C. Office, Solan, Solan(T), Solan - 173212, Himachal Pradesh"
            },
            theme: {
                color: "#3399cc"
            }
        };
    
        // Create a Razorpay instance and open the checkout
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    const clearCart = async () => {
        try {
            const response = await axios.delete('https://dev.vibegurukul.in/api/v1/users/cart/clear',
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            if (response.status === 200) {
                console.log('Cart Cleared');
            }
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    }
    
    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="payments-container">          
            <div className="container-fluid">
                <div className="row d-flex justify-content-center">
                    <div className="col-sm-12">
                        <div className="payment-card mx-auto">
                            <p className="heading-payment">PAYMENT DETAILS</p>
                            <form className="payment-details">             
                                <div className="form-group">
                                    <p className="text-warning mb-0">Mobile Number</p> 
                                    <PhoneInput
                                        country={'in'}
                                        value={mobile}
                                        onChange={handleMobileChange}
                                        inputClass="form-control"
                                        inputProps={{
                                            name: 'mobile',
                                            required: true,
                                            autoFocus: true
                                        }}
                                        required
                                    />
                                    <p className="text-warning mb-0">Email Address</p> 
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        readOnly
                                    />
                                </div>                           
                            </form>
                            <button className="payments-button" onClick={handlePayment}>Pay Now: ₹{amount}</button>
                            <p style={{ color: '#3399cc' }}>
                                Powered by 
                                <img 
                                    src="icons/razorpay.svg" 
                                    alt="Razorpay" 
                                    style={{ height: '20px', marginLeft: '5px' }} 
                                />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payments;
