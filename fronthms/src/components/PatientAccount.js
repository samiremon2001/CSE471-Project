
// import './PatientAccount.css';
// import { Link } from 'react-router-dom';
// import React from 'react';

// function PatientAccount() {
//   return (
//     <div className="patient-account-background">
//       <nav className="navbar">
//         <span className="navbar-brand">Hospital Management Portal</span>
//         <div className="nav-items"></div>
//       </nav>
//       <div className="dashboard-container">
//         <h1>Welcome, Patient [Name]</h1>
//         <p>You have the following options:</p>
        
//         <div className="dashboard-options">
//           <div className="dashboard-box">
//             <h2>View Appointments</h2>
//             <p>See your upcoming and past appointments</p>
//             <Link to="/view-patient-appointments" className="box-link">View Appointments</Link>
//           </div>
//           <div className="dashboard-box">
//             <h2>Book Appointment</h2>
//             <p>Book an appointment with your preferred doctor</p>
//             <Link to="/book-appointment" className="box-link">Book Appointment</Link>
//           </div>
//           <div className="dashboard-box">
//             <h2>Consultation</h2>
//             <p>Consult with a doctor online</p>
//             <Link to="/online-consultation" className="box-link">Start Consultation</Link>
//           </div>
//           <div className="dashboard-box">
//             <h2>Book Room</h2>
//             <p>Reserve a room for your upcoming stay</p>
//             <Link to="/book-room" className="box-link">Book Room</Link>
//           </div>
//           <div className="dashboard-box">
//             <h2>View Prescription</h2>
//             <p>View prescribed medications and instructions</p>
//             <Link to="/view-prescription" className="box-link">View Prescription</Link>
//           </div>
//           <div className="dashboard-box">
//             <h2>View Payment</h2>
//             <p>View your payments and download receipts</p>
//             <Link to="/view-payment" className="box-link">View Payment</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PatientAccount;

// 13/11
// import React, { useState, useEffect } from 'react';
// import './PatientAccount.css';
// import { useNavigate, Link } from 'react-router-dom';

// function PatientAccount() {
//     const [patient, setPatient] = useState(null);
//     const navigate = useNavigate(); // Added useNavigate hook

//     useEffect(() => {
//         const email = localStorage.getItem("patient_email");

//         if(!email) {
//             navigate("/patient-login");
//         } else {
//             fetch(`http://127.0.0.1:8000/api/get_patient_by_email/?email=${email}`)
//             .then(response => response.json())
//             .then(data => {
//                 setPatient(data);
//             })
//             .catch(error => {
//                 console.error("Error fetching patient details:", error);
//             });
//         }
//     }, [navigate]);

//     const handleLogout = () => {
//         localStorage.removeItem("patient_email");
//         navigate("/patient-login"); // Navigate to patient login page
//     };

//     if(!patient) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="patient-account-background">
//             <nav className="navbar">
//                 <span className="navbar-brand">Hospital Management Portal</span>
//                 <div className="nav-items">
//                     {/* Other nav items */}
//                     <button onClick={handleLogout} className="logout-button">Logout</button> {/* Added Logout Button */}
//                 </div>
//             </nav>
//             <div className="dashboard-container">
//                 <h1>Welcome, {patient.first_name} {patient.last_name}</h1>
//                 <p>You have the following options:</p>
                
//                 <div className="dashboard-options">
//                 <div className="dashboard-box">
//                         <h2>Check Doctors and Departments</h2>
//                         <p>Find Doctor details,speciality and Departments</p>
//                         <Link to="/doctor-details" className="box-link">Check Doctor Details</Link>
//                     </div>
//                     <div className="dashboard-box">
//                         <h2>View and Book Appointments</h2>
//                         <p>See your appointments and Book an appointment with your preferred doctor</p>
//                         <Link to="/view-patient-appointments" className="box-link">View Appointments</Link>
//                     </div>
//                     {/* <div className="dashboard-box">
//                         <h2>Book Appointment</h2>
//                         <p>Book an appointment with your preferred doctor</p>
//                         <Link to="/book-appointment" className="box-link">Book Appointment</Link>
//                     </div> */}
//                     <div className="dashboard-box">
//                         <h2>Consultation</h2>
//                         <p>Consult with a doctor online</p>
//                         <Link to="/online-consultation" className="box-link">Start Consultation</Link>
//                     </div>
//                     <div className="dashboard-box">
//                         <h2>Book Cabin/Wards</h2>
//                         <p>Book wards and cabins for better treatment</p>
//                         <Link to="/book-room" className="box-link">Book Cabin/Wards</Link>
//                     </div>
//                     <div className="dashboard-box">
//                         <h2>View Prescription</h2>
//                         <p>View prescribed medications and instructions</p>
//                         <Link to="/view-prescription" className="box-link">View Prescription</Link>

//                     </div>
//                     <div className="dashboard-box">
//                         <h2>View Bill</h2>
//                         <p>View your Bill and download receipts</p>
//                         <Link to="/view-bill" className="box-link">View Bill</Link>
//                     </div>
                    

//                     {/* New dashboard box for checking blood bank */}
//                     {/* <div className="dashboard-box">
//                         <h2>Check Blood Bank</h2>
//                         <p>View available blood supplies and types</p>
//                         <Link to="/check-blood-bank" className="box-link">Check Blood Bank</Link>
//                     </div> */}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default PatientAccount;
import React, { useState, useEffect } from 'react';
import './PatientAccount.css';
import { useNavigate, Link } from 'react-router-dom';

function PatientAccount() {
    const [patient, setPatient] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem("patient_email");

        if (!email) {
            navigate("/patient-login");
        } else {
            fetch(`http://127.0.0.1:8000/api/get_patient_by_email/?email=${email}`)
                .then(response => response.json())
                .then(data => {
                    setPatient(data);
                })
                .catch(error => {
                    console.error("Error fetching patient details:", error);
                });
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("patient_email");
        navigate("/patient-login");
    };

    if (!patient) {
        return <div>Loading...</div>;
    }

    return (
        <div className="patient-account-background">
            <nav className="navbar">
                <span className="navbar-brand">Hospital Management Portal</span>
                <div className="nav-items">
                    <span className="current-time">{new Date().toLocaleString()}</span>
                    <Link to="/" className="logout-link" onClick={handleLogout}>
                        Logout
                    </Link>
                </div>
            </nav>
            <div className="dashboard-container">
                <h1>Welcome, {patient.first_name} {patient.last_name}</h1>
                <p>You have the following options:</p>

                <div className="dashboard-options">
                    <div className="dashboard-box">
                        <h2>Check Doctors and Departments</h2>
                        <p>Find Doctor details, speciality, and Departments</p>
                        <Link to="/doctor-details" className="box-link">
                            Check Doctor Details
                        </Link>
                    </div>
                    <div className="dashboard-box">
                        <h2> Book Appointments</h2>
                        <p>See your appointments and Book an appointment with your preferred doctor</p>
                        <Link to="/appointment" className="box-link">
                           Book Online Appointments
                        </Link>
                    </div>
                    <div className="dashboard-box">
                        <h2>Consultation</h2>
                        <p>Consult with a doctor online</p>
                        <Link to="/online-consultation" className="box-link">
                            Start Consultation
                        </Link>
                    </div>
                    <div className="dashboard-box">
                        <h2>Book Cabin/Wards</h2>
                        <p>Book wards and cabins for better treatment</p>
                        <Link to="/book-ward" className="box-link">
                        Book Ward
                        </Link>
                        <Link to="/book-cabin" className="box-link">
                        Book Cabin
                        </Link>
                    </div>
                    <div className="dashboard-box">
                        <h2>View Prescription</h2>
                        <p>View prescribed medications and instructions</p>
                        <Link to="/view-prescription" className="box-link">
                            View Prescription
                        </Link>
                    </div>
                    <div className="dashboard-box">
                        <h2>View Bill</h2>
                        <p>View your Bill and download receipts</p>
                        <Link to="/view-bill" className="box-link">
                            View Bill
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientAccount;
