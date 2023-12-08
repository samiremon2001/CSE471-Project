
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './DoctorLogin.css'; 
import Navbar from './Navbar';

function DoctorLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

   
    fetch("http://127.0.0.1:8000/api/doctor/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Invalid Credentials');
      }
      return response.json();
    })
    .then(data => {
      localStorage.setItem("doctor_email", email);
      
      setTimeout(() => {
        setLoading(false);
        navigate("/doctor-account");
      }, 1500); 
    })
    .catch(error => {
      setLoading(false);
      setError("Invalid Credentials! Please check your email or password and try again.");
    });
  };

  return (
    <div className="doctor-login-background">
        <Navbar  includeHomeLink includeBloodBankLink includeAboutLink includeSupportLink/>
      <div className="doctor-login-container">
        <div className="doctor-login-box">
          <h2>Doctor Login</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="doctor-form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="doctor-form-control" 
                placeholder="Enter your email address"
              />
            </div>
            <div className="doctor-form-group">
              <label>Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="doctor-form-control" 
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="doctor-btn doctor-btn-primary">Login</button>
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
          <div className="doctor-signup-option mt-3">
            Don't have an account? <Link to="/doctor-signup">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorLogin;
