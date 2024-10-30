

import React from 'react';

const Pagination = ({ currentPage, setCurrentPage }) => {
  return (
    <div className="pagination">
      <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
    </div>
  );
};

export default Pagination;
