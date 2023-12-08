
import React, { useState, useEffect } from 'react';
import './Chatbox.css';

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const chatbox = document.getElementById('chatbox');
    chatbox.scrollTop = chatbox.scrollHeight;
  }, [messages]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { text: input, sender: 'user' }]);
      simulateApiResponse(input);
      setInput('');
    }
  };

  const closeChatbox = () => {
    setMessages([]);
  };

  const simulateApiResponse = (userMessage) => {
    setTimeout(() => {
      let response;

      if (userMessage.toLowerCase().includes('hi') || userMessage.toLowerCase().includes('hello')) {
        response = "Greetings! How can I help you?";
      } else if (userMessage.toLowerCase().includes('support') || userMessage.toLowerCase().includes('feedback')) {
        response = "Please send us your feedback or complaint from the support page.";
      } else if (userMessage.toLowerCase().includes('patient portal')) {
        response = "To access the patient portal, please register on our website.";
      } else if (userMessage.toLowerCase().includes('department')) {
        const departments = ['Cardiology', 'Neurology', 'Orthopaedics and Trauma', 'Diabetology and Endocrinology'];
        response = (
          <div>
            <p>Departments:</p>
            <table>
              <tbody>
                {departments.map((dept, index) => (
                  <tr key={index}>
                    <td>{dept}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      } else if (userMessage.toLowerCase().includes('doctor')) {
        response = "Please register first to see information about doctors.";
      } else if (userMessage.toLowerCase().includes('hospital details')) {
        response = "To know more about our hospital, please visit the 'About Us' page on our website.";
      } else if (
        userMessage.toLowerCase().includes('blood bank') ||
        userMessage.toLowerCase().includes('blood recipients') ||
        userMessage.toLowerCase().includes('blood donors') ||
        userMessage.toLowerCase().includes('blood availability')
      ) {
        response = "For information about blood bank, blood recipients, blood donors, or blood availability, please visit our blood bank page.";
      } else if (userMessage.toLowerCase().includes('test') || userMessage.toLowerCase().includes('service') || userMessage.toLowerCase().includes('bill details')) {
        const testCharges = [
          { name: 'Ambulance Service', price: 500.00 },
          { name: 'Blood Drawing', price: 600.00 },
          { name: 'Blood Screening+Drawing+Grouping', price: 2100.00 },
          { name: 'Colonoscopy Polypectomy EMR/ESD small (A)', price: 40000.00 },
          { name: 'Anesthesia for CT.Scan of Whole Abdomen', price: 1500.00 },
          { name: 'CT Extra Screening Charge', price: 2100.00 },
          { name: 'Diabetics (Follow-up)', price: 50.00 },
          { name: 'Diabetics Book', price: 100.00 },
          { name: 'ECG', price: 400.00 },
          { name: 'Endoscopy Removal of Foregone Body Meat bolus (R)', price: 25000.00 },
          { name: 'ETT', price: 3000.00 },
          { name: 'Digital EEG', price: 3000.00 },
          { name: 'Cocaine', price: 1200.00 },
        ];
        response = (
          <div>
            <p>Test and Service Charges:</p>
            <table>
              <thead>
                <tr>
                  <th>Service Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {testCharges.map((test, index) => (
                  <tr key={index}>
                    <td>{test.name}</td>
                    <td>{test.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      } else if (userMessage.toLowerCase().includes('know more')) {
        response = "Thank you for using our service. If you have any more questions, feel free to ask!";
      } else if (userMessage.toLowerCase().includes('close')) {
        response = "Chatbox closed. If you have more questions, feel free to reopen the chat.";
        closeChatbox();
      } else if (userMessage.toLowerCase().includes('blood group')) {
        const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
        response = (
          <div>
            <p>Blood Groups:</p>
            <table>
              <thead>
                <tr>
                  <th>Group</th>
                </tr>
              </thead>
              <tbody>
                {bloodGroups.map((group, index) => (
                  <tr key={index}>
                    <td>{group}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      } else if (userMessage.toLowerCase().includes('blood matching group')) {
        response = "To find a compatible blood donor or recipient, please visit our blood bank page.";
      } else {
        response = "Sorry, I couldn't understand that. How can I assist you?";
      }

      setMessages([...messages, { text: response, sender: 'bot' }]);
    }, 500);
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox" id="chatbox">
        <div className="close-button" onClick={closeChatbox}>X</div>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbox;
