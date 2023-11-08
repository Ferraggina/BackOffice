import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa los estilos de Bootstrap

export default function Pagination({
  itemsPerPage,
  totalItems,
  currentPage,
  onPageChange,
}) {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pageCount) {
      onPageChange(newPage);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= pageCount; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
        >
          <a className="page-link" href="#" onClick={() => handlePageChange(i)}>
            {i}
          </a>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            className="page-link"
            href="#"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Anterior
          </a>
        </li>
        {renderPageNumbers()}
        <li
          className={`page-item ${currentPage === pageCount ? "disabled" : ""}`}
        >
          <a
            className="page-link"
            href="#"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Siguiente
          </a>
        </li>
      </ul>
    </nav>
  );
}
