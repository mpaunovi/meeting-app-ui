import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MeetingDetails = () => {
    const [meetingDetails, setMeetingDetails] = useState({});
    const { meetingId } = useParams();
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMeetingDetails = async () => {
            try {
                const jwtToken = localStorage.getItem('jwt');
                const headers = {
                    Authorization: `Bearer ${jwtToken}`,
                };
                const response =
                    await axios.get(`http://localhost:8000/api/v1/meetings/${meetingId}`, {headers});
                setMeetingDetails(response.data);
            } catch (error) {
                console.error('Error fetching meeting details:', error);
            }
        };

        fetchMeetingDetails();
    }, [meetingId]);

    return (
        <div className="meeting-details-container">
            <h2>Meeting details:</h2>
            <p>Name: <strong>{meetingDetails.title}</strong></p>
            <p>Description: <strong>{meetingDetails.description}</strong></p>
            <p>Created: <strong>{meetingDetails.meetingDateTime}</strong></p>
            <p>Organizer name: <strong>{username}</strong></p>
            <p>Organizer ID: <strong>{meetingDetails.organizerId}</strong></p>
            <p></p>
            <p></p>
            <Link to="/meetings"><em>Back to All Meetings</em></Link>
        </div>
    );
};

export default MeetingDetails;
