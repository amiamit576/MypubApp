import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Checkout.css'; 

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);


  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryCharges = totalPrice >= 200 ? 0 : 0; 
  const platformFee = 1;

  return (
    <div className="checkout-page">
      <h2 className="checkout-title">Checkout</h2>
      {cartItems.length === 0 ? (
        <p className="checkout-empty-message">
          Your cart is empty. <Link to="/menu" className="checkout-link">Shop Now</Link>
        </p>
      ) : (
        <div className="checkout-container">
          {/* Left column: Delivery address form */}
          <div className="checkout-left">
            <h3>Delivery Address</h3>
            <form className="checkout-form">
              <input type="text" placeholder="Name" className="checkout-form__input" required />
              <input type="tel" placeholder="10-digit mobile number" className="checkout-form__input" required />
              <input type="text" placeholder="Pincode" className="checkout-form__input" required />
              <input type="text" placeholder="Address (Area and Street)" className="checkout-form__input" required />
              <input type="text" placeholder="City/District/Town" className="checkout-form__input" required />
              <input type="text" placeholder="State" className="checkout-form__input" required />
              <input type="text" placeholder="Landmark (Optional)" className="checkout-form__input" />
              <input type="text" placeholder="Alternate Phone (Optional)" className="checkout-form__input" />
              <button type="submit" className="checkout-form__button">Save and Deliver Here</button>
            </form>
          </div>

          {/* Right column: Price summary */}
          <div className="checkout-right">
            <h3 className="price-summary-title">Price Details</h3>
            <div className="price-summary">
              <p>Price ({cartItems.length} item{cartItems.length > 1 ? 's' : ''}): ₹{totalPrice}</p>
              <p>Delivery Charges: {deliveryCharges === 0 ? 'Free' : `₹${deliveryCharges}`}</p>
              <p>Platform Fee: ₹{platformFee}</p>
              <h4>Total Payable: ₹{totalPrice + platformFee + deliveryCharges}</h4>
            </div>
            <Link to="/payment" className="checkout-proceed-button">Proceed to Payment</Link>
          </div>
        </div>
      )}
      <Link to="/cart" className="checkout-back-to-cart">Back to Cart</Link>
    </div>
  );
};

export default Checkout;
