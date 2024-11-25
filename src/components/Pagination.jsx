import React from 'react';
import ReactPaginate from 'react-paginate';
import { Container } from 'react-bootstrap';

const Pagination = ({ totalRecords, pageSize, onPageChange }) => {
  const pageCount = Math.ceil(totalRecords / pageSize);

  return (
    <Container className="d-flex justify-content-center mt-3">
      <ReactPaginate
        previousLabel={'← Previous'}
        nextLabel={'Next →'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={(data) => onPageChange(data.selected + 1)}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        activeClassName={'active'}
      />
    </Container>
  );
};

export default Pagination;
