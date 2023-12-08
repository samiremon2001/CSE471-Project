
import React, { useState, useEffect } from 'react';
import './BloodRecipient.css';
import Navbar from './Navbar';

const BloodRecipient = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    blood_group: '',
    bags_needed: 1,
  });

  const [formStatus, setFormStatus] = useState(null);
  const [bloodAvailability, setBloodAvailability] = useState(3);

  useEffect(() => {
   
    fetch('http://127.0.0.1:8000/api/get-blood-availability/')
      .then((response) => response.json())
      .then((data) => {
        const selectedBloodGroup = formData.blood_group;
        const selectedAvailability = data.find((item) => item.blood_group === selectedBloodGroup);
        setBloodAvailability(selectedAvailability ? selectedAvailability.total_bags : 0);
      })
      .catch((error) => console.error('Error fetching blood availability:', error));
  }, [formData.blood_group]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === 'bags_needed') {
     
      const intValue = parseInt(value, 10);
      if (intValue <= 0 || isNaN(intValue)) {
        
        setFormData({ ...formData, [id]: 1 });
      } else {
        setFormData({ ...formData, [id]: intValue });
      }
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (bloodAvailability === 0) {
      setFormStatus('noBloodAvailable');
      return;
    }

    fetch('http://127.0.0.1:8000/api/blood-recipient-request/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setFormStatus('success');
          setBloodAvailability((prev) => prev - formData.bags_needed);
          setFormData({
            name: '',
            phone: '',
            email: '',
            blood_group: '',
            bags_needed: 1,
          });
        } else {
          setFormStatus('error');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
        setFormStatus('error');
      });
  };

  return (
    <div className="blood-recipient-body">
      <Navbar includeHomeLink includeBloodBankLink includeSupportLink includeAboutLink />
      <div className="blood-recipient-container">
        <div className="content-wrapper">
          <form onSubmit={handleSubmit} className="blood-recipient-form">
            <h2 className="blood-recipient-title">Blood Recipient Request</h2>

            {formStatus === 'noBloodAvailable' && (
              <div className="alert alert-danger" role="alert">
                No blood is available. Please try again later.
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-input"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                className="form-input"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-input"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="blood_group">Blood Group</label>
              <select
                className="form-input"
                id="blood_group"
                value={formData.blood_group}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Blood Group
                </option>
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="O+">O+</option>
                <option value="AB+">AB+</option>
                <option value="A-">A-</option>
                <option value="B-">B-</option>
                <option value="O-">O-</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="bags_needed">Bags Needed</label>
              <input
                type="number"
                className="form-input"
                id="bags_needed"
                value={formData.bags_needed}
                onChange={handleChange}
                required
              />
            </div>

            {formStatus && formStatus !== 'noBloodAvailable' && (
              <div
                className={`alert ${formStatus === 'success' ? 'alert-success' : 'alert-danger'}`}
                role="alert"
              >
                {formStatus === 'success'
                  ? 'The form has been successfully submitted!'
                  : 'The requested blood group does not have the required number of bags available.'}
              </div>
            )}

            <button className="btn-primary" type="submit">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BloodRecipient;
