import React, { useState } from 'react';
import './AuthForm.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/Slice/authSlice';
import axios from 'axios';

const AuthForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!formData.email || !formData.password) {
      toast.error('Please fill in all required fields.');
      return;
    }

    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    if (!isLoginMode) {
      if (!formData.firstName || formData.firstName.length < 2 || formData.firstName.length > 50) {
        toast.error('First name must be between 2 and 50 characters.');
        return;
      }

      if (!formData.lastName || formData.lastName.length > 50) {
        toast.error('Last name cannot exceed 50 characters.');
        return;
      }

      if (!formData.role || (formData.role !== 'user' && formData.role !== 'admin')) {
        toast.error('Please select a valid role.');
        return;
      }

      if (!formData.terms) {
        toast.error('You must agree to the Terms & Conditions.');
        return;
      }

      if (formData.password.length < 6) {
        toast.error('Password must be at least 6 characters long.');
        return;
      }
    }

    const API_URL = 'http://localhost:5000/api/v1/user';

    if (isLoginMode) {
      try {
        const response = await axios.post(`${API_URL}/login`, {
          email: formData.email,
          password: formData.password,
        }, {
          withCredentials: true,
        });

        const data = response.data;

        if (response.status !== 200) {
          toast.error(data.message || 'Login failed');
          return;
        }

        dispatch(login(data.user));
        sessionStorage.setItem('isAuthenticated', true); // Use sessionStorage here


        // Redirect to user detail page
        navigate('/UserDetailPage');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Login failed');
      }
    } else {
      try {
        const response = await axios.post(`${API_URL}/signUp`, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          terms: formData.terms,
        });

        const data = response.data;

        if (response.status !== 201) {
          toast.error(data.message || 'Sign up failed');
          return;
        }

        toast.success('Account created successfully!');
        toggleMode();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Sign up failed');
      }
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
