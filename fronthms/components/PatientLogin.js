import React, { useState } from 'react';
import './PatientLogin.css';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function PatientLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true); 
    setError('');

    const patientData = {
      email: email,
      password: password
    };

    fetch("http://127.0.0.1:8000/api/patient/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientData),
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(data => {
          setLoading(false);
          setError("Invalid Credentials! Please check your email or password and try again.");
        });
      }
      return response.json();
    })
    .then((data) => {
      if (data){
        localStorage.setItem("patient_email", email);
       
        setTimeout(() => {
          setLoading(false);
          navigate("/patient-account");
        }, 1500); 
      }
    })
    .catch((error) => {
      setLoading(false);
      alert(error);
    });
  };

  return (
    <div className="patient-login-background">
      <Navbar  includeHomeLink includeBloodBankLink includeAboutLink includeSupportLink/>
      <div className="patient-login-container">
        <div className="patient-login-box">
          <h2 style={{ color: '#3B5998' }}>Patient Login</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="patient-form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="patient-form-control" 
                placeholder="Enter your email address"
              />
            </div>
            <div className="patient-form-group">
              <label>Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="patient-form-control" 
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="patient-btn patient-btn-primary">Login</button>
          </form>
         
          {loading && (
            <div className="ekg-loader">
              <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
              
                <path d="M0 20 l10 10 l10 -20 l10 20 l10 -10 l20 0 l10 -10 l10 10 l10 -20 l10 20 l10 -10 l10 0"
                      fill="none" stroke="black" strokeWidth="1">
                  <animate attributeName="stroke-dashoffset" from="1000" to="0" dur="1s" repeatCount="indefinite" />
                </path>
              </svg>
            </div>
          )}
          <div className="patient-signup-option mt-3">
            Don't have an account? <Link to="/patient-signup">Create New Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientLogin;

