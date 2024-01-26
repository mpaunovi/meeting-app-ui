import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ImportCSV = () => {
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleImport = async () => {
        try {
            const jwtToken = localStorage.getItem('jwt');
            const userId = localStorage.getItem('userId');
            const headers = {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'multipart/form-data',
            };

            const formData = new FormData();
            formData.append('file', file);

            await axios.post(`http://localhost:8000/api/v1/meetings/import`, formData, { headers });

            console.info('Successfully imported meetings:');

        } catch (error) {
            console.error('Import failed:', error);
            setErrorMessage('Import failed. Please try again.')
        }
    };

    return (
        <div className="meeting-details-container">
            <h2>Import Meetings</h2>
            <p>Select a CSV file to upload:</p>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button onClick={handleImport}>Import</button>
            <div style={{ marginBottom: '50px' }}></div>
            <Link to="/meetings">Back to All Meetings</Link>
        </div>
    );
};

export default ImportCSV;
