import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS for styling
import './css/Cart.css'; // Importing custom CSS for additional styling
import LoadingSpinner from "./Loading"; // Importing a loading spinner component to show during data fetch

const Cart = () => {
    // State to store the cart items fetched from the API
    const [cartItems, setCartItems] = useState([]);
    
    // State to manage the loading state of the component
    const [loading, setLoading] = useState(true);
    
    // Hook to navigate programmatically
    const navigate = useNavigate();

    // Retrieve token and email from localStorage
    const token = localStorage.getItem('access_token');
    const email = localStorage.getItem('email');

    // Fetch cart items when the component mounts
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                // Fetch cart items from the server using the token for authentication
                const response = await axios.get(`https://dev.vibegurukul.in/api/v1/users/cart`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Update the cart items state with the fetched data
                setCartItems(response.data);
                setLoading(false);
            } catch (error) {
                // Handle errors during the fetch operation
                console.error('Error fetching cart items:', error);
                setLoading(false);
            }
        };

        // Only fetch cart items if the token is available
        if (token) {
            fetchCartItems();
        } else {
            setLoading(false);
        }
    }, [token]); // Dependency array includes token to refetch cart items if the token changes

    // Function to handle removing an item from the cart
    const handleRemoveItem = async (courseId) => {
        try {
            const response = await axios.post('https://dev.vibegurukul.in/api/v1/users/cart/remove',
                { course_id: courseId },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            // If the removal is successful, update the cart items state
            if (response.status === 200) {
                setCartItems(cartItems.filter(item => item.course_id !== courseId));
            }
        } catch (error) {
            // Handle errors during the item removal operation
            console.error('Error removing item from cart:', error);
        }
    };

    // Function to handle clearing all items from the cart
    const clearCart = async () => {
        try {
            const response = await axios.delete('https://dev.vibegurukul.in/api/v1/users/cart/clear',
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            // If the clear operation is successful, empty the cart items state
            if (response.status === 200) {
                setCartItems([]);
            }
        } catch (error) {
            // Handle errors during the clear cart operation
            console.error('Error clearing cart:', error);
        }
    };

    // Display a loading spinner if data is still being fetched
    if (loading) {
        return <LoadingSpinner />;
    }

    // Prompt the user to log in if no token or email is found
    if (!token || !email) {
        return <div className="container mt-4">Please log in to view your cart.</div>;
    }

    // Display a message if the cart is empty
    if (cartItems.length === 0) {
        return (
            <div className="cart-page container mt-4">
                <h1>Your cart is empty.</h1>
                <div className="go-to-course">
                    <a href="/courses">View Courses</a>
                </div>
            </div>
        );
    }

    // Function to calculate the total cost of the items in the cart
    const calculateTotal = (cartItems) => {
        return cartItems.reduce((total, cartItem) => total + parseFloat(cartItem.price), 0).toFixed(2);
    };

    // Function to calculate GST and total cost including GST
    const calculateGST = (cartItems, gstRate = 18) => {
        const total = calculateTotal(cartItems);
        const gstDetails = cartItems.map(item => calculateGSTForItem(item.price, gstRate));
        // Calculate total GST and course price excluding GST
        const totalGST = gstDetails.reduce((total, details) => total + parseFloat(details.gst), 0).toFixed(2);
        const totalCoursePriceExGST = gstDetails.reduce((total, details) => total + parseFloat(details.coursePrice), 0).toFixed(2);

        return {
            total,
            coursePriceExGST: totalCoursePriceExGST,
            gst: totalGST,
        };
    };

    // Function to calculate GST for an individual item
    const calculateGSTForItem = (coursePrice, gstRate = 18) => {
        const gstDecimal = gstRate / 100;
        const basePrice = coursePrice / (1 + gstDecimal);
        const gstAmount = coursePrice - basePrice;

        return {
            coursePrice: basePrice.toFixed(2),
            gst: gstAmount.toFixed(2),
        };
    };

    // Calculate the GST details for the cart items
    const gstDetails = calculateGST(cartItems);
    const { total, coursePriceExGST, gst } = gstDetails;

    // Extract course titles from the cart items
    const courseTitles = cartItems.map(item => item.course_title);

    // Handle the checkout process
    const handleCheckout = async () => {
        try {
            const courseIds = cartItems.map(item => item.course_id);
            const response = await axios.post('https://dev.vibegurukul.in/api/v1/payments/create-order', 
                {  
                    "amount": calculateTotal(cartItems),
                    "currency": "INR",
                    "course_id": courseIds
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            // If the order creation is successful, navigate to the payments page with the order details
            if (response.status === 200) {
                const { order_id } = response.data;
                const amount = calculateTotal(cartItems);
                const currency = "INR";
                const courseTitle = courseTitles;
                navigate('/payments', { state: { order_id, amount, currency, courseTitle } });
            } else {
                console.error('Error fetching order details:', response.status);
            }
        } catch (error) {
            // Handle errors during the checkout process
            console.error('Error fetching order details:', error);
        }
    };

    // Render the cart component
    return (
        <div className='cart-page'>
            <div className="container">
                <h1>Your cart</h1>
                <div className="row">
                    {/* Map through the cart items and render each item */}
                    {cartItems.map((item) => (
                        <div className="col-xl-8" key={item.course_id}>
                            <div className="card border shadow-none">
                                <div className="card-body">
                                    <div className="d-flex align-items-start border-bottom pb-3">
                                        <div className="me-4">
                                            <img src={item.preview_image} alt="Course-Preview-Image" className="avatar-lg rounded"></img>
                                        </div>
                                        <div className="flex-grow-1 align-self-center overflow-hidden">
                                            <div>
                                                <h5 className="text-truncate font-size-18">{item.course_title}</h5>
                                            </div>
                                        </div>                                        
                                    </div>
                                    <div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="mt-3">
                                                    <p className="text-muted mb-2">Price</p>
                                                    <h5>Rs. {item.price}</h5>
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="go-to-course">
                                                    <Link to={`/courses/${item.course_id}`}>View Course</Link>
                                                </div>
                                                <button className="btn btn-danger" onClick={() => handleRemoveItem(item.course_id)}>
                                                    Remove Item
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="col-xl-4">
                        <div className="mt-5 mt-lg-0">
                            <div className="card border shadow-none">
                                <div className="card-header bg-transparent border-bottom py-3 px-4">
                                    <h5 className="font-size-16 mb-0">Order Summary <span className="float-end"></span></h5>
                                </div>
                                <div className="card-body p-4 pt-2">
                                    <div className="table-responsive">
                                        <table className="table mb-0">
                                            <tbody>                                                
                                                <tr>
                                                    <th>Course Price:</th>
                                                    <td className="text-end">
                                                        <span className="fw-bold">
                                                        ₹ {coursePriceExGST}
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>GST @ 18%:</th>
                                                    <td className="text-end">
                                                        <span className="fw-bold">
                                                        ₹ {gst}
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr className="bg-light">
                                                    <th>Total:</th>
                                                    <td className="text-end">
                                                        <span className="fw-bold">
                                                        ₹ {total}
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="row my-4">
                                        <div className="col-sm-6">
                                            <a href="/courses" className="btn btn-link text-muted">
                                                <i className="mdi mdi-arrow-left me-1"></i> Back to courses 
                                            </a>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="text-sm-end mt-2 mt-sm-0">
                                                <button onClick={handleCheckout} className="btn btn-success">
                                                    <i className="mdi mdi-cart-outline me-1"></i> Checkout 
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <button className="btn btn-danger" onClick={() => clearCart()}>
                            Clear Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
