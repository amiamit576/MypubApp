import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import aboutimg from '../assets/about.jpg';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="home-container">
        <div className="home-text-overlay">
          <h1>Welcome to MyBar</h1>
          <p>Enjoy your life to the fullest</p>
          <button
            className="home-menu-button"
            onClick={() => navigate('/menu')}
          >
            Explore Our Menu
          </button>
        </div>
      </div>

      <div className="home-catalog-container">
        <div className="home-catalog-item" onClick={()=>navigate('/reservation')}>
          <h2 >Reservations</h2>
          <p>Book a table to enjoy an evening with friends.</p>
        </div>

        <div className="home-catalog-item" onClick={()=>navigate('/special-event')}>
          <h2>Special Events</h2>
          <p>Join us for live music, sports screenings, and more!</p>
        </div>
      </div>

      <div className="home-about-container">
        <div className="home-about-content">
          <img src={aboutimg} alt="About MyBar" className="home-about-image" />
          <div className="home-about-text">
            <h2>About Us</h2>
            <p>
              MyBar is your go-to destination for the perfect blend of great drinks, cozy ambiance, and lively entertainment.
              Whether you're here to relax after a long day or celebrate a special occasion, we offer an experience like no other.
              Our carefully crafted cocktails, delicious bar bites, and attentive staff will make sure you have an unforgettable time.
              Come and be a part of our community – where every night is one to remember.
            </p>
          </div>
        </div>
      </div>

   
    </>
  );
}

export default Home;
