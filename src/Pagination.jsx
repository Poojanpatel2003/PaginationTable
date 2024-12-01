import { useState } from "react";
import "./pagination.css";
import { FaEdit, FaSave } from "react-icons/fa";

const PaginationTable = () => {
  const initialData = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    email: `username${index + 1}@gmail.com`,
  }));

  const [data, setData] = useState(initialData);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editValues, setEditValues] = useState({ name: "", email: "" });
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEdit = (row) => {
    setEditingRowId(row.id);
    setEditValues({ name: row.name, email: row.email });
  };

  const handleSave = (rowId) => {
    const updatedData = data.map((item) =>
      item.id === rowId ? { ...item, ...editValues } : item
    );
    setData(updatedData);
    setEditingRowId(null);
  };

  const renderPaginationButtons = () => {
    const buttons = [];

    buttons.push(
      <button
        key="prev"
        className="pagination-btn"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
    );

    if (currentPage > 2) {
      buttons.push(<span key="dots1" className="dots">...</span>);
    }

    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(totalPages, currentPage + 1);
      i++
    ) {
      buttons.push(
        <button
          key={i}
          className={`pagination-btn ${i === currentPage ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages - 1) {
      buttons.push(<span key="dots2" className="dots">...</span>);
    }

    buttons.push(
      <button
        key="next"
        className="pagination-btn"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    );

    return buttons;
  };

  return (
    <div className="pagination-container">
      <h2>Pagination Table</h2>
      <table className="pagination-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                {editingRowId === item.id ? (
                  <input
                    type="text"
                    value={editValues.name}
                    className="edit-input"
                    onChange={(e) =>
                      setEditValues({ ...editValues, name: e.target.value })
                    }
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>
                {editingRowId === item.id ? (
                  <input
                    type="email"
                    value={editValues.email}
                    className="edit-input"
                    onChange={(e) =>
                      setEditValues({ ...editValues, email: e.target.value })
                    }
                  />
                ) : (
                  item.email
                )}
              </td>
              <td>
                {editingRowId === item.id ? (
                  <button
                    className="save-btn"
                    onClick={() => handleSave(item.id)}
                  >
                    <FaSave /> Save
                  </button>
                ) : (
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(item)}
                  >
                    <FaEdit /> Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls">{renderPaginationButtons()}</div>
    </div>
  );
};

export default PaginationTable;
