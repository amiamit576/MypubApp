import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminSideBar.css'; 

function AdminSideBar() {
  const navigate = useNavigate();

  return (
    <div className="AdminSideBar">
      <h3>Admin Options</h3>
      <ul>
        <li className="sidebar-item users" onClick={() => navigate('/admin-dashboard/admin-users')}>
          Admin Users
        </li>
        <li className="sidebar-item products" onClick={() => navigate('/admin-dashboard/admin-products')}>
          Admin Products
        </li>
        <li className="sidebar-item reservation" onClick={() => navigate('/admin-dashboard/admin-reservation')}>
          Reservation Details
        </li>
        <li className="sidebar-item feedback" onClick={() => navigate('/admin-dashboard/admin-feedback')}>
          Feedback Details
        </li>
      </ul>
    </div>
  );
}

export default AdminSideBar;
