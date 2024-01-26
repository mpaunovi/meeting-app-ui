import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Meetings = () => {
    const [meetings, setMeetings] = useState([]);
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const jwtToken = localStorage.getItem('jwt');
                const userId = localStorage.getItem('userId');
                const headers = {
                    Authorization: `Bearer ${jwtToken}`,
                };

                const response =
                    await axios.get(`http://localhost:8000/api/v1/meetings/users/${userId}`, { headers });
                setMeetings(response.data);

            } catch (error) {
                console.error('Error fetching meetings:', error);
            }
        };

        fetchMeetings();
    }, []);

    return (
        <div className="meetings-container">
            <h2>Welcome, {username}</h2>
            {meetings.length > 0 ? (
                <div>
                    <h3>Explore your meetings</h3>
                    <ul>
                        {meetings.map((meeting) => (
                            <li key={meeting.meetingId}>
                                <Link to={`/meetings/${meeting.meetingId}`}>{meeting.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    <h3>You don't have any meetings</h3>
                </div>
            )}
            <div style={{ marginBottom: '50px' }}></div>
            <div className="bottom-links">
                <Link to="/import-csv" style={{ marginRight: '10px' }}>Import Meetings</Link>
                <Link to="/all-imports">View All Imports</Link>
            </div>
        </div>
    );
};

export default Meetings;
