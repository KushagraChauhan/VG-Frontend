import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS for styling
import './css/WorkshopCard.css'; // Custom CSS for workshop card styling
import { Link } from "react-router-dom"; // Importing Link for navigation between routes

const WorkshopCard = ({ workshop }) => {
    return (
        <div className="col-md-4 mb-4">
            <div className="workshop-card">
                {/* Workshop preview image */}
                <div className="workshop-image">
                    <img src={workshop.preview_image} alt={workshop.title} />
                </div>
                {/* Workshop details */}
                <div className="workshop-details">
                    <h5 className="workshop-title">{workshop.title}</h5>
                    <p className="workshop-description">{workshop.description}</p>
                    {workshop.price === "Coming Soon" ? (
                        <h4 style={{ color: "#FFA500" }}>
                            <strong>Coming Soon</strong>
                        </h4>
                    ) : (
                        <p className="workshop-price">
                            <strong>Price: ₹ {workshop.price}/-</strong>
                        </p>
                    )}
                    {/* Link to enroll */}
                    <div className="workshop-action">
                        <Link to={`/workshops/${workshop.short_title}`} className="enroll-btn">
                            Enroll Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkshopCard;
