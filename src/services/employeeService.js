
import axios from 'axios';
const API_URL = 'http://localhost:5000/api';

export const getAllEmployees = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/auth/employees`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('employees ', response.data)
    console.log('employees user ', response.data.users)
    return response.data.users;

  } catch (err) {
    console.error(err);
  }
};

export const getProfileData = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('profile ', response.data)
    return response.data;

  } catch (err) {
    console.error(err);
    // navigate('/login');
  }
};