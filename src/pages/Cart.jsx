import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart, removeFromCart, updateItemQuantity, clearCart } from '../store/Slice/cartSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, loading, error } = useSelector(state => state.cart);

  // Fetch cart items on component mount
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Handle removing an item from the cart
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId))
      .unwrap()
      .then(() => toast.success('Item removed from cart!'))
      .catch(() => toast.error('Failed to remove item.'));
  };

  // Handle increasing the item quantity
  const handleIncreaseQuantity = (productId, quantity) => {
    dispatch(updateItemQuantity({ productId, quantity: quantity + 1 }))
      .unwrap()
      .catch(() => toast.error('Failed to update quantity.'));
  };

  // Handle decreasing the item quantity
  const handleDecreaseQuantity = (productId, quantity) => {
    if (quantity > 1) {
      dispatch(updateItemQuantity({ productId, quantity: quantity - 1 }))
        .unwrap()
        .catch(() => toast.error('Failed to update quantity.'));
    } else {
      toast.warn('Quantity cannot be less than 1');
    }
  };

  // Handle clearing the entire cart
  const handleClearCart = () => {
    dispatch(clearCart())
      .unwrap()
      .then(() => toast.info('Cart cleared!'))
      .catch(() => toast.error('Failed to clear cart.'));
  };

  // Check if the cart is still loading
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Calculate total price, with dummy discount and platform fees
  const totalPrice = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const discount = 0; 
  const platformFee = 1; 
  const deliveryCharges = 0; 

  return (
    <div className="cart-page">
      <Link to="/menu" className="back-to-menu">← Back to Menu</Link>
      <h2 className="cart-title">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="cart-empty-message">
          Your cart is empty. <Link to="/menu" className="cart-link">Shop Now</Link>
        </p>
      ) : (
        <div className="cart-content">
          <div className="cart-left">
            {cartItems.map((item) => {
              const imageUrl = `http://localhost:5000${item.product.image}`;

              return (
                <div key={item.product._id} className="cart-item">
                  <img src={imageUrl} alt={item.product.name} className="cart-item__image" />
                  <div className="cart-item-details">
                    <h3 className="cart-item__name">{item.product.name}</h3>
                    <p className="cart-item__price">Price: ₹{item.product.price}</p>
                    <p className="cart-item__quantity">
                      Quantity:
                      <button
                        onClick={() => handleDecreaseQuantity(item.product._id, item.quantity)}
                        className="quantity-button"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        onClick={() => handleIncreaseQuantity(item.product._id, item.quantity)}
                        className="quantity-button"
                      >
                        +
                      </button>
                    </p>
                    <button
                      onClick={() => handleRemoveFromCart(item.product._id)}
                      className="cart-item__remove-button"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
            <button onClick={handleClearCart} className="cart-clear-button">Clear Cart</button>
          </div>

          <div className="cart-right">
            <h3 className="price-summary-title">Price Details</h3>
            <div className="price-summary">
              <p>Price ({cartItems.length} item{cartItems.length > 1 ? 's' : ''}): ₹{totalPrice}</p>
              <p>Discount: - ₹{discount}</p>
              <p>Platform Fee: ₹{platformFee}</p>
              <p>Delivery Charges: {deliveryCharges === 0 ? 'Free' : `₹${deliveryCharges}`}</p>
              <h4>Total Amount: ₹{totalPrice - discount + platformFee + deliveryCharges}</h4>
            </div>
            <Link to="/checkout" className="cart-checkout-button">Place Order</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
