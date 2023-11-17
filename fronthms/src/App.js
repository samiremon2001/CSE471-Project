// // import logo from './logo.svg';
// // import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;


// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// import HomePage from "./components/HomePage";
// import DoctorLogin from "./components/DoctorLogin";
// import DoctorSignUp from "./components/DoctorSignUp";
// import PatientLogin from "./components/PatientLogin";
// import PatientSignUp from "./components/PatientSignUp";
// import PatientAccount from "./components/PatientAccount";
// import DoctorAccount from './components/DoctorAccount';
// import { SessionProvider } from './components/SessionContext';

// import 'bootstrap/dist/css/bootstrap.min.css';


// function App() {
//   return (
//     <SessionProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/doctor-login" element={<DoctorLogin />} />
//           <Route path="/doctor-signup" element={<DoctorSignUp />} />
//           <Route path="/patient-login" element={<PatientLogin />} />
//           <Route path="/patient-signup" element={<PatientSignUp />} />
//           <Route path="/doctor-account" element={<DoctorAccount />} />
//           <Route path="/patient-account" element={<PatientAccount />} />
//         </Routes>
//       </Router>
//       <SessionProvider>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import DoctorLogin from "./components/DoctorLogin";
import DoctorSignUp from "./components/DoctorSignUp";
import PatientLogin from "./components/PatientLogin";
import PatientSignUp from "./components/PatientSignUp";
import PatientAccount from "./components/PatientAccount";
import DoctorAccount from './components/DoctorAccount';
import About from './components/About';
import AddPrescription from './components/AddPrescription';
import ViewPrescription from './components/ViewPrescription';
import DoctorProfileUpdate from './components/DoctorProfileUpdate'; 
import DoctorDetails from './components/DoctorDetails'; 
import BookWard from './components/BookWard'; 
import BookCabin from './components/BookCabin'; 
import ViewBill from './components/ViewBill'; 
import PatientDetails from './components/PatientDetails'; 
import PatientPrescription from './components/PatientPrescription'; 
import BloodBank from './components/BloodBank'; 



// Make sure the path to SessionContext is correct
import { SessionProvider } from './components/SessionContext';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <SessionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/doctor-login" element={<DoctorLogin />} />
          <Route path="/doctor-signup" element={<DoctorSignUp />} />
          <Route path="/patient-login" element={<PatientLogin />} />
          <Route path="/patient-signup" element={<PatientSignUp />} />
          <Route path="/doctor-account" element={<DoctorAccount />} />
          <Route path="/patient-account" element={<PatientAccount />} />
          <Route path="/add-prescription" element={<AddPrescription />} />
          <Route path="/About" element={<About />} />
          <Route path="/view-prescription" element={<ViewPrescription />} />
          <Route path="/doctor-profile-update" element={<DoctorProfileUpdate />} /> 
          <Route path="/doctor-details" element={<DoctorDetails />} /> 
          <Route path="/book-ward" element={<BookWard/>} />
          <Route path="/book-cabin" element={<BookCabin />} />  
          <Route path="/view-bill" element={<ViewBill/>} /> 
          <Route path="/patient-details" element={<PatientDetails/>} /> 
          <Route path="/patient-prescription" element={<PatientPrescription/>} /> 
          <Route path="/blood-bank" element={<BloodBank/>} /> 
          
           
          
          

        

        </Routes>
      </Router>
    </SessionProvider>
  );
}

export default App;
