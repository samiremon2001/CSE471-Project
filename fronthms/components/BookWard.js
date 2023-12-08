
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BookWard.css';

function BookWard() {
  const [formData, setFormData] = useState({
    floorNo: '',
    wardType: '',
    wardNo: '',
    name: '',
    email: '',
    totalDays: '',
    bookedDate: new Date().toISOString().split('T')[0],
  });

  const [availableWards, setAvailableWards] = useState([]);
  const [wardTypes, setWardTypes] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const email = localStorage.getItem("patient_email");
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate('/patient-login');
    } else {
      fetchAvailableWards();
    }
  }, [email, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'floorNo') {
      const filteredWards = availableWards.filter(ward => ward.floor_no === value);
      const types = new Set(filteredWards.map(ward => ward.ward_type));
      setWardTypes(Array.from(types));
    }
  };

  const fetchAvailableWards = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/available-wards/');
      setAvailableWards(response.data);
    } catch (error) {
      setErrorMessage('Failed to fetch available wards. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.totalDays <= 0) {
      setErrorMessage('Total days must be greater than zero.');
      return;
    }
    try {
      await axios.post('http://127.0.0.1:8000/api/book-ward/', formData);
      setSuccessMessage('Ward booked successfully!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.response?.data.detail || 'Failed to book ward. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
  
    <div className="book-ward-page">
      <div className="book-ward-container">
        <div className="content-wrapper">
          <h1 className="book-ward-title">Book a Ward</h1>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <form onSubmit={handleSubmit} className="book-ward-form">
            <div className="form-row">
              <div className="form-group">
                <label>Floor No:</label>
                <input
                  type="text"
                  name="floorNo"
                  value={formData.floorNo}
                  onChange={handleChange}
                  placeholder="Enter Floor"
                  required
                />
              </div>
              <div className="form-group">
                <label>Ward Type:</label>
                <select
                  name="wardType"
                  value={formData.wardType}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled> Ward Type</option>
                  {wardTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Ward No:</label>
                <select
                  name="wardNo"
                  value={formData.wardNo}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select Ward</option>
                  {availableWards
                    .filter(ward => ward.floor_no === formData.floorNo && ward.ward_type === formData.wardType)
                    .map(ward => (
                      <option key={ward.ward_no} value={ward.ward_no}>{ward.ward_no}</option>
                    ))}
                </select>
              </div>
              <div className="form-group">
                <label>Total Days:</label>
                <input
                  type="number"
                  name="totalDays"
                  value={formData.totalDays}
                  onChange={handleChange}
                  placeholder="Enter Total Days"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Booked Date:</label>
              <input
                type="date"
                name="bookedDate"
                value={formData.bookedDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit" className="book-ward-button">Book Ward</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookWard;
