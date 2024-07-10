// ReviewForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './css/CourseReviewForm.css';

const CourseReviewForm = ({ courseId, token, onReviewSubmitted }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState('');

    const handleRatingChange = (value) => {
        setRating(value);
    };
    const handleCommentChange = (e) => setComment(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `https://dev.vibegurukul.in/api/v1/courses/reviews`,
                { "course_id":courseId,
                   "rating":rating, 
                   "comment":comment },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSubmissionStatus('Review submitted successfully!');
            onReviewSubmitted();
            setRating(0);
            setComment('');
        } catch (error) {
            console.error('Error submitting review:', error);
            setSubmissionStatus('Failed to submit review. Please try again.');
        }
    };

    return (
        <div className="review-form">
            <h3>Leave a Review</h3>
            {submissionStatus && <p>{submissionStatus}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Rating:</label>
                    <div className="star-rating">
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
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={handleCommentChange}
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit Review</button>
            </form>
        </div>
    );
};

export default CourseReviewForm;
