import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from "./components/Home";
import Landing from './components/Landing';
import Meetings from './components/Meetings';
import MeetingDetails from './components/MeetingDetails';
import ImportCSV from './components/ImportCSV';
import Imports from './components/Imports';


const App = () => {
    const isAuthenticated = localStorage.getItem('jwt') !== null;

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/meetings" replace />} />
                <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/login" replace />} />
                <Route path="/meetings" element={<Meetings />} />
                <Route path="/meetings/:meetingId" element={<MeetingDetails />} />
                <Route path="/import-csv" element={<ImportCSV />} />
                <Route path="/all-imports" element={<Imports />} />
            </Routes>
        </Router>
    );
};
export default App;
