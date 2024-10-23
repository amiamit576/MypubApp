import React from 'react';
import AdminUsers from './admin/AdminUsers';
import AdminProducts from './admin/AdminProducts';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {/* User Management Section */}
      <section>
        <AdminUsers />
      </section>

      {/* Product Management Section */}
      <section>
        <AdminProducts />
      </section>
    </div>
  );
};

export default AdminDashboard;

