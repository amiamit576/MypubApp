import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { VscAccount } from 'react-icons/vsc';
import { FaCartArrowDown } from 'react-icons/fa';
import logo from '../assets/logo.png';
import './Header.css';

function Header() {
  // Access cart items from Redux state
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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
          {/* Cart Section */}
          <li>
            <Link className="header-link" to="/cart">
              <div className="header-cart">
                <FaCartArrowDown className="header-cart__icon" />
                <span className="header-cart__count">({totalItems})</span> {/* Showing total items in the cart */}
              </div>
            </Link>
          </li>
          {/* Login Section */}
          <li>
            <Link className="header-link header-link--login" to="/authForm">
              <div className="header-login">
                <VscAccount className="header-login__icon" />
                <span>Login</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
