


// import React, { useState, useEffect } from 'react';
// import './PatientLogin.css';
// import { Link, useNavigate } from 'react-router-dom';

// function PatientLogin() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());
  
//   const navigate = useNavigate();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentDateTime(new Date().toLocaleString());
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const patientData = {
//       email: email,
//       password: password
//     };

//     fetch("http://127.0.0.1:8000/api/patient/login/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(patientData),
//     })
//     .then((response) => {
//       if (!response.ok) {
//         return response.json().then(data => {
//           alert("Invalid Credentials!");
//         });
//       }
//       return response.json();
//     })
//     .then((data) => {
//       if (data){
//         localStorage.setItem("patient_email", email);
//         navigate("/patient-account");
//       }
//     })
//     .catch((error) => {
//       alert(error);
//     });
//   };

//   return (
//     <div className="patient-login-background">
//       <nav className="navbar">
//         <span className="navbar-brand">Hospital Management Portal</span>
//         <div className="nav-items">
//           <Link to="/">Home</Link>
//           <Link to="/About">About Us</Link>
//           <Link to="/support">Support</Link>
//           <span className="current-time">{currentDateTime}</span>
//         </div>
//       </nav>
//       <div className="login-container">
//         <div className="login-box">
//           <h2>Patient Login</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label>Email Address</label>
//               <input 
//                 type="email" 
//                 value={email} 
//                 onChange={(e) => setEmail(e.target.value)} 
//                 required 
//                 className="form-control" 
//                 placeholder="Enter your email address"
//               />
//             </div>
//             <div className="form-group">
//               <label>Password</label>
//               <input 
//                 type="password" 
//                 value={password} 
//                 onChange={(e) => setPassword(e.target.value)} 
//                 required 
//                 className="form-control" 
//                 placeholder="Enter your password"
//               />
//             </div>
//             <button type="submit" className="btn btn-primary">Login</button>
//           </form>
//           <div className="signup-option mt-3">
//             Don't have an account? <Link to="/patient-signup">Create New Account</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PatientLogin;

// PatientLogin.js
// PatientLogin.js
import React, { useState, useEffect } from 'react';
import './PatientLogin.css';
import { Link, useNavigate } from 'react-router-dom';

function PatientLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

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
          setError("Invalid Credentials! Please check your email or password and try again.");
        });
      }
      return response.json();
    })
    .then((data) => {
      if (data){
        localStorage.setItem("patient_email", email);
        navigate("/patient-account");
      }
    })
    .catch((error) => {
      alert(error);
    });
  };

  return (
    <div className="patient-login-background">
      <nav className="patient-navbar">
        <span className="patient-navbar-brand">Hospital Management Portal</span>
        <div className="patient-nav-items">
          <Link to="/">Home</Link>
          <Link to="/About">About Us</Link>
          <Link to="/support">Support</Link>
          <span className="patient-current-time">{currentDateTime}</span>
        </div>
      </nav>
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
          <div className="patient-signup-option mt-3">
            Don't have an account? <Link to="/patient-signup">Create New Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientLogin;
