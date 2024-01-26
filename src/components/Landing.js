import React from 'react';

const Landing = () => {
    const username = localStorage.getItem('username');

    return (
        <div className="container">
            <h1>Welcome {username}</h1>
            <p>Explore your meetings.</p>
        </div>
    );
};

export default Landing;
