
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; 
import './CommonStyles.css'; 

function ViewAppointments() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const doctorEmail = localStorage.getItem("doctor_email");

    if (!doctorEmail) {
      navigate("/doctor-login");
    } else {
      fetch(`http://127.0.0.1:8000/api/doctor-appointments/?doctor_email=${doctorEmail}`)
        .then(response => response.json())
        .then(data => setAppointments(data))
        .catch(error => console.error("Error fetching appointments:", error));
    }
  }, [navigate]);

  return (
    <div className="view-appointments-body">
      <Navbar />
      <div className='container1'>
        <h1>Check Your Appointments with Patients</h1>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Patient Name</th>
              <th>Patient Email</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.appointment_date}</td>
                <td>{appointment.appointment_time}</td>
                <td>{appointment.patient_name}</td>
                <td>{appointment.patient_email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewAppointments;
