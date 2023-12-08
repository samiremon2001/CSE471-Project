
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; 
import './CommonStyles.css'; 

function PatientAppointment() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const patientEmail = localStorage.getItem("patient_email");

    if (!patientEmail) {
      navigate("/patient-login");
    } else {
      
      fetch(`http://127.0.0.1:8000/api/patient-appointments/?patient_email=${patientEmail}`)
        .then(response => response.json())
        .then(data => setAppointments(data))
        .catch(error => console.error("Error fetching appointments:", error));
    }
  }, [navigate]);

  return (
    <div className="patient-appointment-page">
      <Navbar />
      <div className="container1">
        <h1>Check Your Appointments with Doctors</h1>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Doctor Email</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.appointment_date}</td>
                <td>{appointment.appointment_time}</td>
                <td>{appointment.doctor_email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientAppointment;
