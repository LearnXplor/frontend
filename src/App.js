import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import EditDepartment from './pages/EditDepartment';
import AddDepartment from './pages/AddDepartment';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Updated route syntax */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/employee/dashboard" element={<Dashboard />} />
        <Route path="/dashboard" element={<ManagerDashboard />} />
        <Route path="/dashboard/add-department" element={<AddDepartment />} />
        <Route path="/edit-department/:id" element={<EditDepartment />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;
