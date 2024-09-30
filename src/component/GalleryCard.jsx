
import React from 'react';
import './GalleryCard.css';

const GalleryCard = ({ image, title, description, offer, className }) => {
  return (
    <div className={`gallery-card ${className}`}>
      <img src={image} alt={title} className="gallery-card-image" />
      <div className="gallery-card-body">
        <h2 className="gallery-card-title">{title}</h2>
        <p className="gallery-card-description">{description}</p>
        <p className="gallery-card-offer">Special Offer: <strong>{offer}</strong></p>
        <button className="gallery-card-button">Book Now</button>
      </div>
    </div>
  );
};

export default GalleryCard;
