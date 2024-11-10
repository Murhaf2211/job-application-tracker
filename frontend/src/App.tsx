import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Footer from './components/Footer';
import AppNavbar from "./components/Navbar";

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <div>
                <AppNavbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
                <Routes>
                    <Route path="/" element={<Navigate to="/login"/>} />
                    <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} />: <Navigate to="/home" />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Navigate to="/" />} />
                    <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" /> } />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
