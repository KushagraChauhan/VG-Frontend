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
        if(token){
            fetchCartItems();
        }else{
            setLoading(false);
        }
    }, [token]);

    if (loading) {
        return <div className="container mt-4">Loading...</div>;
    }

    if (!token || !email) {
        return <div className="container mt-4">Please log in to view your cart.</div>;
    }

    if (cartItems.length === 0) {
        return <div className="container mt-4">Your cart is empty.</div>;
    }

    return (
        <div className="container mt-4">
            <h1 className="display-4">Your Cart</h1>
            <div className="row">
                {cartItems.map((item) => (
                    <div key={item.course_id} className="col-md-4 mb-4">
                        <div className="card">
                            <img src={item.preview_image} className="card-img-top" alt={item.title} />
                            <div className="card-body">
                                <h5 className="card-title">Course Name: </h5>
                                <p className="card-text">Price: Rs.{item.price}</p>
                                <div className="go-to-course">
                                    <Link to={`/courses/${item.course_id}`}>View Course</Link>
                                </div>
                                <button className='btn btn-info btn-lg'>Pay Online</button>
                                <br></br><br></br>
                                <button className='btn btn-dark'> Remove </button> 
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Cart;