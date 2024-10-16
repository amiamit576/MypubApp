import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './UserDetailPage.css';

function UserDetailPage() {
  const [userDetails, setUserDetails] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const reservationsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/user/getLoggedInUserDetails', {
          withCredentials: true,
        });
        setUserDetails(response.data.user);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch user details');
        toast.error('Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  useEffect(() => {
    const fetchUserReservations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/reservation/getAllReservations', {
          withCredentials: true,
        });
        setReservations(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch reservations');
        toast.error('Failed to fetch reservations');
      }
    };
    fetchUserReservations();
  }, []);

  const handleUpdateReservation = (reservationId) => {
    navigate(`/reservation/update/${reservationId}`);
  };

  const handleDeleteReservation = async (reservationId) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/reservation/deleteReservation/${reservationId}`, {
        withCredentials: true,
      });
      toast.success('Reservation deleted successfully');
      setReservations(reservations.filter((r) => r._id !== reservationId));
    } catch (err) {
      toast.error('Failed to delete reservation');
    }
  };

  const indexOfLastReservation = currentPage * reservationsPerPage;
  const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
  const currentReservations = reservations.slice(indexOfFirstReservation, indexOfLastReservation);

  const nextPage = () => {
    if (currentPage < Math.ceil(reservations.length / reservationsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <p className="user-details__loading">Loading user details...</p>;
  }

  if (error) {
    return <p className="user-details__error">{error}</p>;
  }

  return (
    <div className="user-details">
      <h1 className="user-details__title">User Details</h1>
      {userDetails && (
        <div className="user-details__info">
          <p className="user-details__item">First Name: {userDetails.firstName}</p>
          <p className="user-details__item">Last Name: {userDetails.lastName}</p>
          <p className="user-details__item">Email: {userDetails.email}</p>
        </div>
      )}

      <h2 className="reservations__title">Your Reservations</h2>
      {reservations.length > 0 ? (
        <>
          <table className="reservations__table">
            <thead className="reservations__table-header">
              <tr>
                <th className="reservations__table-header-cell">Reservation ID</th>
                <th className="reservations__table-header-cell">Date</th>
                <th className="reservations__table-header-cell">Time Slot</th>
                <th className="reservations__table-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentReservations.map((reservation) => (
                <tr className="reservations__table-row" key={reservation._id}>
                  <td className="reservations__table-cell" onClick={() => navigate(`/reservation/${reservation._id}`)}>{reservation._id}</td>
                  <td className="reservations__table-cell">{new Date(reservation.date).toLocaleDateString()}</td>
                  <td className="reservations__table-cell">{reservation.timeSlot.from}</td>
                  <td className="reservations__table-cell">
                    <button className="reservations__action-btn" onClick={() => handleUpdateReservation(reservation._id)}>Update</button>
                    <button className="reservations__action-btn" onClick={() => handleDeleteReservation(reservation._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
            <span>Page {currentPage}</span>
            <button onClick={nextPage} disabled={currentPage === Math.ceil(reservations.length / reservationsPerPage)}>Next</button>
          </div>
        </>
      ) : (
        <p className="reservations__no-data">No reservations found.</p>
      )}
    </div>
  );
}

export default UserDetailPage;
