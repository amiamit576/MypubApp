import React, { useState } from "react";
import "./SpecialEvent.css"; 

const SpecialEvent = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneCode: "",
    phoneNumber: "",
    attendees: "",
    attendanceType: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Handle form submission logic
  };

  return (
    <div className="specialevents-container">
      <section className="specialevents-details">
        <h2 className="specialevents-title">Special Events</h2>
        <p className="specialevents-description">
          Located in Gardens Galleria Mall, Noida, TIME MACHINE invites guests
          to experience a contemporary take on traditional Indian cuisine. The
          restaurant, which also includes an intimate lounge, is accentuated in
          hues of orange and blue. The dramatic backdrop of the venue will
          seamlessly transition guests from a stunning dining experience to an
          amazing night out.
        </p>
        <ul className="specialevents-info">
          <li><strong>RESTAURANT:</strong></li>
          <li>Main Dining Room: 174 pax</li>
          <li>Sushi Bar: 15 pax</li>
          <li>Private Dining Room: 26 pax</li>
          <li><strong>BAR & LOUNGE:</strong></li>
          <li>Bar counter: 12 pax</li>
          <li>Lounge: 30 pax</li>
          <li><strong>TOTAL SEATED:</strong> Up to 257 pax</li>
          <li><strong>FULL EVENT SPACE:</strong> Up to 310 pax</li>
        </ul>
      </section>

      <section className="specialevents-registration">
        <h3 className="specialevents-form-title">Register your Event</h3>
        <form className="specialevents-form" onSubmit={handleSubmit}>
          <div className="specialevents-input-group">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="specialevents-input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <div className="specialevents-phone-group">
              <input
                type="text"
                name="phoneCode"
                placeholder="code"
                value={formData.phoneCode}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="specialevents-input-group">
            <input
              type="number"
              name="attendees"
              placeholder="How many will you be?"
              value={formData.attendees}
              onChange={handleInputChange}
              required
            />
            <select
              name="attendanceType"
              value={formData.attendanceType}
              onChange={handleInputChange}
              required
            >
              <option value="">How will you attend?</option>
              <option value="Online">Online</option>
              <option value="In Person">In Person</option>
            </select>
          </div>

          <button type="submit" className="specialevents-submit">
            Register
          </button>
        </form>
      </section>
    </div>
  );
};

export default SpecialEvent;
