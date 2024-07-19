import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Payments = () => {
    const location = useLocation();
    const { order_id, amount, currency } = location.state || {};

    useEffect(() => {
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

    const handlePayment = () => {
        // Check for missing payment details
        if (!order_id || !amount || !currency) {
            alert('Missing payment details');
            return;
        }
    
        // Configure Razorpay options
        const options = {
            key: "rzp_test_3B2QrsVggR08X2",
            amount: amount, // Amount in paise
            currency: currency,
            name: "Vibe Indian Pvt. Ltd.",
            description: "Test Transaction",
            image: 'vibeindian-logo.png',
            order_id: order_id, // Razorpay order_id
            handler: async function (response) {
                // This function runs when the payment is completed successfully
                try {
                    // Send payment details to your backend for verification
                    const res = await axios.post('http://127.0.0.1:8000/api/v1/payments/verify-payment', {
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature
                    });
    
                    // Check the response status
                    if (res.status === 200) {
                        alert('Payment successful and verified!');
                    } else {
                        alert('Payment verification failed.');
                    }
                } catch (error) {
                    console.error('Error verifying payment:', error);
                    alert('Payment verification failed.');
                }
            },
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9999999999"
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#3399cc"
            }
        };
    
        // Create a Razorpay instance and open the checkout
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };
    

    return (
        <div>
            <h1>Payments Page</h1>
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default Payments;
