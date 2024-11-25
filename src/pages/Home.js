import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container text-center">
            <h1>Welcome to the Employee Management System</h1>
            <p>Choose a section to get started</p>
            <div className="mt-3">
                <Link to="/login" className="btn btn-primary m-2">Login</Link>
                <Link to="/signup" className="btn btn-secondary m-2">Sign Up</Link>
            </div>
        </div>
    );
};

export default Home;
