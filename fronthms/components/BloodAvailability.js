
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BloodAvailability.css';
import Navbar from './Navbar'; 
const BloodAvailability = () => {
  const [bloodAvailability, setBloodAvailability] = useState([]);

  useEffect(() => {
    const fetchBloodAvailability = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/blood-availability/');
        setBloodAvailability(response.data);
      } catch (error) {
        console.error('Error fetching blood availability:', error);
      }
    };

    fetchBloodAvailability();
  }, []);

  return (
    <div>
      <Navbar
        includeHomeLink
        includeBloodBankLink
        includeSupportLink
        includeAboutLink
      />
      <div className="blood-availability-container">
        <div className="blood-availability-content">
          <h2>Blood Availability</h2>
          <table>
            <thead>
              <tr>
                <th className="blood-group-column">Blood Group</th>
                <th className="total-bags-column">Total Bags</th>
              </tr>
            </thead>
            <tbody>
              {bloodAvailability.map((item) => (
                <tr key={item.id} className="table-row">
                  <td className="blood-group-column">{item.blood_group}</td>
                  <td className="total-bags-column">
                    <div className="bag-box">{item.total_bags} bags available</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BloodAvailability;
