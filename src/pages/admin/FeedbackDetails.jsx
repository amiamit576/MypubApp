import React, { useEffect, useState } from 'react';
import axiosInstance from './../../services/axiosInstance';
import './FeedbackDetails.css';

function FeedbackDetails() {
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch all feedbacks from the backend
  const fetchFeedbacks = async () => {
    try {
      const response = await axiosInstance.get('/feedback/getAllFeedback');
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching feedback:', error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="feedback-container">
      <h1 className="feedback-title">User Feedback</h1>

      {/* Iterate over feedbacks and display each feedback with details */}
      {feedbacks.length > 0 ? (
        feedbacks.map((feedback) => (
          <div key={feedback._id} className="feedback-card">
            <h3 className="feedback-username">User: {feedback.name}</h3>
            <p className="feedback-content">Feedback: {feedback.message}</p>
            <p className="feedback-date">
              Date: {new Date(feedback.createdAt).toLocaleDateString()}
            </p>

            {/* System response, if exists */}
            {feedback.response && (
              <div className="feedback-response">
                <h4>System Response:</h4>
                <p>{feedback.response}</p>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No feedback available.</p>
      )}
    </div>
  );
}

export default FeedbackDetails;
