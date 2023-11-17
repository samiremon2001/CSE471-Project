// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './DoctorProfileUpdate.css'; // Import the CSS file

// function DoctorProfileUpdate() {
//     const [doctorData, setDoctorData] = useState({
//         first_name: '',
//         last_name: '',
//         password: '',
//         speciality: '',
//         department: '',
//         email: '', // Include the email field for updating
//     });

//     const navigate = useNavigate(); // Access to the navigate function for redirection

//     useEffect(() => {
//         // Fetch the current doctor's profile data and populate the state variables
//         // You can fetch this data using the doctor's email stored in localStorage
//         const email = localStorage.getItem('doctor_email');

//         // Fetch the doctor's data based on the email and update the state
//         fetch(`http://127.0.0.1:8000/api/get_doctor_by_email/?email=${email}`)
//             .then((response) => response.json())
//             .then((data) => {
//                 setDoctorData({
//                     ...data, // Include the email field
//                 });
//             })
//             .catch((error) => {
//                 console.error('Error fetching doctor data:', error);
//             });
//     }, []);

//     const handleUpdateProfile = (e) => {
//         e.preventDefault();

//         // Send a PUT request to update the doctor's profile
//         fetch('http://127.0.0.1:8000/api/doctors/update-profile/', {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(doctorData),
//         })
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Error updating profile');
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 // Handle successful profile update
//                 // You can redirect the user to the doctor's account page here
//                 navigate('/doctor-account');
//             })
//             .catch((error) => {
//                 console.error('Error updating profile:', error);
//             });
//     };

//     return (
//         <div className="doctor-profile-update-background">
//             <h1>Update Your Profile</h1>
//             <form onSubmit={handleUpdateProfile}>
//                 <input
//                     type="text"
//                     value={doctorData.first_name}
//                     onChange={(e) => setDoctorData({ ...doctorData, first_name: e.target.value })}
//                     placeholder="First Name"
//                 />
//                 <input
//                     type="text"
//                     value={doctorData.last_name}
//                     onChange={(e) => setDoctorData({ ...doctorData, last_name: e.target.value })}
//                     placeholder="Last Name"
//                 />
//                 <input
//                     type="password"
//                     value={doctorData.password}
//                     onChange={(e) => setDoctorData({ ...doctorData, password: e.target.value })}
//                     placeholder="Password"
//                 />
//                 <input
//                     type="text"
//                     value={doctorData.speciality}
//                     onChange={(e) => setDoctorData({ ...doctorData, speciality: e.target.value })}
//                     placeholder="Speciality"
//                 />
//                 <input
//                     type="text"
//                     value={doctorData.department}
//                     onChange={(e) => setDoctorData({ ...doctorData, department: e.target.value })}
//                     placeholder="Department"
//                 />
//                 <button type="submit">Update Profile</button>
//             </form>
//         </div>
//     );
// }

// export default DoctorProfileUpdate;

// 

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './DoctorProfileUpdate.css';

// function DoctorProfileUpdate() {
//     const [doctorData, setDoctorData] = useState({
//         first_name: '',
//         last_name: '',
//         password: '',
//         speciality: '',
//         department: '',
//         email: '', // Include the email field for updating
//         availability: '', // New field for availability
//     });

//     const navigate = useNavigate();

//     useEffect(() => {
//         // Fetch the current doctor's profile data and populate the state variables
//         const email = localStorage.getItem('doctor_email');
//         fetch(`http://127.0.0.1:8000/api/get_doctor_by_email/?email=${email}`)
//             .then((response) => response.json())
//             .then((data) => {
//                 setDoctorData({
//                     ...data,
//                 });
//             })
//             .catch((error) => {
//                 console.error('Error fetching doctor data:', error);
//             });
//     }, []);

//     const handleUpdateProfile = (e) => {
//         e.preventDefault();

//         fetch('http://127.0.0.1:8000/api/doctors/update-profile/', {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(doctorData),
//         })
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Error updating profile');
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 navigate('/doctor-account');
//             })
//             .catch((error) => {
//                 console.error('Error updating profile:', error);
//             });
//     };

//     return (
//         <div className="doctor-profile-update-background">
//             <div className="form-container">
//                 <h1>Update Your Profile</h1>
//                 <form onSubmit={handleUpdateProfile}>
//                     <div className="form-group">
//                         <input
//                             type="text"
//                             value={doctorData.first_name}
//                             onChange={(e) => setDoctorData({ ...doctorData, first_name: e.target.value })}
//                             placeholder="First Name"
//                             required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="text"
//                             value={doctorData.last_name}
//                             onChange={(e) => setDoctorData({ ...doctorData, last_name: e.target.value })}
//                             placeholder="Last Name"
//                             required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="password"
//                             value={doctorData.password}
//                             onChange={(e) => setDoctorData({ ...doctorData, password: e.target.value })}
//                             placeholder="Password"
//                             required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="text"
//                             value={doctorData.speciality}
//                             onChange={(e) => setDoctorData({ ...doctorData, speciality: e.target.value })}
//                             placeholder="Speciality"
//                         />
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="text"
//                             value={doctorData.department}
//                             onChange={(e) => setDoctorData({ ...doctorData, department: e.target.value })}
//                             placeholder="Department"
//                         />
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="text"
//                             value={doctorData.availability}
//                             onChange={(e) => setDoctorData({ ...doctorData, availability: e.target.value })}
//                             placeholder="Availability (e.g., 'Mon-Fri 9am-5pm')"
//                         />
//                     </div>
//                     <div className="button-container">
//                         <button type="submit">Update Profile</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default DoctorProfileUpdate;
// DoctorProfileUpdate.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './DoctorProfileUpdate.css';

function DoctorProfileUpdate() {
    const [doctorData, setDoctorData] = useState({
        first_name: '',
        last_name: '',
        password: '',
        speciality: '',
        department: '',
        email: '', 
        availability: '', 
    });

    const navigate = useNavigate();

    useEffect(() => {
      
        const email = localStorage.getItem('doctor_email');
        fetch(`http://127.0.0.1:8000/api/get_doctor_by_email/?email=${email}`)
            .then((response) => response.json())
            .then((data) => {
                setDoctorData({
                    ...data,
                });
            })
            .catch((error) => {
                console.error('Error fetching doctor data:', error);
            });
    }, []);

    const handleUpdateProfile = (e) => {
        e.preventDefault();

        fetch('http://127.0.0.1:8000/api/doctors/update-profile/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(doctorData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error updating profile');
                }
                return response.json();
            })
            .then((data) => {
                navigate('/doctor-account');
            })
            .catch((error) => {
                console.error('Error updating profile:', error);
            });
    };

    return (
        <div>
            <nav className="navbar">
                <Link to="/" className="navbar-brand">
                    Hospital Management Portal
                </Link>

                <div className="nav-items">
                    <span className="current-time">{new Date().toLocaleString()}</span>
                    
                </div>
            </nav>

            <div className="doctor-profile-update-background">
                <div className="form-container">
                    <h1>Update Your Profile</h1>
                    <form onSubmit={handleUpdateProfile}>
                        <div className="form-group">
                            <input
                                type="text"
                                value={doctorData.first_name}
                                onChange={(e) => setDoctorData({ ...doctorData, first_name: e.target.value })}
                                placeholder="First Name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                value={doctorData.last_name}
                                onChange={(e) => setDoctorData({ ...doctorData, last_name: e.target.value })}
                                placeholder="Last Name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                value={doctorData.password}
                                onChange={(e) => setDoctorData({ ...doctorData, password: e.target.value })}
                                placeholder="Password"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                value={doctorData.speciality}
                                onChange={(e) => setDoctorData({ ...doctorData, speciality: e.target.value })}
                                placeholder="Speciality"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                value={doctorData.department}
                                onChange={(e) => setDoctorData({ ...doctorData, department: e.target.value })}
                                placeholder="Department"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                value={doctorData.availability}
                                onChange={(e) => setDoctorData({ ...doctorData, availability: e.target.value })}
                                placeholder="Availability (e.g., 'Mon-Fri 9am-5pm')"
                            />
                        </div>
                        <div className="button-container">
                            <button type="submit">Update Profile</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DoctorProfileUpdate;
