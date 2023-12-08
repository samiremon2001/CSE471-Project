import React from 'react';
import Navbar from './Navbar';
import './About.css';
import hospitalImage from '../assets/thankyou.png';
function About() {
    return (
        <div className="about-page-wrapper">
            <Navbar includeHomeLink includeBloodBankLink includeAboutLink />
            <div className="about-container">
                <div className="header-container">
                    <h1 className="about-header">Mediwave Hospital</h1>
                    <img src={hospitalImage} alt="Hospital" className="hospital-image" />
                </div>
                <div className="about-content">
                    <div className="about-card">
                        <h2>Mission</h2>
                        <p>Providing compassionate healthcare with advanced technology and skilled professionals.</p>
                    </div>
                    <div className="about-card">
                        <h2>Services</h2>
                        <ul>
                            <li>24/7 Emergency Care</li>
                            <li>Outpatient & Inpatient Services</li>
                            <li>Surgical Units</li>
                            <li>Rehabilitation & Diagnostics</li>
                            <li>Doctor & Patient Portals</li>
                            <li>Blood Bank & Test Services</li>
                            <li>Ward Cabin Booking & Appointments</li>
                        </ul>
                    </div>
                    <div className="about-card">
                        <h2>Contact Us</h2>
                        <p>Email: mediwave@hospital.bd<br />Phone: +1234567890<br />15 Rankin Street, Wari, Dhaka, 1203</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default About;
