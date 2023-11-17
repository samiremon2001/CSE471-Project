import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './About.css';

function About() {
    const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(new Date().toLocaleString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="about-page-wrapper">
            <nav className="navbar">
                <span className="navbar-brand">Hospital Management Portal</span>
                <div className="nav-items">
                    <Link to="/">Home</Link>
                    <Link to="/about-us">About Us</Link>
                    <Link to="/support">Support</Link>
                    <span className="current-time">{currentDateTime}</span>
                </div>
            </nav>
            <div className="about-container">
                <h1 className="about-header">About Our Hospital</h1>
                <div className="about-content">
                    <div className="about-card">
                        <h2>Our Mission</h2>
                        <p>Providing the best medical care with advanced facilities and dedicated professionals.</p>
                    </div>
                    <div className="about-card">
                        <h2>Services</h2>
                        <ul>
                            <li>24/7 Emergency Care</li>
                            <li>Outpatient & Inpatient Services</li>
                            <li>Advanced Surgical Units</li>
                            <li>Rehabilitation Services</li>
                            <li>Diagnostic Imaging</li>
                            <li>Laboratory Services</li>
                        </ul>
                    </div>
                    <div className="about-card">
                        <h2>Contact Us</h2>
                        <p>You can reach out to us at contact@ourhospital.com or call us at +1234567890.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
