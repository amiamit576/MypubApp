import React, { useState, useEffect } from 'react';
import axiosInstance from './../../services/axiosInstance';
import './AdminUsers.css'

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users from the API
  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/admin/users');
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error.response?.data?.message);
    }
  };

  // Handle user role update
  const handleRoleUpdate = async (userId, newRole) => {
    try {
      await axiosInstance.put(`/admin/users/${userId}/role`, { role: newRole });
      fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error.response?.data?.message);
    }
  };

  // Handle user deletion
  const handleUserDelete = async (userId) => {
    try {
      await axiosInstance.delete(`/admin/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <section className="admin-users-section">
      <h3 className="admin-users-title">Users</h3>
      <table className="admin-users-table">
        <thead>
          <tr>
            <th className="admin-users-th">ID</th>
            <th className="admin-users-th">Email</th>
            <th className="admin-users-th">Role</th>
            <th className="admin-users-th">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="admin-users-tr">
              <td className="admin-users-td">{user._id}</td>
              <td className="admin-users-td">{user.email}</td>
              <td className="admin-users-td">{user.role}</td>
              <td className="admin-users-td">
                <button className="admin-users-btn admin-users-btn-make-admin" onClick={() => handleRoleUpdate(user._id, 'admin')}>Make Admin</button>
                <button className="admin-users-btn admin-users-btn-make-user" onClick={() => handleRoleUpdate(user._id, 'user')}>Make User</button>
                <button className="admin-users-btn admin-users-btn-delete" onClick={() => handleUserDelete(user._id)}>Delete User</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default AdminUsers;
