import React, { useState } from 'react';
import './Contact.css';
import axiosInstance from '../services/axiosInstance';
import { toast } from 'react-toastify';  // Import toast
import 'react-toastify/dist/ReactToastify.css';  // Import toast styles

const Contact = () => {
  const [feedbackData, setFeedbackData] = useState({
    name: '',
    email: '',
    phone: '',
    feedbackType: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData({ ...feedbackData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/feedback/createFeedback', feedbackData);
      toast.success('Feedback submitted successfully!');
      setFeedbackData({
        name: '',
        email: '',
        phone: '',
        feedbackType: '',
        message: '',
      });
    } catch (error) {
      toast.error('Failed to submit feedback. Please try again.');
    }
  };

  return (
    <div className="contact-container">
      <section className="contact-info">
        <h2>Contact Us</h2>
        <p>We're here to help you with any questions or feedback. Feel free to reach out using the form or the contact details below.</p>
        <div className="contact-details">
          <p><strong>Address:</strong> 123 Pub Street, Cityville, Country</p>
          <p><strong>Phone:</strong> (123) 456-7890</p>
          <p><strong>Email:</strong> contact@pubname.com</p>
        </div>
      </section>

      <section className="contact-feedback-form">
        <h3>Leave Your Feedback</h3>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-feedback-input-group">
            <input
              className="contact-input"
              type="text"
              name="name"
              placeholder="Your Name"
              value={feedbackData.name}
              onChange={handleChange}
              required
            />
            <input
              className="contact-input"
              type="email"
              name="email"
              placeholder="Your Email"
              value={feedbackData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="contact-feedback-input-group">
            <input
              className="contact-input"
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={feedbackData.phone}
              onChange={handleChange}
              required
            />
            <select
              className="contact-select"
              name="feedbackType"
              value={feedbackData.feedbackType}
              onChange={handleChange}
              required
            >
              <option value="">Select Feedback Type</option>
              <option value="Compliment">Compliment</option>
              <option value="Complaint">Complaint</option>
              <option value="Suggestion">Suggestion</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <textarea
            className="contact-textarea"
            name="message"
            placeholder="Your Message"
            value={feedbackData.message}
            onChange={handleChange}
            rows="5"
            required
          />
          <button type="submit" className="contact-feedback-submit">Submit Feedback</button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
