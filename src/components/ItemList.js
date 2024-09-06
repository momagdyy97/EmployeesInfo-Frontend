import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles.css';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [description, setDescription] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // List of descriptions for filtering
  const descriptions = ['HR', 'Engineering', 'Marketing', 'Finance']; // Adjust this list as needed

  useEffect(() => {
    fetchItems();
  }, [searchTerm, description, page]);

  const fetchItems = async () => {
    try {
      const response = await axios.get('https://employeesinfo.hopto.org/api/items', {
        params: { search: searchTerm, description: description, page: page, limit: 10 }
      });
      setItems(response.data.items);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError('Failed to fetch items. Please try again.');
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>8com-Limited</h1>
        <h2>Employees Info</h2>
        <h3>احنا التيم الجامد</h3>
      </header>
      
      {error && <p className="error">{error}</p>}
      
      {/* Search and Filter UI */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select value={description} onChange={(e) => setDescription(e.target.value)} className="filter-select">
          <option value="">All Descriptions</option>
          {descriptions.map((desc) => (
            <option key={desc} value={desc}>
              {desc}
            </option>
          ))}
        </select>
        <button onClick={() => setPage(1)} className="btn btn-search">Search</button>
      </div>

      <div className="button-container">
        <Link to="/create" className="btn btn-create">Create New Employee</Link>
      </div>

      <table className="item-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <Link to={`/edit/${item._id}`} className="btn btn-edit">Edit</Link>
                  <Link to={`/delete/${item._id}`} className="btn btn-delete">Delete</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">There are no employees in the database yet.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination-container">
        <button
          onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
          className="btn btn-pagination"
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(prevPage => Math.min(prevPage + 1, totalPages))}
          disabled={page === totalPages}
          className="btn btn-pagination"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ItemList;
