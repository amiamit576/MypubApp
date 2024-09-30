// components/Gallery.jsx
import React from 'react';
import './Gallery.css';
import GalleryCard from '../component/GalleryCard';
import logo from '../assets/logo.png'; // Correct image import

const galleryItems = [
  {
    image: logo,
    title: 'Live Music Night',
    description: 'Join us every Friday for a night of live music by local bands.',
    offer: 'Happy Hours: 5-7 PM',
  },
  {
    image: logo,
    title: 'Cocktail Specials',
    description: 'Savor our unique cocktails crafted by expert mixologists.',
    offer: '2 for 1 Cocktails: 8-10 PM',
  },
  {
    image: logo,
    title: 'Sports Screening',
    description: 'Catch all the live sports action on our big screens.',
    offer: 'Free Nachos with Beer',
  },
  {
    image: logo,
    title: 'Weekend Brunch',
    description: 'Enjoy a delightful brunch with bottomless mimosas.',
    offer: '20% off on Bottomless Drinks',
  },
  {
    image: logo,
    title: 'Wine Tasting Event',
    description: 'Join us for an exclusive wine tasting experience.',
    offer: 'Complimentary Cheese Board',
  },
  {
    image: logo,
    title: 'Pub Quiz Night',
    description: 'Test your knowledge and win amazing prizes at our weekly pub quiz.',
    offer: 'Free Drink for Participants',
  },
  {
    image: logo,
    title: 'Comedy Night',
    description: 'Laugh out loud with performances by local comedians.',
    offer: 'Buy 1 Get 1 on Beers',
  },
  {
    image: logo,
    title: 'Karaoke Night',
    description: 'Sing your heart out every Wednesday at our Karaoke Night.',
    offer: 'Free Shot with Every Performance',
  },
  {
    image: logo,
    title: 'DJ Night',
    description: 'Dance the night away with our resident DJ spinning the best tunes.',
    offer: 'Free Entry Before 10 PM',
  },
  {
    image: logo,
    title: 'Ladies Night',
    description: 'Celebrate ladies night with exclusive offers just for women.',
    offer: 'Free Cocktails for Ladies',
  },
];

const Gallery = () => {
  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Pub Features & Offers</h1>
      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <GalleryCard
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
            offer={item.offer}
            className="gallery-card"
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
