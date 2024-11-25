import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Form, Button,ListGroup } from 'react-bootstrap';
import { assignEmployeesDpt, createDepartment, getDepartmentById, } from '../services/departmentService';
import { getAllEmployees } from '../services/employeeService';

const AddDepartment = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [department, setDepartment] = useState({
    departmentName: '',
    categoryName: '',
    location: '',
    salary: '',
    assignedEmployees: [],
  });
  const [assignedEmployees, setAssignedEmployees] = useState([]); 
  const [loading, setLoading] = useState(true);

  const modifyAssignedEmployees = (department) => {
    if (department.assignedEmployees && Array.isArray(department.assignedEmployees)) {
      department.assignedEmployees = department.assignedEmployees.map((employee) => employee._id);
    }
    return department;
  };
  
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeeData = await getAllEmployees();
        setAssignedEmployees(employeeData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('dd ss', department)
    setDepartment({ ...department, [name]: value });
  };
 
  
  const handleEmployeeSelection = async (e) => {
    const employeeId = e.target.value;
    console.log('emp id', employeeId)
    console.log('department.emplouees ', [...department.assignedEmployees, employeeId])
    if (e.target.checked) {
      setDepartment({
        ...department,
        assignedEmployees: [...department.assignedEmployees, employeeId], // Add employee ID
      });
    } else {
      setDepartment({
        ...department,
        assignedEmployees: department.assignedEmployees.filter((id) => id !== employeeId), // Remove employee ID
      });
    }
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      department.salary = Number (department.salary);
      const resp = await createDepartment(department);
      await assignEmployeesDpt(resp._id, {employeeIds:department.assignedEmployees});
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Error updating department:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <Container className="mt-5">
      <h2>Edit Department</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Department Name</Form.Label>
          <Form.Control
            type="text"
            name="departmentName"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            name="categoryName"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Salary</Form.Label>
          <Form.Control
            type="number"
            name="salary"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <h4>Assign Employees to Department</h4>
        {/* {employees[0]._id} */}
        {/* {assignedEmployees[0]._id} */}
        
            <ListGroup className='my-3'>
              {assignedEmployees && assignedEmployees.map((employee) => (
                <ListGroup.Item key={employee._id}>
                  <Form.Check
                    type="checkbox"
                    label={`${employee.firstName} ${employee.lastName}`}
                    value={employee._id}
                    checked={department.assignedEmployees?.includes(employee._id)}
                    onChange={handleEmployeeSelection}
                  />
                </ListGroup.Item>
              ))}
            </ListGroup>

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
        <Button variant="secondary" className="ms-3" onClick={() => navigate('/dashboard')}>
          Cancel
        </Button>
      </Form>
    </Container>
  );
};

export default AddDepartment;


