import React, { useState, useEffect } from "react";
import WorkshopCard from "./WorkshopCard";
import axios from "axios"; // Importing axios for making HTTP requests
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap for styling
import './css/AllCourses.css'; // Importing custom CSS for additional styling
import LoadingSpinner from "./Loading"; // Importing a loading spinner component to show during data fetch
import {useParams, Link, useNavigate } from "react-router-dom";

const AllWorkshops = () => {
    const [workshops, setWorkshops] = useState([]); // State to store workshops data
    const [isLoading, setIsLoading] = useState(true); // State to manage loading state
    const token = localStorage.getItem('access_token'); // Retrieve token from localStorage for authentication
    const [enrollmentStatus, setEnrollmentStatus] = useState(""); // State to display status messages

    const navigate = useNavigate();

    // Fetch workshops when the component mounts
    useEffect(() => {
        axios
            .get("https://dev.vibegurukul.in/api/v1/workshops")
            .then((response) => {
                setWorkshops(response.data); // Update workshops state with fetched data
                setIsLoading(false); // Set loading to false
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setIsLoading(false); // Set loading to false even if there is an error
            });
    }, []);

    // Method to handle adding a workshop to the cart
    const handleAddToCart = async (workshop) => {
        const workshopData = {
            workshop_id: workshop._id,
            price: workshop.price,
            title: workshop.title,
            preview_image: workshop.preview_image,
            short_title: workshop.short_title,
        };

        if (!token) {
            // Handle cart locally if user is not logged in
            const localCart = JSON.parse(localStorage.getItem("cart")) || [];
            localCart.push(workshopData);
            localStorage.setItem("cart", JSON.stringify(localCart));
            setEnrollmentStatus("Workshop added to cart!");
            navigate('/cart');
            return;
        }

        try {
            // Send workshop data to the API
            const response = await axios.post(
                "https://dev.vibegurukul.in/api/v1/users/cart/add",
                workshopData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {                
                setEnrollmentStatus("Workshop added to cart!");
                navigate('/cart');
            }
        } catch (error) {
            setEnrollmentStatus("Error adding workshop to cart. Please try again later.");
            console.error("Error adding workshop to cart:", error);
        }
    };

    // Show loading spinner while data is being fetched
    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="all-courses">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <a href="/home" className="back-link">&lt; Back</a>
                        <h1 className="text-center my-4" style={{ color: "#FF6F61" }}>
                            All Workshops
                        </h1>
                        <h6 className="text-center my-4">
                            Explore a range of interactive and fun workshops designed for children to discover the science, stories, and wisdom behind Hindu traditions. From decoding ancient rituals to understanding timeless values, our sessions are tailored to ignite curiosity and nurture a deep connection to their roots.
                        </h6>
                        {enrollmentStatus && (
                            <div className="text-center alert alert-info">{enrollmentStatus}</div>
                        )}
                    </div>
                </div>
                <div className="row">
                    {workshops.map((workshop) => (
                        <WorkshopCard
                            key={workshop._id}
                            workshop={workshop}
                            handleAddToCart={handleAddToCart}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllWorkshops;
