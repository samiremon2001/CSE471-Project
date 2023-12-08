import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './Supports.css';
const Supports = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/create-support/',
        formData
      );
      console.log('Response:', response);

      if (response.status === 201) {
        setSuccessMessage('Thanks for sending us your feedback!');
        setErrorMessage('');
      } else {
        setSuccessMessage('');
        setErrorMessage('Error submitting support request');
      }
    } catch (error) {
      console.error('Support request error:', error);

      setSuccessMessage('');
      setErrorMessage(
        'Error submitting support request. Please check the console for details.'
      );
    }
  };
  return (
    <div className="support">
      <Navbar fixed={true} />
      <div className="content-container">
        <div className="title-box">
          <h2>Feel free to reach out to us for any support.</h2>
        </div>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form className="support-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default Supports;
