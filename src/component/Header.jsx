import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { VscAccount } from 'react-icons/vsc';
import { FaCartArrowDown } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa'; 
import logo from '../assets/logo.png';
import './Header.css';

import { logout } from '../store/Slice/authSlice';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.auth.user); 
  const totalItems = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(logout());
      navigate('/'); 
    }
  };

  return (
    <nav className="header-container">
      <div className="header-logo">
        <Link to="/">
          <img src={logo} alt="Logo" className="header-logo__image" />
        </Link>
      </div>
      <div className="header-navigation">
        <ul className="header-list">
          <li>
            <Link className="header-link" to="/">Home</Link>
          </li>
          <li>
            <Link className="header-link" to="/join">Join our List</Link>
          </li>
          <li>
            <Link className="header-link" to="/special-event">Special Event</Link>
          </li>
          <li>
            <Link className="header-link" to="/reservation">Reservation</Link>
          </li>
          <li>
            <Link className="header-link" to="/gallery">Gallery</Link>
          </li>
          <li>
            <Link className="header-link" to="/contact">Contact</Link>
          </li>
        
          <li>
            <Link className="header-link" to="/cart">
              <div className="header-cart">
                <FaCartArrowDown className="header-cart__icon" />
                <span className="header-cart__count">({totalItems})</span> 
              </div>
            </Link>
          </li>
        
          <li>
            {user ? (
              <>
                <Link className="header-link header-link--account" to="/user-dashboard">
                  <div className="header-account">
                 
                    <span>{user.firstName ? `${user.firstName} ${user.lastName}` : user.email}</span>
                  </div>
                </Link>

                <button 
                  className="header-link header-link--logout" 
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="header-logout__icon" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link className="header-link header-link--login" to="/authForm">
                <div className="header-login">
                  <VscAccount className="header-login__icon" />
                  <span>Login</span>
                </div>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
