
import React from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';

import doctorImage from '../assets/doctor.png';
import patientImage from '../assets/patient.png';

import './HomePage.css';

const HomePage = () => {
  const currentDate = new Date().toLocaleString();

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 200,
    config: { duration: 1000 }
  });
  return (
    <div>
      <nav className="navbar">
        <Link to="http://127.0.0.1:8000/admin/" className="navbar-brand">
          Hospital Management Portal
        </Link>

        <div className="nav-items">
          <Link to="/blood-bank">Blood Bank</Link>
          <Link to="/about">About Us</Link>
          <Link to="/support">Support</Link>
          <span className="current-time">{currentDate}</span>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center portal-box">
            <h1 className="display-4">Hospital Management Portal</h1>
            <p className="lead mt-3">Select your role to access the dashboard.</p>

            <div className="card-group">

              <div className="card custom-card">
                <div className="card-header custom-card-header">
                  <i className="fas fa-stethoscope"></i> Doctor
                </div>
                <div className="card-body">
                  <p>Manage appointments, view patient history, and streamline operations.</p>
                  <animated.img style={fadeIn} src={doctorImage} alt="Doctor" width="80" />
                  <Link to="/doctor-login" className="btn btn-primary custom-btn">
                    Doctor Login
                  </Link>
                </div>
              </div>

              <div className="card custom-card">
                <div className="card-header custom-card-header">
                  <i className="fas fa-user-injured"></i> Patient
                </div>
                <div className="card-body">
                  <p>Access your medical records, schedule consultations, and more.</p>
                  <animated.img style={fadeIn} src={patientImage} alt="Patient" width="80" />
                  <Link to="/patient-login" className="btn btn-primary custom-btn">
                    Patient Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
