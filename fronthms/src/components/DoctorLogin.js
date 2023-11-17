

// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import './DoctorLogin.css';

// function DoctorLogin() {
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

//     const doctorData = {
//       email: email,
//       password: password
//     };

//     fetch("http://127.0.0.1:8000/api/doctor/login/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(doctorData),
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
//         localStorage.setItem("doctor_email", email);
//         navigate("/doctor-account");
//       }
//     })

//     .catch((error) => {
//       alert(error);
//     });
//   };

//   return (
//     <div className="doctor-login-background">
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
//           <h2>Doctor Login</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label>Email Address</label>
//               <input 
//                 type="email" 
//                 value={email} 
//                 onChange={(e) => setEmail(e.target.value)} 
//                 required 
//                 className="form-control" 
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
//               />
//             </div>
//             <button type="submit" className="btn btn-primary">Login</button>
//           </form>
//           <div className="signup-option mt-3">
//             Don't have an account? <Link to="/doctor-signup">Create New Account</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DoctorLogin;


import React, { useState, useEffect } from 'react';
import './DoctorLogin.css';
import { Link, useNavigate } from 'react-router-dom';

function DoctorLogin() {
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

    const doctorData = {
      email: email,
      password: password
    };

    fetch("http://127.0.0.1:8000/api/doctor/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doctorData),
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
        localStorage.setItem("doctor_email", email);
        navigate("/doctor-account");
      }
    })
    .catch((error) => {
      alert(error);
    });
  };

  return (
    <div className="doctor-login-background">
      <nav className="doctor-navbar">
        <span className="doctor-navbar-brand">Hospital Management Portal</span>
        <div className="doctor-nav-items">
          <Link to="/">Home</Link>
          <Link to="/About">About Us</Link>
          <Link to="/support">Support</Link>
          <span className="doctor-current-time">{currentDateTime}</span>
        </div>
      </nav>
      <div className="doctor-login-container">
        <div className="doctor-login-box">
        <h2 style={{ color: '#3B5998' }}>Doctor Login</h2>

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
          <div className="doctor-signup-option mt-3">
            Don't have an account? <Link to="/doctor-signup">Create New Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorLogin;