import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart, increaseQuantity, decreaseQuantity } from '../store/Slice/cartSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Cart.css';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
    toast.error('Item removed from cart!');
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.info('Cart cleared!');
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = 0; 
  const platformFee = 1;
  const deliveryCharges = 0;  

  return (
    <div className="cart-page">
      <Link to="/menu" className="back-to-menu">
        ← Back to Menu
      </Link>
      <h2 className="cart-title">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="cart-empty-message">
          Your cart is empty. <Link to="/menu" className="cart-link">Shop Now</Link>
        </p>
      ) : (
        <div className="cart-content">
          <div className="cart-left">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item__image" />
                <div className="cart-item-details">
                  <h3 className="cart-item__name">{item.name}</h3>
                  <p className="cart-item__price">Price: ₹{item.price}</p>
                  <p className="cart-item__quantity">
                    Quantity: 
                    <button onClick={() => handleDecreaseQuantity(item.id)} className="quantity-button">-</button>
                    {item.quantity}
                    <button onClick={() => handleIncreaseQuantity(item.id)} className="quantity-button">+</button>
                  </p>
                  <p className="cart-item__seller">Seller: {item.seller}</p>
                  <p className="cart-item__delivery">Delivery: Free by {item.deliveryDate}</p>
                  <button onClick={() => handleRemoveFromCart(item.id)} className="cart-item__remove-button">
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button onClick={handleClearCart} className="cart-clear-button">Clear Cart</button>
          </div>

          <div className="cart-right">
            <h3 className="price-summary-title">Price Details</h3>
            <div className="price-summary">
              <p>Price ({cartItems.length} item{cartItems.length > 1 ? 's' : ''}): ₹{totalPrice}</p>
              <p>Discount: - ₹{discount}</p>
              <p>Platform Fee: ₹{platformFee}</p>
              <p>Delivery Charges: {deliveryCharges === 0 ? 'Free' : `₹${deliveryCharges}`}</p>
              <h4>Total Amount: ₹{totalPrice - discount + platformFee + (deliveryCharges || 0)}</h4>
            </div>
            <Link to="/checkout" className="cart-checkout-button">Place Order</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
