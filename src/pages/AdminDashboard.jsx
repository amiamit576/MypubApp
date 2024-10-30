import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSideBar from './admin/AdminSideBar'; 
import './AdminDashboard.css'; 

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <AdminSideBar />
      </div>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
