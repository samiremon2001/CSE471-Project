// BloodBank.js

import React, { useState, useEffect } from 'react';
import './BloodBank.css';

const BloodBank = () => {
  const [patients, setPatients] = useState([]);
  const [showBloodDetails, setShowBloodDetails] = useState(false);

  useEffect(() => {
    // Fetch blood bank details from your Django API
    fetch('http://127.0.0.1:8000/api/blood-bank/')
      .then((response) => response.json())
      .then((data) => setPatients(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const toggleBloodDetails = () => {
    setShowBloodDetails(!showBloodDetails);
  };

  return (
    <div className="blood-bank-container">
      <div className="dashboard-header">
        <h1>Blood Bank </h1>
      </div>
      <div className="dashboard-menu">
        <button onClick={toggleBloodDetails}>Blood Details</button>
        {/* Add more buttons or sections for other dashboard features here */}
      </div>

      {showBloodDetails && (
        <div className="blood-details-section">
          <h2>Blood Group Details</h2>
          <div className="table-container">
            <table className="blood-bank-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Blood Group</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.email}>
                    <td>{`${patient.first_name} ${patient.last_name}`}</td>
                    <td>{patient.phone}</td>
                    <td>{patient.email}</td>
                    <td>{patient.bloodGroup}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodBank;
