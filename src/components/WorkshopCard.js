import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS for styling
import './css/WorkshopCard.css'; // Custom CSS for workshop card styling

const WorkshopCard = ({ workshop, handleAddToCart, purchasedWorkshops }) => {
    const isPurchased = purchasedWorkshops.includes(workshop._id);

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
                    <div className="workshop-header">
                        <p className="workshop-age me-3">Age: {workshop.age}</p>
                        <div className="workshop-tag">3-day Workshop</div>
                    </div>
                    <p className="workshop-description">{workshop.description}</p>
                    {workshop.price === "Coming Soon" ? (
                        <h4 style={{ color: "#FFA500" }}>
                            <strong>Coming Soon</strong>
                        </h4>
                    ) : workshop.price === "Registrations Closed" ? (
                        <h4 style={{ color: "red" }}>
                            <strong>Registrations Closed</strong>
                        </h4>
                    ) : (
                        <>
                            <p className="workshop-price">
                                <strong>Price: ₹ {workshop.price}/session</strong>
                            </p>
                            {/* Conditionally render Add to Cart button */}
                            {!isPurchased ? (
                                <div className="workshop-action">
                                    <button
                                        className="enroll-btn"
                                        onClick={() => handleAddToCart(workshop)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            ) : (
                                <p className="text-success">
                                    <strong>Already Purchased</strong>
                                </p>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WorkshopCard;
