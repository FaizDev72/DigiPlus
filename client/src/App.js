import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

const App = () => {
  const [simNumber, setSimNumber] = useState('');
  const [simDetails, setSimDetails] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const handleActivate = async () => {
    try {
      const response = await axios.post('http://localhost:9000/activate', { simNumber });
      setSimDetails(response.data.simCard);
      setStatusMessage('SIM activated successfully!');
    } catch (error) {
      console.log(error);
      setStatusMessage(error.response?.data?.error || 'Error activating SIM');
    }
  };

  const handleDeactivate = async () => {
    try {
      const response = await axios.post('http://localhost:9000/deactivate', { simNumber });
      setSimDetails(response.data.simCard);
      setStatusMessage('SIM deactivated successfully!');
    } catch (error) {
      setStatusMessage(error.response?.data?.error || 'Error deactivating SIM');
    }
  };

  const handleGetDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/sim-details/${simNumber}`);
      setSimDetails(response.data);
      setStatusMessage('');
    } catch (error) {
      setStatusMessage(error.response?.data?.error || 'Error fetching SIM details');
    }
  };

  return (
    <div className="container">
      <h1 className="title">SIM Card Activation Service</h1>
      <div className="card">
        <input
          type="text"
          placeholder="Enter SIM Number"
          value={simNumber}
          onChange={(e) => setSimNumber(e.target.value)}
          className="input"
        />
        <div className="flex justify-between space-x-2">
          <button
            onClick={handleActivate}
            className={`button button-activate`}
          >
            Activate SIM
          </button>
          <button
            onClick={handleDeactivate}
            className={`button button-deactivate`}
          >
            Deactivate SIM
          </button>
          <button
            onClick={handleGetDetails}
            className={`button button-details`}
          >
            Get SIM Details
          </button>
        </div>
        {statusMessage && <p className="status-message">{statusMessage}</p>}
        {simDetails && (
          <div className="sim-details">
            <h2 className="sim-details-title">SIM Details</h2>
            <p><strong>SIM Number:</strong> {simDetails.simNumber}</p>
            <p><strong>Phone Number:</strong> {simDetails.phoneNumber}</p>
            <p><strong>Status:</strong> {simDetails.status}</p>
            {simDetails.activationDate && (
              <p>
                <strong>Activation Date:</strong>{' '}
                {new Date(simDetails.activationDate).toLocaleString()}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
