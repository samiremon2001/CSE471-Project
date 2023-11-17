// import React, { useState, useEffect } from 'react';
// import './DoctorDetails.css';

// function DoctorDetails() {
//     const [departmentWiseDoctors, setDepartmentWiseDoctors] = useState({});

//     useEffect(() => {
//         fetch('http://127.0.0.1:8000/api/doctors/')
//             .then(response => response.json())
//             .then(data => {
//                 const groupedData = data.reduce((acc, doctor) => {
//                     const department = doctor.department || 'Other';
//                     acc[department] = acc[department] || [];
//                     acc[department].push(doctor);
//                     return acc;
//                 }, {});
//                 setDepartmentWiseDoctors(groupedData);
//             })
//             .catch(error => {
//                 console.error("Error fetching doctors:", error);
//             });
//     }, []);

//     return (
//         <div className="doctor-availability-page">
//             {Object.entries(departmentWiseDoctors).map(([department, doctors]) => (
//                 <section key={department} className="department-section">
//                     <h2 className="department-title">{department}</h2>
//                     <div className="table-container">
//                         <table className="doctors-table">
//                             <thead>
//                                 <tr>
//                                     <th>Name</th>
//                                     <th>Email</th>
//                                     <th>Phone</th>
//                                     <th>Degree</th>
//                                     <th>Medical College</th>
//                                     <th>Speciality</th>
//                                     <th>Availability</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {doctors.map((doctor, index) => (
//                                     <tr key={index}>
//                                         <td>{doctor.first_name} {doctor.last_name}</td>
//                                         <td>{doctor.email}</td>
//                                         <td>{doctor.phone}</td>
//                                         <td>{doctor.degree}</td>
//                                         <td>{doctor.medical_college}</td>
//                                         <td>{doctor.speciality}</td>
//                                         <td>{doctor.availability}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </section>
//             ))}
//         </div>
//     );
// }

// export default DoctorDetails;
// DoctorDetails.js
// DoctorDetails.js
import React, { useState, useEffect } from 'react';
import './DoctorDetails.css';

function DoctorDetails() {
    const [departmentWiseDoctors, setDepartmentWiseDoctors] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/doctors/')
            .then(response => response.json())
            .then(data => {
                const groupedData = data.reduce((acc, doctor) => {
                    const department = doctor.department || 'Other';
                    acc[department] = acc[department] || [];
                    acc[department].push(doctor);
                    return acc;
                }, {});
                setDepartmentWiseDoctors(groupedData);
            })
            .catch(error => {
                console.error("Error fetching doctors:", error);
            });
    }, []);

    const filterDoctors = (doctors) => {
        return doctors.filter((doctor) =>
            doctor.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.last_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    return (
        <div className="doctor-details-page">
            <nav className="navbar">
                <span className="navbar-brand">Hospital Management Portal</span>
                <div className="nav-items">
                <span className="current-time">{new Date().toLocaleString()}</span>
                </div>
            </nav>

            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="doctor-availability-page">
                {Object.entries(departmentWiseDoctors).map(([department, doctors]) => (
                    <section key={department} className="department-section">
                        <h2 className="department-title">{department}</h2>
                        <div className="doctors-list">
                            {filterDoctors(doctors).map((doctor, index) => (
                                <div key={index} className="doctor-card">
                                    <div className="doctor-name">{doctor.first_name} {doctor.last_name}</div>
                                    <div className="doctor-info">
                                        <p>Email: {doctor.email}</p>
                                        <p>Phone: {doctor.phone}</p>
                                        <p>Degree: {doctor.degree}</p>
                                        <p>Medical College: {doctor.medical_college}</p>
                                        <p>Speciality: {doctor.speciality}</p>
                                        <p>Availability: {doctor.availability}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}

export default DoctorDetails;
