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
import AdminDashboard from '../pages/AdminDashboard';
import PrivateRoute from '../routes/PrivateRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Homelayout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="special-event" element={<SpecialEvent />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<Contact />} />
        <Route path="authForm" element={<AuthForm />} />
        <Route path="menu" element={<Menu />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute allowedRoles={['user', 'admin']} />}>
          <Route path="join" element={<Join />} />
          <Route path="reservation" element={<Reservation />} />
        </Route>

        {/* Admin Protected Route */}
        <Route element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
