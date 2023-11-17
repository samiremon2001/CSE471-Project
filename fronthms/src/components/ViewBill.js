
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { downloadSingleWardBillPDF, downloadSingleCabinBillPDF } from './pdfGenerator';
import './ViewBill.css';

function ViewBill() {
    const [wardBills, setWardBills] = useState([]);
    const [cabinBills, setCabinBills] = useState([]);
    const [selectedTab, setSelectedTab] = useState('ward');
    const [selectedBillId, setSelectedBillId] = useState(null);

    useEffect(() => {
        async function fetchBills() {
            const patientEmail = localStorage.getItem("patient_email");
            try {
                const wardResponse = await axios.get(`http://127.0.0.1:8000/api/patient/ward-bills/?patient_email=${patientEmail}`);
                setWardBills(wardResponse.data);

                const cabinResponse = await axios.get(`http://127.0.0.1:8000/api/patient/cabin-bills/?patient_email=${patientEmail}`);
                setCabinBills(cabinResponse.data);
            } catch (error) {
                console.error("Error fetching bills:", error);
            }
        }

        fetchBills();
    }, []);

    const handleDownloadPDF = (bill, type) => {
        if (type === 'ward') {
            downloadSingleWardBillPDF(bill);
        } else {
            downloadSingleCabinBillPDF(bill);
        }
    };

    const toggleDetails = (id) => {
        setSelectedBillId(selectedBillId === id ? null : id);
    };

    return (
        <div className="view-bill-container">
            <h1>Bill Details</h1>
            <div className="tabs">
                <div className={`tab ${selectedTab === 'ward' ? 'active' : ''}`} onClick={() => setSelectedTab('ward')}>
                    Ward Bills
                </div>
                <div className={`tab ${selectedTab === 'cabin' ? 'active' : ''}`} onClick={() => setSelectedTab('cabin')}>
                    Cabin Bills
                </div>
            </div>
            <div className="bill-cards">
                {(selectedTab === 'ward' ? wardBills : cabinBills).map(bill => (
                    <div className="bill-card" key={bill.id}>
                        <div className="card-header">
                            {bill.ward_no ? `Ward No: ${bill.ward_no}` : `Cabin No: ${bill.cabin_no}`}
                            <button className="view-details-btn" onClick={() => toggleDetails(bill.id)}>
                                {selectedBillId === bill.id ? 'Hide Details' : 'View Details'}
                            </button>
                        </div>
                        {selectedBillId === bill.id && (
                            <div className="card-body">
                                <p>Floor No: {bill.floor_no}</p>
                                <p>Total Days: {bill.total_days}</p>
                                {/* <p>Total Bill: ${bill.total_bill}</p> */}
                                
                                <button className="download-btn" onClick={() => handleDownloadPDF(bill, selectedTab === 'ward' ? 'ward' : 'cabin')}>
                                    Download PDF
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewBill;

