import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Row, Col } from 'react-bootstrap';
import Pagination from '../components/Pagination';
import { deleteDepartment, getDepartments } from '../services/departmentService';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../components/HeaderComponent';
import Popup from '../components/popup/Popup';

const ManagerDashboard = () => {
  const [departments, setDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [deleteID, setDeleteId] = useState('')
  const navigate = useNavigate();


  const pageSize = 5;

  const fetchDepartments = async () => {
    try {
      const data = await getDepartments();
      console.log('data ', data)
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handlePagination = (pageNumber) => setCurrentPage(pageNumber);

  const paginatedDepartments = (departments || []).slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);

 
  const handleDeleteClick = (id) => {
    console.log('id ', id)
    setDeleteId(id)
    setIsPopupOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("Confirmed delete!");
    setIsPopupOpen(false); // Close the popup after confirmation
    handleDelete();
  };

  const handleCancel = () => {
    console.log("Cancelled delete!");
    setIsPopupOpen(false); // Close the popup
  };
  const handleDelete = async () => {
    try {
      const deleted = await deleteDepartment(deleteID);
      // console.log('deleted resp ')
      const data = await getDepartments();
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    } finally {
      setLoading(false); 
    }

  }

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <>
      <Container className="mt-3">
        <HeaderComponent />
      </Container>

      <Container className="mt-5">
        <Row>
          <Col>
            <h2>Manager Dashboard</h2>
          </Col>
          <Col className="text-end">
            <Button variant="primary" onClick={() => navigate('add-department')}>
              Add Department
            </Button>
          </Col>
        </Row>
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Department Name</th>
              <th>Category</th>
              <th>Location</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && paginatedDepartments.map((dept) => (
              <tr key={dept._id}>
                <td>{dept.departmentName}</td>
                <td>{dept.categoryName}</td>
                <td>{dept.location}</td>
                <td>{dept.salary}</td>
                <td>
                  <Button variant="warning" size="sm" className="me-2" onClick={() => navigate('/edit-department/' + dept?._id)}>
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteClick(dept._id)}>
                    Delete
                  </Button>
                  <Popup
                    isOpen={isPopupOpen}
                    onClose={handleCancel}
                    onConfirm={handleConfirmDelete}
                    message="Are you sure you want to delete this item?"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination totalRecords={departments?.length || 0} pageSize={pageSize} onPageChange={handlePagination} />
      </Container>
    </>

  );
};

export default ManagerDashboard;
