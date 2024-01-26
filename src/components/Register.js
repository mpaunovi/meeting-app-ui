import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/auth/register', formData);
            console.log(response.data);
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <label>
                Username:
                <input type="text" id="username" name="username" onChange={handleInputChange} />
            </label>
            <br />
            <label>
                Email:
                <input type="email" id="email" name="email" onChange={handleInputChange} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" id="password" name="password" onChange={handleInputChange} />
            </label>
            <br />
            <button type="button" onClick={handleRegister}>
                Register
            </button>

            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Register;
