import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ReservationDetailPage = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/reservation/getReservationById/${id}`, {
          withCredentials: true,
        });
        setReservation(response.data);
      } catch (err) {
        console.error('Error fetching reservation:', err.response || err);
        setError('Failed to fetch reservation');
      } finally {
        setLoading(false);
      }
    };
    fetchReservation();
  }, [id]);

  if (loading) {
    return <p>Loading reservation details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Reservation Details</h1>
      {reservation ? (
        <div>
          <p><strong>ID:</strong> {reservation._id}</p>
          <p><strong>Date:</strong> {new Date(reservation.date).toLocaleDateString()}</p>
          <p><strong>Time Slot:</strong> {reservation.timeSlot.from} to {reservation.timeSlot.to ? reservation.timeSlot.to : 'N/A'}</p>
          <p><strong>Party Size:</strong> {reservation.partySize}</p>
          <p><strong>Table Number:</strong> {reservation.tableNumber}</p>
          <p><strong>Seating Preference:</strong> {reservation.seatingPreference}</p>
          <p><strong>Additional Details:</strong> {reservation.additionalDetails || 'None'}</p>
        </div>
      ) : (
        <p>No reservation details found.</p>
      )}
    </div>
  );
};

export default ReservationDetailPage;
