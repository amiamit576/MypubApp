import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { VscAccount } from 'react-icons/vsc';
import { FaCartArrowDown, FaSignOutAlt } from 'react-icons/fa';
import logo from '../assets/logo.png';
import './Header.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { logout } from '../store/Slice/authSlice';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.auth.user);

  // Calculate total items based on user login status
  const totalItems = user
    ? Array.isArray(cartItems) ? cartItems.reduce((acc, item) => acc + item.quantity, 0) : 0
    : (() => {
        const storedCart = JSON.parse(sessionStorage.getItem('cart'));
        if (storedCart && storedCart.data && storedCart.data.cart && storedCart.data.cart.items) {
          return storedCart.data.cart.items.reduce((acc, item) => acc + item.quantity, 0);
        }
        return 0;
      })();

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      sessionStorage.removeItem('isAuthenticated');
      try {
        const response = await axios.post('http://localhost:5000/api/v1/user/logout', {}, {
          withCredentials: true,
        });

        if (response.status === 200) {
          dispatch(logout());
          toast.success('Logout successful!');
          navigate('/');
        } else {
          toast.error('Logout failed, please try again.');
        }
      } catch (error) {
        console.error('Logout failed', error);
        toast.error('An error occurred during logout.');
      }
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
          <li><Link className="header-link" to="/">Home</Link></li>

          {/* Admin Section: Visible only for Admins */}
          {user?.role === 'admin' && (
            <>
              <li><Link className="header-link" to="/admin-dashboard">Admin Dashboard</Link></li>
              <li><Link className="header-link" to="/admin-products">Manage Products</Link></li>
              <li><Link className="header-link" to="/admin-users">Manage Users</Link></li>
            </>
          )}

          {/* Normal Users and Guests Section */}
          {!user?.role || user?.role !== 'admin' ? (
            <>
              <li><Link className="header-link" to="/UserDetailPage">About</Link></li>
              <li><Link className="header-link" to="/special-event">Special Event</Link></li>
              <li><Link className="header-link" to="/reservation">Reservation</Link></li>
              <li><Link className="header-link" to="/gallery">Gallery</Link></li>
              <li><Link className="header-link" to="/contact">Contact</Link></li>
              <li>
                <Link className="header-link" to="/cart">
                  <div className="header-cart">
                    <FaCartArrowDown className="header-cart__icon" />
                    <span className="header-cart__count">({totalItems})</span>
                  </div>
                </Link>
              </li>
            </>
          ) : null}

          {/* Show Username if logged in */}
          {user && (
            <li>
              <Link className="header-link header-link--account" to="/user-dashboard">
                <div className="header-account">
                  <span>{user.firstName ? `${user.firstName} ${user.lastName}` : user.email}</span>
                </div>
              </Link>
            </li>
          )}

          {/* Show Logout button if logged in, otherwise show Login button */}
          <li>
            {user ? (
              <button 
                className="header-link header-link--logout" 
                onClick={handleLogout}
              >
                <FaSignOutAlt className="header-logout__icon" />
                <span>Logout</span>
              </button>
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
