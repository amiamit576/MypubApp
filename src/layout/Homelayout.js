import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../component/Header.jsx';
import Footer from '../component/Footer.jsx';
import './Homelayout.css';

function Homelayout() {
  return (
    <div className="layout-container">
      <div className="header-container">
        <Header />
      </div>
      <main className="main-content">
        <Outlet />
      </main>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default Homelayout;
