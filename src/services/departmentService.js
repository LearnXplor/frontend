import axios from 'axios';

const API_URL = 'http://localhost:5000/api/departments';

export const getDepartments = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/api/departments', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('ksdk ', response.data)
    return response.data.departments;

  } catch (err) {
    console.error(err);
  }
};

export const createDepartment = async (departmentData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}`,  
      departmentData,     
      {
        headers: { 
          Authorization: `Bearer ${token}` 
        }
      }
    );
    console.log('Add department: ', response.data);
    return response.data;

  } catch (err) {
    console.error('Error updating department:', err);
  }
};

export const deleteDepartment = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('deleted dept ', response.data)
    return response.data;

  } catch (err) {
    console.error(err);
  }};



// Fetch a single department by ID
export const getDepartmentById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('ues ', response.data)
    return response.data.departments;

  } catch (err) {
    console.error(err);
    // navigate('/login');
  }
};

// Update a department by ID
export const updateDepartment = async (id, departmentData) => {
  try {
    const token = localStorage.getItem('token'); 
    const response = await axios.put(
      `${API_URL}/${id}`, 
      departmentData,      
      {
        headers: { 
          Authorization: `Bearer ${token}` 
        }
      }
    );
    console.log('Updated department: ', response.data);
    return response.data;

  } catch (err) {
    console.error('Error updating department:', err);
  }
};


// Update a department by ID
export const assignEmployeesDpt = async (id, empIDs) => {
  console.log(' emp id s ');
  console.log(id, empIDs);
  try {
    const token = localStorage.getItem('token'); 
    const response = await axios.put(
      `${API_URL}/${id}/assign`, 
      empIDs,      
      {
        headers: { 
          Authorization: `Bearer ${token}` 
        }
      }
    );
    console.log('Updated department: ', response.data);
    return response.data;

  } catch (err) {
    console.error('Error updating department:', err);
  }
};


