import React, { useState } from 'react';
import axios from 'axios';
import './css/CourseReviewForm.css'; // Importing custom CSS for styling the review form

// CourseReviewForm component allows users to submit a review for a specific course
const CourseReviewForm = ({ courseId, token, onReviewSubmitted }) => {
    // State to manage the rating value (1 to 5 stars)
    const [rating, setRating] = useState(0);

    // State to manage the comment text
    const [comment, setComment] = useState('');

    // State to manage the submission status message
    const [submissionStatus, setSubmissionStatus] = useState('');

    // Function to handle changes in the rating (when a user clicks on a star)
    const handleRatingChange = (value) => {
        setRating(value);
    };

    // Function to handle changes in the comment textarea
    const handleCommentChange = (e) => setComment(e.target.value);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            // Send the review data to the server
            await axios.post(
                `https://dev.vibegurukul.in/api/v1/courses/reviews`,
                { 
                    "course_id": courseId,  // ID of the course being reviewed
                    "rating": rating,       // Rating given by the user
                    "comment": comment      // Comment provided by the user
                },
                { headers: { Authorization: `Bearer ${token}` } } // Include the token for authentication
            );
            // Update submission status and reset form fields on successful submission
            setSubmissionStatus('Review submitted successfully!');
            onReviewSubmitted(); // Callback to refresh reviews after submission
            setRating(0); // Reset rating to 0
            setComment(''); // Clear the comment field
        } catch (error) {
            // Handle errors during the review submission
            console.error('Error submitting review:', error);
            setSubmissionStatus('Failed to submit review. Please try again.');
        }
    };

    // Render the review form
    return (
        <div className="review-form">
            <h3>Leave a Review</h3>
            {/* Display submission status message if available */}
            {submissionStatus && <p>{submissionStatus}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Rating:</label>
                    <div className="star-rating">
                        {/* Render star rating options (1 to 5 stars) */}
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`star ${star <= rating ? 'filled' : ''}`}
                                onClick={() => handleRatingChange(star)}
                            >
                                &#9733;
                            </span>
                        ))}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="comment">Comment:</label>
                    {/* Textarea for user to input their comment */}
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={handleCommentChange}
                    ></textarea>
                </div>
                {/* Submit button to submit the review */}
                <button type="submit" className="btn btn-primary">Submit Review</button>
            </form>
        </div>
    );
};

export default CourseReviewForm;
