import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('access_token');
    const email = localStorage.getItem('email');

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`https://3.106.139.89/api/v1/users/cart`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCartItems(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cart items:', error);
                setLoading(false);
            }
        };
        if (token) {
            fetchCartItems();
        } else {
            setLoading(false);
        }
    }, [token]);

    const handleRemoveItem = async (courseId) => {
        try{
            const response = await axios.post('https://3.106.139.89/api/v1/users/cart/remove', 
                { course_id: courseId },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            if (response.status === 200) {
                setCartItems(cartItems.filter(item => item.course_id !== courseId));
            }
        }catch (error) {
            console.error('Error removing item from cart:', error);
        }
    }
    if (loading) {
        return <div className="container mt-4">Loading...</div>;
    }

    if (!token || !email) {
        return <div className="container mt-4">Please log in to view your cart.</div>;
    }

    if (cartItems.length === 0) {
        return <div className="cart-page container mt-4"><h1>Your cart is empty.</h1></div>;
    }

    const calculateTotal = (cartItems) => {
        return cartItems.reduce((total, cartItems) => total + parseFloat(cartItems.price), 0).toFixed(2);
    };
    
    return (
        <div className='cart-page'>
            <div className="container">
                <h1>Your cart</h1>
                <div className="row">
                    {cartItems.map((item) => (
                    <div className="col-xl-8">
                        <div className="card border shadow-none">
                            <div className="card-body">
            
                                <div className="d-flex align-items-start border-bottom pb-3">
                                    <div className="me-4">
                                        <img src="https://www.bootdey.com/image/380x380/008B8B/000000" alt="" className="avatar-lg rounded"></img>
                                    </div>
                                    <div className="flex-grow-1 align-self-center overflow-hidden">
                                        <div>
                                            <h5 className="text-truncate font-size-18">Course name: {item.title}</h5>
                                            <p className="text-muted mb-0">
                                                <i className="bx bxs-star text-warning"></i>
                                                <i className="bx bxs-star text-warning"></i>
                                                <i className="bx bxs-star text-warning"></i>
                                                <i className="bx bxs-star text-warning"></i>
                                                <i className="bx bxs-star-half text-warning"></i>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 ms-2">
                                        <ul className="list-inline mb-0 font-size-16">
                                            <li className="list-inline-item">
                                                <a href="#" className="text-muted px-1">
                                                    <i className="mdi mdi-trash-can-outline"></i>
                                                </a>
                                            </li>
                                            <li className="list-inline-item">
                                                <a href="#" className="text-muted px-1">
                                                    <i className="mdi mdi-heart-outline"></i>
                                                </a>
                                            </li>
                                        </ul>
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
                                        <tr className="bg-light">
                                            <th>Total :</th>
                                            <td className="text-end">
                                                <span className="fw-bold">
                                                Rs. {calculateTotal(cartItems)}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="row my-4">
                                <div className="col-sm-6">
                                    <a href="/courses" className="btn btn-link text-muted">
                                        <i className="mdi mdi-arrow-left me-1"></i> Back to courses </a>
                                </div> 
                                <div className="col-sm-6">
                                    <div className="text-sm-end mt-2 mt-sm-0">
                                        <a href="/" className="btn btn-success">
                                            <i className="mdi mdi-cart-outline me-1"></i> Checkout </a>
                                    </div>
                                </div> 
                            </div> 
                        </div>
                    </div>
                
                </div>
            
            </div>
        </div>

            </div>
        </div>
    );
}
export default Cart;