import React, { useState } from 'react';
import { FaStar, FaHeart } from 'react-icons/fa';
import './MenuCard.css';

const MenuCard = ({ image, name, price, addToCart }) => {
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const handleAddToCart = () => {
    addToCart({ id: Math.random(), image, name, price }); 

  };

  return (
    <div className="menu-card">
      <div className="menu-card-image-container">
        <img src={image} alt={name} className="menu-card-image" />
        <FaHeart
          size={25}
          color={isFavorite ? 'red' : '#e4e5e9'}
          onClick={() => setIsFavorite(!isFavorite)}
          className="menu-card-heart-icon"
        />
      </div>
      <div className="menu-card-info">
        <h3 className="menu-card-name">{name}</h3>
        <div className="menu-card-bottom">
          <p className="menu-card-price">${price.toFixed(2)}</p>
          <div className="menu-card-rating">
            {[...Array(5)].map((star, index) => (
              <FaStar
                key={index}
                size={20}
                color={index + 1 <= rating ? '#ffc107' : '#e4e5e9'}
                onClick={() => setRating(index + 1)}
                className="menu-card-star"
              />
            ))}
          </div>
        </div>
        <div className="menu-card-quantity-selector">
          <button onClick={decreaseQuantity} className="menu-card-quantity-btn">-</button>
          <span>{quantity}</span>
          <button onClick={increaseQuantity} className="menu-card-quantity-btn">+</button>
        </div>
        <button className="menu-card-add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default MenuCard;
