// function DoctorAccount() {
//  ;

//   // Here, you'd typically fetch and display the doctor's data
//   return (
//     <div>
//       <h1>Welcome, Doctor [Name]</h1>
//       {/* Display doctor's information */}
//     </div>
//   );
// }
// export default DoctorAccount;


// import './DoctorAccount.css';
// import { Link } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
// function DoctorAccount() {
//   const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());
  
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentDateTime(new Date().toLocaleString());
//     }, 1000);
    
//     return () => clearInterval(interval);
//   }, []);

//   // Here, you'd typically fetch and display the doctor's data
//   return (
//     <div className="doctor-login-background">
//       <nav className="navbar">
//         <span className="navbar-brand">Hospital Management Portal</span>
//         <div className="nav-items">
//           <Link to="/">Home</Link>
//           <Link to="/about-us">About Us</Link>
//           <Link to="/support">Support</Link>
//           <span className="current-time">{currentDateTime}</span>
//         </div>
//       </nav>
//       <div>
//         <h1>Welcome, Doctor [Name]</h1>
//         {/* Display doctor's information */}
//       </div>
//     </div>  // This closing div corresponds to the doctor-login-background div
//   );
// }

// export default DoctorAccount;

// 13/11

// import './DoctorAccount.css';
// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';

// function DoctorAccount() {
//     const [doctor, setDoctor] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const email = localStorage.getItem("doctor_email");

//         if(!email) {
//             navigate("/doctor-login");
//         } else {
//             fetch(`http://127.0.0.1:8000/api/get_doctor_by_email/?email=${email}`)
//             .then(response => response.json())
//             .then(data => {
//                 setDoctor(data);
//             })
//             .catch(error => {
//                 console.error("Error fetching doctor details:", error);
//             });
//         }
//     }, [navigate]);

//     const handleLogout = () => {
//         localStorage.removeItem("doctor_email");
//         navigate("/doctor-login");
//     };

//     if(!doctor) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="doctor-account-background">
//             <nav className="navbar">
//                 <span className="navbar-brand">Hospital Management Portal</span>
//                 <div className="nav-items">
//                     {/* Other nav items */}
//                     <button onClick={handleLogout} className="logout-button">Logout</button>
//                 </div>
//             </nav>
//             <div className="dashboard-container">
//                 <h1>Welcome, Dr. {doctor.first_name} {doctor.last_name}</h1>
//                 <Link to="/doctor-profile-update">Update Your Profile</Link>

//                 <p>You have the following options:</p>
                
//                 <div className="dashboard-options">
//                     <div className="dashboard-box">
//                         <h2>View Patients</h2>
//                         <p>View and manage your patient records</p>
//                         <Link to="/view-patients" className="box-link">View Patients</Link>
//                     </div>
//                     <div className="dashboard-box">
//                         <h2>View Appointments</h2>
//                         <p>View and manage your appointments</p>
//                         <Link to="/view-appointments" className="box-link">View Appointments</Link>
//                     </div>
//                     <div className="dashboard-box">
//                         <h2>Add Prescription</h2>
//                         <p>Add a new prescription for a patient</p>
//                         <Link to="/add-prescription" className="box-link">Add Prescription</Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default DoctorAccount;

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './DoctorAccount.css';

function DoctorAccount() {
    const [doctor, setDoctor] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem("doctor_email");

        if (!email) {
            navigate("/doctor-login");
        } else {
            fetch(`http://127.0.0.1:8000/api/get_doctor_by_email/?email=${email}`)
                .then(response => response.json())
                .then(data => {
                    setDoctor(data);
                })
                .catch(error => {
                    console.error("Error fetching doctor details:", error);
                });
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("doctor_email");
        navigate("/doctor-login");
    };

    if (!doctor) {
        return <div>Loading...</div>;
    }

    return (
        <div className="doctor-account-background">
            <nav className="navbar">
                <Link to="http://127.0.0.1:8000/admin/" className="navbar-brand">
                    Hospital Management Portal
                </Link>

                <div className="nav-items">
                    <span className="current-time">{new Date().toLocaleString()}</span>
                    <Link to="/" className="logout-link" onClick={handleLogout}>
                        Logout
                    </Link>
                </div>
            </nav>
            <div className="dashboard-container">
                <h1>Welcome, Dr. {doctor.first_name} {doctor.last_name}</h1>
                <div className="profile-section">
                    <Link to="/doctor-profile-update" className="profile-link">Update Your Profile</Link>
                </div>

                <p>You have the following options:</p>

                <div className="dashboard-options">
                    <div className="dashboard-box">
                        <h2>View Patients</h2>
                        <p>View and manage your patient records</p>
                        <Link to="/patient-details" className="box-link">View Patients</Link>
                    </div>
                    <div className="dashboard-box">
                        <h2>View Appointments</h2>
                        <p>View and manage your appointments</p>
                        <Link to="/view-appointments" className="box-link">View Appointments</Link>
                    </div>
                    <div className="dashboard-box">
                        <h2>Add Prescription</h2>
                        <p>Add a new prescription for a patient</p>
                        <Link to="/add-prescription" className="box-link">Add Prescription</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoctorAccount;
