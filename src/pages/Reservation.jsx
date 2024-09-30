import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Reservation.css"; // Ensure this CSS file is created for styling

const Reservation = () => {
  const [partySize, setPartySize] = useState(2);
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  const timeSlots = [
    "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM",
    "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM", "12:00 PM"
  ];

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  return (
    <div className="reservation-container">
      <h2 className="reservation-title">Request a reservation</h2>
      <p className="reservation-description">
        Select your details and we’ll try to get the best seats for you
      </p>

      <div className="reservation-form">
        <div className="reservation-field">
          <label className="reservation-label" htmlFor="party-size">Party size</label>
          <select
            id="party-size"
            value={partySize}
            onChange={(e) => setPartySize(e.target.value)}
            className="reservation-select"
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1} guest{num + 1 > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="reservation-field">
          <label className="reservation-label" htmlFor="date">Date</label>
          <DatePicker
            selected={date}
            onChange={(newDate) => setDate(newDate)}
            dateFormat="MM/dd/yyyy"
            minDate={new Date()}
            className="reservation-input"
          />
        </div>

        <div className="reservation-field">
          <label className="reservation-label" htmlFor="time">Time</label>
          <select
            id="time"
            value={selectedTime || ""}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="reservation-select"
          >
            {timeSlots.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>

      <hr />

      <div className="reservation-timeslots">
        <p className="reservation-timeslots-title">Choose an available time slot:</p>
        <div className="reservation-slots">
          {timeSlots.map((time) => (
            <button
              key={time}
              className={`reservation-slot-button ${selectedTime === time ? "active" : ""}`}
              onClick={() => handleTimeSelect(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <button className="reservation-submit">Request Now</button>
    </div>
  );
};

export default Reservation;
