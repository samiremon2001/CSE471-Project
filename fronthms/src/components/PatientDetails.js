import React from 'react';
import { Link } from 'react-router-dom';
import './PatientDetails.css'; // Make sure this is correctly linked

function PatientDetails() {
    // Implement fetching and displaying patient details if needed

    return (
        <div className="patient-details-container">
            <h1 className="patient-details-title">Patient Details</h1>
            <div className="patient-details-options">
                {/* Add patient details and options here */}
                <Link to="/patient-prescription" className="patient-details-option-box">
                    <h2>View Prescription</h2>
                    <p>View patient's medical prescriptions</p>
                </Link>
                {/* Add more links to different patient functionalities */}
            </div>
        </div>
    );
}

export default PatientDetails;
