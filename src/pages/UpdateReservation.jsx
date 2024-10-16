import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateReservation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    partySize: '',
    date: '',
    timeSlotFrom: '',
    timeSlotTo: '',
    seatingPreference: '',
    additionalDetails: '',
  });

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/reservation/getReservationById/${id}`, {
          withCredentials: true,
        });
        const reservationData = response.data;
        setFormData({
          partySize: reservationData.partySize,
          date: new Date(reservationData.date).toISOString().split('T')[0], // Format date for input
          timeSlotFrom: reservationData.timeSlot.from,
          timeSlotTo: reservationData.timeSlot.to || '', // Handle missing 'to' time
          seatingPreference: reservationData.seatingPreference,
          additionalDetails: reservationData.additionalDetails || '',
        });
      } catch (err) {
        toast.error('Failed to fetch reservation');
      }
    };
    fetchReservation();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/v1/reservation/updateReservation/${id}`, formData, {
        withCredentials: true,
      });
      toast.success('Reservation updated successfully');
      navigate(`/reservation/${id}`); // Redirect after update
    } catch (err) {
      toast.error('Failed to update reservation');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Update Reservation</h1>
      <form onSubmit={handleUpdate}>

        <div>
          <label>Party Size:</label>
          <input
            type="number"
            name="partySize"
            value={formData.partySize}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Time Slot (From):</label>
          <input
            type="time"
            name="timeSlotFrom"
            value={formData.timeSlotFrom}
            onChange={handleChange}
            required
          />
        </div>

       

        <div>
          <label>Seating Preference:</label>
          <select
            name="seatingPreference"
            value={formData.seatingPreference}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Indoor">Indoor</option>
            <option value="Window">Window</option>
          </select>
        </div>

        <div>
          <label>Additional Details:</label>
          <textarea
            name="additionalDetails"
            value={formData.additionalDetails}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Update Reservation</button>
      </form>
    </div>
  );
};

export default UpdateReservation;
