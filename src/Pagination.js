import React from "react";
import { useNavigate } from 'react-router-dom';



const Pagination = ({ currentPage }) => {
    const navigate = useNavigate();
  
    const handlePageChange = (newPage) => {
      navigate(`/news?page=${newPage}`);
    };
  
    return (
      <div>
        <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
        <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div>
    );
  };

  export default Pagination;