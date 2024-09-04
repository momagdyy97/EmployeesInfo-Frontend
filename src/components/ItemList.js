import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles.css';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('https://employeesinfo.hopto.org/api/items'); // Update with your backend URL
        setItems(response.data);
      } catch (err) {
        setError('Failed to fetch items. Please try again.');
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="container">
      <h1>8com-Limited Team</h1>
      <h2>Employees Info</h2>
      {error && <p className="error">{error}</p>}
      <div className="button-container">
        <Link to="/create" className="btn btn-create">Create New Employee</Link>
      </div>
      <table className="item-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
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
              <td colSpan="3">There is no Employee inserted to the database yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;
