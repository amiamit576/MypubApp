// src/routes/AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homelayout from '../layout/Homelayout';
import Home from '../pages/Home';
import Join from '../pages/Join';
import SpecialEvent from '../pages/SpecialEvent';
import Reservation from '../pages/Reservation';
import Gallery from '../pages/Gallery';
import Contact from '../pages/Contact';
import Menu from '../pages/Menu';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import AuthForm from '../pages/AuthForm';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homelayout />}>
        <Route index element={<Home />} />
        <Route path="join" element={<Join />} />
        <Route path="special-event" element={<SpecialEvent />} />
        <Route path="reservation" element={<Reservation />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<Contact />} />
        <Route path="authForm" element={<AuthForm />} />
        <Route path="menu" element={<Menu />} />
        <Route path="cart" element={<Cart />} />
        <Route path='checkout' element={<Checkout/>}/>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
