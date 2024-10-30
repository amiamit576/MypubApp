import React, { useEffect, useState } from 'react';
import axiosInstance from '../../services/axiosInstance';
import './ReservationControlPage.css';

const ReservationControlPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/reservation/getAllReservationsAdmin');
      setReservations(response.data);
    } catch (error) {
      setError('Failed to fetch reservations');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (reservation) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/reservation/AdmindeleteReservation/${id}`);
      setReservations(reservations.filter((res) => res._id !== id));
    } catch (error) {
      console.error('Failed to delete reservation', error);
    }
  };

  const handleUpdateSubmit = async (updatedReservation) => {
    try {
      const response = await axiosInstance.put(`/reservation/AdminupdateReservation/${updatedReservation._id}`, updatedReservation);
      setReservations(reservations.map((res) => (res._id === updatedReservation._id ? response.data : res)));
      closeModal();
    } catch (error) {
      console.error('Failed to update reservation', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReservation(null);
  };

  return (
    <div className="reservation-control-page">
      <h1 className="reservation-control-page-title">Reservation Control</h1>
      {loading ? (
        <div className="reservation-control-page-loading">Loading reservations...</div>
      ) : error ? (
        <div className="reservation-control-page-error">{error}</div>
      ) : (
        <table className="reservation-control-page-table">
          <thead className="reservation-control-page-table-header">
            <tr className="reservation-control-page-table-header-row">
              <th className="reservation-control-page-table-header-cell">Customer Name</th>
              <th className="reservation-control-page-table-header-cell">Email</th>
              <th className="reservation-control-page-table-header-cell">Table Number</th>
              <th className="reservation-control-page-table-header-cell">Time Slot</th>
              <th className="reservation-control-page-table-header-cell">Reservation Date</th>
              <th className="reservation-control-page-table-header-cell">Actions</th>
            </tr>
          </thead>
          <tbody className="reservation-control-page-table-body">
            {reservations.map((reservation) => (
              <tr key={reservation._id} className="reservation-control-page-table-row">
                <td className="reservation-control-page-table-cell">{`${reservation.user.firstName} ${reservation.user.lastName}`}</td>
                <td className="reservation-control-page-table-cell">{reservation.user.email}</td>
                <td className="reservation-control-page-table-cell">{reservation.tableNumber}</td>
                <td className="reservation-control-page-table-cell">{reservation.timeSlot.from}</td>
                <td className="reservation-control-page-table-cell">{new Date(reservation.date).toLocaleDateString()}</td>
                <td className="reservation-control-page-table-cell reservation-control-page-actions-cell">
                  <button className="reservation-control-page-action-button reservation-control-page-view-update-button" onClick={() => handleUpdate(reservation)}>
                    Get Details
                  </button>
                  <button className="reservation-control-page-action-button reservation-control-page-delete-button" onClick={() => handleDelete(reservation._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && selectedReservation && (
        <Modal reservation={selectedReservation} onClose={closeModal} onUpdate={handleUpdateSubmit} />
      )}
    </div>
  );
};

const Modal = ({ reservation, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({ ...reservation });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="reservation-control-page-modal">
      <div className="reservation-control-page-modal-overlay" onClick={onClose}></div>
      <div className="reservation-control-page-modal-content">
        <h2 className="reservation-control-page-modal-title">Update Reservation</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Customer Name:
              <input type="text" name="customerName" value={`${reservation.user.firstName} ${reservation.user.lastName}`} disabled />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input type="email" name="email" value={reservation.user.email} disabled />
            </label>
          </div>
          <div>
            <label>
              Table Number:
              <input type="text" name="tableNumber" value={formData.tableNumber} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Time Slot:
              <input type="text" name="timeSlot" value={formData.timeSlot.from} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Reservation Date:
              <input type="date" name="date" value={formData.date.split('T')[0]} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Party Size:
              <input type="number" name="partySize" value={formData.partySize} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Seating Preference:
              <input type="text" name="seatingPreference" value={formData.seatingPreference} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Additional Details:
              <input type="text" name="additionalDetails" value={formData.additionalDetails} onChange={handleChange} />
            </label>
          </div>

          <button type="submit" className="reservation-control-page-update-button">Update</button>
        </form>
        <button className="reservation-control-page-close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ReservationControlPage;
