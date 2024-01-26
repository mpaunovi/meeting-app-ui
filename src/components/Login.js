import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/auth/login', {
                username: username,
                password: password,
            });

            const { userId, jwt } = response.data;

            if (userId === null) {
                window.alert('Wrong username or password. Please try again.');
                return;
            }

            localStorage.setItem('userId', userId);
            localStorage.setItem('username', username);
            localStorage.setItem('jwt', jwt);

            console.log('About to navigate to /meetings');
            navigate('/meetings', { replace: true });
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
