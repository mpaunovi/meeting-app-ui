import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to the Meeting App</h1>
            <Link to="/login">Login</Link>
            <br />
            <Link to="/register">Register</Link>
        </div>
    );
};

export default Home;
