// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Container, Form, Button } from 'react-bootstrap';
// import { getDepartmentById, updateDepartment } from '../services/departmentService';

// const EditDepartment = () => {
//   const { id } = useParams(); // Get the department ID from the route
//   const navigate = useNavigate();
//   const [department, setDepartment] = useState({
//     departmentName: '',
//     categoryName: '',
//     location: '',
//     salary: '',
//   });
//   const [loading, setLoading] = useState(true);

//   // Fetch the department details when the component loads
//   useEffect(() => {
//     const fetchDepartment = async () => {
//       try {
//         const data = await getDepartmentById(id);
//         setDepartment(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching department:', error);
//         setLoading(false);
//       }
//     };

//     fetchDepartment();
//   }, [id]);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setDepartment({ ...department, [name]: value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await updateDepartment(id, department);
//       navigate('/dashboard'); // Redirect back to the dashboard after saving
//     } catch (error) {
//         console.error('Error fetching departments:', error);
//       } finally {
//         setLoading(false); // Ensure loading stops even if there's an error
//       }
//   };

//   if (loading) {
//     return <div>Loading...</div>; // Add a spinner for better UX
//   }

//   return (
//     <Container className="mt-5">
//       <h2>Edit Department</h2>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3">
//           <Form.Label>Department Name</Form.Label>
//           <Form.Control
//             type="text"
//             name="departmentName"
//             value={department.departmentName}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Category Name</Form.Label>
//           <Form.Control
//             type="text"
//             name="categoryName"
//             value={department.categoryName}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Location</Form.Label>
//           <Form.Control
//             type="text"
//             name="location"
//             value={department.location}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Salary</Form.Label>
//           <Form.Control
//             type="number"
//             name="salary"
//             value={department.salary}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>
//         <Button variant="primary" type="submit">
//           Save Changes
//         </Button>
//         <Button variant="secondary" className="ms-3" onClick={() => navigate('/manager-dashboard')}>
//           Cancel
//         </Button>
//       </Form>
//     </Container>
//   );
// };

// export default EditDepartment;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, ListGroup } from 'react-bootstrap';
import { assignEmployeesDpt, getDepartmentById, updateDepartment } from '../services/departmentService';
import { getAllEmployees } from '../services/employeeService';

const EditDepartment = () => {
  const { id } = useParams(); // Get the department ID from the URL
  const navigate = useNavigate();
  const [department, setDepartment] = useState({
    departmentName: '',
    categoryName: '',
    location: '',
    salary: '',
    assignedEmployees: [], // Array of employee IDs assigned to this department
  });
  const [assignedEmployees, setAssignedEmployees] = useState([]); // List of all employees
  const [loading, setLoading] = useState(true);

  // Fetch the department and employee list when the component loads
  const modifyAssignedEmployees = (department) => {
    if (department.assignedEmployees && Array.isArray(department.assignedEmployees)) {
      // Replace assignedEmployees with an array of _id values
      department.assignedEmployees = department.assignedEmployees.map((employee) => employee._id);
    }
    return department;
  };
  
  useEffect(() => {
    const fetchDepartmentAndEmployees = async () => {
      try {
        const deptData = await getDepartmentById(id);
        const updatedDepartment = modifyAssignedEmployees(deptData);
        console.log('modifhy dd',updatedDepartment);
        const employeeData = await getAllEmployees();
        setDepartment(updatedDepartment);
        setAssignedEmployees(employeeData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchDepartmentAndEmployees();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('dd ss', department)
    setDepartment({ ...department, [name]: value });
  };
  const getIds = (data) => {
    // Use map to extract the _id field from each object in the array
    return data.map((item) => item._id);
  };
  
  // Handle the selection of employees
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDepartment(id, department);
      await assignEmployeesDpt(id, {employeeIds:department.assignedEmployees});
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
            value={department.departmentName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            name="categoryName"
            value={department.categoryName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={department.location}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Salary</Form.Label>
          <Form.Control
            type="number"
            name="salary"
            value={department.salary}
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

export default EditDepartment;
