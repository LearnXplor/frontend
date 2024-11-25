import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../components/HeaderComponent';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (err) {
        console.error(err);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="container mt-5">
      {userData ? (
        <div>
          <HeaderComponent />
          <h2>Welcome, {userData.firstName} {userData.lastName}</h2>
          <p>Email: {userData.email}</p>
          <p>Department: {userData.department ? userData.department.departmentName : 'N/A'}</p>
          <p>Assigned Hobbies: {userData.hobbies.join(', ')}</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Dashboard;
