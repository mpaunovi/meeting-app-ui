import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Imports = () => {
    const [imports, setImports] = useState([]);
    const username = localStorage.getItem('username');

    useEffect(() => {
        const fetchImports = async () => {
            try {
                const jwtToken = localStorage.getItem('jwt');
                const userId = localStorage.getItem('userId');
                const headers = {
                    Authorization: `Bearer ${jwtToken}`,
                };

                const response =
                    await axios.get(`http://localhost:8000/api/v1/imports/users/${userId}`, { headers });
                setImports(response.data);
            } catch (error) {
                console.error('Error fetching imports:', error);
            }
        };

        fetchImports();
    }, []);

    return (
        <div className="meeting-details-container">
            <h2>All Imports</h2>
            <table className="imports-table">
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Title</th>
                    <th>Content</th>
                </tr>
                </thead>
                <tbody>
                {imports.map((importItem) => (
                    <tr key={importItem.id}>
                        <td>{username}</td>
                        <td>{importItem.title}</td>
                        <td>{importItem.content}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div style={{ marginBottom: '50px' }}></div>
            <Link to="/meetings"><em>Back to All Meetings</em></Link>
        </div>
    );
};

export default Imports;
