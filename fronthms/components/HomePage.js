import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Chatbox from './Chatbox'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import doctorImage from '../assets/doctor.png';
import patientImage from '../assets/patient.png';
import './HomePage.css';

const HomePage = () => {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 200,
    config: { duration: 1000 }
  });
  const [chatboxVisible, setChatboxVisible] = useState(false);
  const toggleChatbox = () => {
    setChatboxVisible(!chatboxVisible);
  };

  return (
    <div className="home-page">
      <Navbar includeAdminLink includeHomeLink includeBloodBankLink includeSupportLink includeAboutLink />

      <div className="main-container">
        <div className="login-section">
          <div className="login-box doctor-login">
            <animated.img style={fadeIn} src={doctorImage} alt="Doctor" />
            <div className="login-info">
              <h2>Doctor Portal</h2>
              <p>Manage appointments, view patient history, and streamline operations.</p>
              <Link to="/doctor-login" className="btn btn-primary">Doctor Login</Link>
            </div>
          </div>

          <div className="login-box patient-login">
            <animated.img style={fadeIn} src={patientImage} alt="Patient" />
            <div className="login-info">
              <h2>Patient Portal</h2>
              <p>Access your medical records, schedule consultations, and more.</p>
              <Link to="/patient-login" className="btn btn-primary">Patient Login</Link>
            </div>
          </div>
        </div>
      </div>

      
      <div className="chat-icon" onClick={toggleChatbox}>
        <FontAwesomeIcon icon={faComment} />
      </div>
      {chatboxVisible && <Chatbox />}
    </div>
  );
}
export default HomePage;
