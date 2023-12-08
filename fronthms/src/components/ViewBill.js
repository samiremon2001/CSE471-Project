
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { downloadSingleWardBillPDF, downloadSingleCabinBillPDF, downloadSingleTestBillPDF } from './pdfGenerator';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import './ViewBill.css';

function ViewBill() {
  const [wardBills, setWardBills] = useState([]);
  const [cabinBills, setCabinBills] = useState([]);
  const [testBills, setTestBills] = useState([]);
  const [selectedTab, setSelectedTab] = useState('ward');
  const navigate = useNavigate(); 

  useEffect(() => {
    async function fetchBills() {
      const patientEmail = localStorage.getItem("patient_email");

      if (!patientEmail) {
        navigate("/patient-login");
      } else {
        try {
          const wardResponse = await axios.get(`http://127.0.0.1:8000/api/patient/ward-bills/?patient_email=${patientEmail}`);
          setWardBills(wardResponse.data);

          const cabinResponse = await axios.get(`http://127.0.0.1:8000/api/patient/cabin-bills/?patient_email=${patientEmail}`);
          setCabinBills(cabinResponse.data);

          const testResponse = await axios.get(`http://127.0.0.1:8000/api/test-bills/?patient_email=${patientEmail}`);
          setTestBills(testResponse.data);
        } catch (error) {
          console.error("Error fetching bills:", error);
        }
      }
    }

    fetchBills();
  }, [navigate]);

  const handleDownloadPDF = async (bill, type) => {
    let additionalDetails = {};
    try {
   
      const response = await axios.get(`http://127.0.0.1:8000/api/additional-details/${bill.id}`);
      additionalDetails = response.data;
    } catch (error) {
      console.error("Error fetching additional details:", error);
    }

    if (type === 'ward') {
      downloadSingleWardBillPDF({ ...bill, ...additionalDetails });
    } else if (type === 'cabin') {
      downloadSingleCabinBillPDF({ ...bill, ...additionalDetails });
    } else if (type === 'test') {
      downloadSingleTestBillPDF({ ...bill, ...additionalDetails });
    }
  };

  return (
    <div className="viewbill-body">
      <Navbar includePatientHomeLink />
      <div className="view-bill-container">
        <h1>Bill Details</h1>
        <div className="tabs">
          <div className={`tab ${selectedTab === 'ward' ? 'active' : ''}`} onClick={() => setSelectedTab('ward')}>
            Ward Bills
          </div>
          <div className={`tab ${selectedTab === 'cabin' ? 'active' : ''}`} onClick={() => setSelectedTab('cabin')}>
            Cabin Bills
          </div>
          <div className={`tab ${selectedTab === 'test' ? 'active' : ''}`} onClick={() => setSelectedTab('test')}>
            Test Bills
          </div>
        </div>
        <div className="bill-cards">
          {(selectedTab === 'ward' ? wardBills : selectedTab === 'cabin' ? cabinBills : testBills).map(bill => (
            <div className="bill-card" key={bill.id}>
              <div className="card-header">
                <div style={{ color: '#000' }}>
                  {selectedTab === 'ward' ? `Ward No: ${bill.ward_no}` :
                    selectedTab === 'cabin' ? `Cabin No: ${bill.cabin_no}` :
                    `Test Bill`}
                </div>
              </div>
              <div className="card-body">
              
                {selectedTab !== 'test' && (
                  <>
                    <p>Name: {bill.booked_by}</p>
                    <p>Email: {bill.email}</p>
                    <p>Floor No: {bill.floor_no}</p>
                    <p>Booked Date: {bill.booked_date}</p>
                    <p>Total Days: {bill.total_days}</p>
                  </>
                )}

                {selectedTab === 'test' && (
                  <>
                    <p>Doctor Name: {bill.doctor_name}</p>
                    <p>Doctor Email: {bill.doctor_email}</p>
                    <p>Patient Name: {bill.patient_name}</p>
                    <p>Patient Email: {bill.patient_email}</p>
                    <p>Test Name: {Array.isArray(bill.test_name) ? bill.test_name.join(', ') : bill.test_name}</p>
                  </>
                )}

                <p>Total Bill: BDT {bill.total_bill}</p>
                <button className="download-btn" onClick={() => handleDownloadPDF(bill, selectedTab === 'ward' ? 'ward' : selectedTab === 'cabin' ? 'cabin' : 'test')}>
                  Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewBill;
