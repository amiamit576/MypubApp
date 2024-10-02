import React, { useState } from 'react';
import './AuthForm.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import useDispatch from Redux
import { login } from '../store/Slice/authSlice'; // Import login action from authSlice

const AuthForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: '',
      terms: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    // Validation
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all required fields.');
      return;
    }

    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    // Retrieve users array from localStorage or initialize it as an empty array
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if a user with the same email already exists
    const existingUser = storedUsers.find((user) => user.email === formData.email);

    if (isLoginMode) {
      // Login logic
      if (!existingUser || existingUser.password !== formData.password) {
        toast.error('Invalid email or password.');
        return;
      }

      // Dispatch the logged-in user to Redux store
      dispatch(login(existingUser));

      toast.success('Login successful!');
      navigate('/');
    } else {
      // Signup logic
      if (existingUser) {
        toast.error('User with this email already exists.');
        return;
      }

      // Validate required fields for signup
      if (!formData.firstName || !formData.lastName || !formData.role) {
        toast.error('Please fill in all fields.');
        return;
      }

      if (!formData.terms) {
        toast.error('You must agree to the Terms & Conditions.');
        return;
      }

      // Store the new user data in localStorage
      storedUsers.push(formData);
      localStorage.setItem('users', JSON.stringify(storedUsers));

      // Dispatch the newly registered user to Redux store
      dispatch(login(formData));

      toast.success('Account created successfully!');
      toggleMode(); // Switch to login mode after successful signup
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-page__form-container">
        <h2 className="auth-page__title">{isLoginMode ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit} className="auth-page__form">
          {!isLoginMode && (
            <>
              <div className="auth-page__input-container">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="auth-page__input"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="auth-page__input-container">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="auth-page__input"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="auth-page__input-container">
                <select
                  name="role"
                  className="auth-page__input"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="">Select Role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  
                </select>
              </div>
            </>
          )}

          <div className="auth-page__input-container">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="auth-page__input"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="auth-page__input-container">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="auth-page__input"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {!isLoginMode && (
            <div className="auth-page__input-container auth-page__terms">
              <input
                type="checkbox"
                name="terms"
                id="terms"
                className="auth-page__checkbox"
                checked={formData.terms}
                onChange={handleChange}
              />
              <label htmlFor="terms" className="auth-page__label">
                I agree to the <a href="/terms">Terms & Conditions</a>
              </label>
            </div>
          )}

          <button type="submit" className="auth-page__submit-button">
            {isLoginMode ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-page__toggle">
          {isLoginMode ? (
            <p>
              Don't have an account?{' '}
              <button onClick={toggleMode} className="auth-page__toggle-button">
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button onClick={toggleMode} className="auth-page__toggle-button">
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
