// src/components/CreateItem.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const CreateItem = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://employeesinfo.hopto.org/api/items', { name, description });
      navigate('/');
    } catch (err) {
      setError('Failed to create item. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Create New Employee</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Department</label>
          <input
            id="description"
            type="text"
            placeholder="Enter item description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn">Add Employee</button>
      </form> 
      <div className="button-container">
        <Link to="/" className="btn btn-create">Back</Link>
      </div>
    </div>
  );
};

export default CreateItem;
