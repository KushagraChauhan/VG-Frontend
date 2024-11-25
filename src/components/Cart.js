import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS for styling
import './css/Cart.css'; // Importing custom CSS for additional styling
import LoadingSpinner from "./Loading"; // Importing a loading spinner component to show during data fetch
import LoginRegisterModal from './modal/LoginRegisterModal';

const Cart = () => {
    // State to store the cart items fetched from the API
    const [cartItems, setCartItems] = useState([]);
    
    // State to manage the loading state of the component
    const [loading, setLoading] = useState(true);
    
    // State to show the login modal
    const [showModal, setShowModal] = useState(false);
    // Hook to navigate programmatically
    const navigate = useNavigate();

    // Retrieve token and email from localStorage
    const token = localStorage.getItem('access_token');
    const email = localStorage.getItem('email');

    // Fetch cart items when the component mounts
    useEffect(() => {
        const fetchCartItems = async () => {
            if (!token) {
                // Fetch from localStorage for logged-out users
                const localCart = JSON.parse(localStorage.getItem('cart')) || [];
                setCartItems(localCart);
                setLoading(false);
                return;
            }
            
            try {
                const response = await axios.get(`https://dev.vibegurukul.in/api/v1/users/cart`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCartItems(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cart items:', error);
                setLoading(false);
            }
        };
    
        fetchCartItems();
    }, []); // Dependency array includes token to refetch cart items if the token changes

    // Function to handle removing an item from the cart
    const handleRemoveItem = async (itemId, isWorkshop = false) => {
        if (!token) {
            // Remove from localStorage for logged-out users
            const localCart = JSON.parse(localStorage.getItem('cart')) || [];
            const updatedCart = localCart.filter(item =>
                isWorkshop ? item.workshop_id !== itemId : item.course_id !== itemId
            );
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            setCartItems(updatedCart);
            return;
        }

        try {
            const payload = isWorkshop ? { workshop_id: itemId } : { course_id: itemId };

            const response = await axios.post(
                'https://dev.vibegurukul.in/api/v1/users/cart/remove',
                payload,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            // If the removal is successful, update the cart items state
            if (response.status === 200) {
                setCartItems(
                    cartItems.filter(item =>
                        isWorkshop ? item.workshop_id !== itemId : item.course_id !== itemId
                    )
                );
            }
        } catch (error) {
            // Handle errors during the item removal operation
            console.error('Error removing item from cart:', error);
        }
    };


    // Function to handle clearing all items from the cart
    const clearCart = async () => {
        if (!token) {
            // Clear localStorage for logged-out users
            localStorage.removeItem('cart');
            setCartItems([]);
            return;
        }

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
    const courseTitles = cartItems.map(item => item.title);

    // Handle the checkout process
    const handleCheckout = async () => {
        if (!token) {
            setShowModal(true); // Show login modal if the user is not logged in
            return;
        }
    
        try {
            // Separate course and workshop IDs
            const courseIds = cartItems.filter(item => item.course_id).map(item => item.course_id);
            const workshopIds = cartItems.filter(item => item.workshop_id).map(item => item.workshop_id);
    
            // Prepare the payload dynamically
            const payload = {
                amount: calculateTotal(cartItems),
                currency: "INR",
                ...(courseIds.length > 0 && { course_id: courseIds }),
                ...(workshopIds.length > 0 && { workshop_id: workshopIds })
            };
    
            const response = await axios.post(
                'https://dev.vibegurukul.in/api/v1/payments/create-order',
                payload,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
    
            // If the order creation is successful, navigate to the payments page with the order details
            if (response.status === 200) {
                const { order_id } = response.data;
                const amount = calculateTotal(cartItems);
                const currency = "INR";
                const courseTitle = courseTitles; // Combine course/workshop titles for display -> This is not used in the Payments page
    
                navigate('/payments', {
                    state: { order_id, amount, currency, courseTitle }
                });
            } else {
                console.error('Error fetching order details:', response.status);
            }
        } catch (error) {
            // Handle errors during the checkout process
            console.error('Error fetching order details:', error);
        }
    };
    

    const handleLoginSuccess = async () => {
        setShowModal(false);
        
        const new_token = localStorage.getItem('access_token');
        // Retrieve cart items from localStorage
        const localCart = JSON.parse(localStorage.getItem('cart')) || [];
        
        if (localCart.length > 0) {
            try {
                // Send local cart items to the server
                for (const item of localCart) {
                    await axios.post(
                        'https://dev.vibegurukul.in/api/v1/users/cart/add',
                        item,
                        { headers: { Authorization: `Bearer ${new_token}`, 'Content-Type': 'application/json' } }
                    );
                }
    
                // Clear localStorage cart after syncing
                localStorage.removeItem('cart');
            } catch (error) {
                console.error('Error syncing local cart with server:', error);
            }
        }
    
        // Reload the page after successful login and cart sync
        window.location.reload();
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
                                                <h5 className="text-truncate font-size-18">{item.title}</h5>
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
                                                {item.course_id ? (
                                                    // Content for courses
                                                    <div>
                                                        <div className="go-to-course">
                                                            <Link to={`/courses/${item.short_title}`}>View Course</Link>
                                                        </div>
                                                        <button
                                                            className="btn btn-danger"
                                                            onClick={() => handleRemoveItem(item.course_id, false)}
                                                        >
                                                            Remove Item
                                                        </button>
                                                    </div>
                                                ) : item.workshop_id ? (
                                                    // Content for workshops
                                                    <div>
                                                        <div className="go-to-course">
                                                            <Link to={`/workshops`}>View Workshop</Link>
                                                        </div>
                                                        <button
                                                            className="btn btn-danger"
                                                            onClick={() => handleRemoveItem(item.workshop_id, true)}
                                                        >
                                                            Remove Item
                                                        </button>
                                                    </div>
                                                ) : (
                                                    // Fallback content in case neither `course_id` nor `workshop_id` exists
                                                    <p className="text-muted">Invalid item data</p>
                                                )}
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
            <LoginRegisterModal
                showModal={showModal}
                setShowModal={setShowModal}
                onClose={() => setShowModal(false)}
                onLoginSuccess={handleLoginSuccess}
            />
        </div>
    );
}

export default Cart;
