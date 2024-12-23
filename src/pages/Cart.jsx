import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart, removeFromCart, updateItemQuantity, clearCart } from '../store/Slice/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Access cart state from Redux
  const { cartItems, loading, error, isAuthenticated } = useSelector(state => state.cart);
  
  // Fetch cart on component mount
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Handle removing item from cart
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId))
      .unwrap()
      .then(() => {
        toast.success('Item removed from cart!');
        dispatch(fetchCart());  // Fetch updated cart after removing item
      })
      .catch(() => toast.error('Failed to remove item.'));
  };

  // Handle updating item quantity
  const handleQuantityChange = (productId, quantity) => {
    console.log(productId,quantity)
    if (quantity > 0) {
      dispatch(updateItemQuantity({ productId, quantity }))
        .unwrap()
        .then(() => dispatch(fetchCart()))  
        .catch(() => toast.error('Failed to update quantity.'));
    } else {
      toast.warn('Quantity cannot be less than 1');
    }
  };

  // Handle clearing the cart
  const handleClearCart = () => {
    dispatch(clearCart())
      .unwrap()
      .then(() => {
        toast.info('Cart cleared!');
        dispatch(fetchCart());  // Fetch updated cart after clearing
      })
      .catch(() => toast.error('Failed to clear cart.'));
  };

  // Navigate to checkout or login
  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to proceed to checkout.');
      return navigate('/login');
    }
    navigate('/checkout');
  };

  // If loading or error occurred
  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error: {error}</p>;

  // Safely access cart data, fallback to guest cart if not authenticated
  const guestCart = JSON.parse(sessionStorage.getItem('cart'))?.data?.cart?.items || [];
  const cart = isAuthenticated
    ? cartItems || []  // If authenticated, use the cartItems directly
    : guestCart || []; // Fallback to guestCart for unauthenticated users

  // If the cart is empty
  if (!Array.isArray(cart) || cart.length === 0) {
    return (
      <p className="cart-empty-message">
        Your cart is empty. <Link to="/menu" className="cart-link">Shop Now</Link>
      </p>
    );
  }

  // Calculate total price, discount, and other charges
  const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const discount = 0; // Placeholder for future discount logic
  const platformFee = totalPrice > 500 ? 0 : 50;
  const deliveryCharges = totalPrice > 1000 ? 0 : 50;

  return (
    <div className="cart-page">
      <Link to="/menu" className="back-to-menu">← Back to Menu</Link>
      <h2 className="cart-title">Shopping Cart</h2>
      <div className="cart-content">
        <div className="cart-left">
          <ul>
            {cart.map(item => (
              <li key={item.product._id} className="cart-item">
                <img src={`http://localhost:5000${item.product.image}`} alt={item.product.name} className="cart-item__image" />
                <div className="cart-item-details">
                  <h3 className="cart-item__name">{item.product.name}</h3>
                  <p className="cart-item__price">Price: ₹{item.product.price}</p>
                  <p className="cart-item__quantity">
                    Quantity:
                    <button onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)} disabled={item.quantity <= 1}>−</button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.product._id, parseInt(e.target.value))}
                      className="quantity-input"
                      min="1"
                    />
                    <button onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}>+</button>
                  </p>
                  <button onClick={() => handleRemoveFromCart(item.product._id)} className="cart-item__remove-button">
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={handleClearCart} className="cart-clear-button">Clear Cart</button>
        </div>

        <div className="cart-right">
          <h3 className="price-summary-title">Price Details</h3>
          <div className="price-summary">
            <p>Price ({cart.length} item{cart.length > 1 ? 's' : ''}): ₹{totalPrice}</p>
            <p>Discount: - ₹{discount}</p>
            <p>Platform Fee: ₹{platformFee}</p>
            <p>Delivery Charges: {deliveryCharges === 0 ? 'Free' : `₹${deliveryCharges}`}</p>
            <h4>Total Amount: ₹{totalPrice - discount + platformFee + deliveryCharges}</h4>
          </div>
          <button onClick={handleCheckout} className="cart-checkout-button">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
