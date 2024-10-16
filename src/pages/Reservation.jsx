import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Reservation.css";

const Reservation = () => {
  const [reservationData, setReservationData] = useState({
    partySize: 2,
    date: new Date(),
    tableNumber: null,
    timeSlotFrom: null, // Single time slot
    seatingPreference: "",
    additionalDetails: "",
  });

  const tableNumbers = Array.from({ length: 50 }, (_, i) => i + 1); // Tables 1 to 50
  const timeSlots = [
    "07:00", "07:30", "08:00", "08:30", "09:00",
    "09:30", "10:00", "10:30"
  ]; // Available time slots

  const seatingOptions = ["Indoor", "Outdoor", "Window"]; // Seating preferences

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (newDate) => {
    setReservationData((prevData) => ({
      ...prevData,
      date: newDate,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/reservation/createReservation", 
        {
          ...reservationData,
          partySize: parseInt(reservationData.partySize),
          tableNumber: parseInt(reservationData.tableNumber),
          timeSlot: { from: reservationData.timeSlotFrom } 
        },
        {
          withCredentials: true // Ensures cookies are sent with the request
        }
      );

      console.log("Reservation successful:", response.data);
      // Handle success: maybe show a confirmation message or navigate
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  return (
    <div className="reservation-container">
      <h2 className="reservation-title">Request a reservation</h2>
      <p className="reservation-description">
        Select your details and we’ll assign the best table for you
      </p>

      <form className="reservation-form" onSubmit={handleSubmit}>
        {/* Party Size and Table Number (2 items in row) */}
        <div className="reservation-row two-items">
          <div className="reservation-field">
            <label className="reservation-label" htmlFor="party-size">Party size</label>
            <select
              id="party-size"
              name="partySize"
              value={reservationData.partySize}
              onChange={handleChange}
              className="reservation-select"
            >
              {[...Array(20).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1} guest{num + 1 > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="reservation-field">
            <label className="reservation-label" htmlFor="table-number">Table Number</label>
            <select
              id="table-number"
              name="tableNumber"
              value={reservationData.tableNumber || ""}
              onChange={handleChange}
              className="reservation-select"
            >
              <option value="" disabled>Select a table</option>
              {tableNumbers.map((table) => (
                <option key={table} value={table}>
                  Table {table}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date and Time Slot (2 items in row) */}
        <div className="reservation-row two-items">
          <div className="reservation-field">
            <label className="reservation-label" htmlFor="date">Date</label>
            <DatePicker
              selected={reservationData.date}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy"
              minDate={new Date()}
              className="reservation-input"
            />
          </div>

          <div className="reservation-field">
            <label className="reservation-label" htmlFor="time-slot-from">Time Slot</label>
            <select
              id="time-slot-from"
              name="timeSlotFrom"
              value={reservationData.timeSlotFrom || ""}
              onChange={handleChange}
              className="reservation-select"
            >
              <option value="" disabled>Select a time slot</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Seating Preference */}
        <div className="reservation-field">
          <label className="reservation-label" htmlFor="seating-preference">Seating Preference</label>
          <select
            id="seating-preference"
            name="seatingPreference"
            value={reservationData.seatingPreference}
            onChange={handleChange}
            className="reservation-select"
          >
            <option value="" disabled>Select seating preference</option>
            {seatingOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Additional Details */}
        <div className="reservation-field">
          <label className="reservation-label" htmlFor="additional-details">Additional Details</label>
          <textarea
            id="additional-details"
            name="additionalDetails"
            value={reservationData.additionalDetails}
            onChange={handleChange}
            placeholder="Add any specific requests (e.g., allergies, special occasions)"
            className="reservation-textarea"
          />
        </div>

        <button className="reservation-submit" type="submit">Request Now</button>
      </form>
    </div>
  );
};

export default Reservation;
