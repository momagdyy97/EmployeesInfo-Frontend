import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './styles.css';

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
      setError('Failed to create employee. Please try again.');
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>8com-Limited</h1>
        <h2>Create New Employee</h2>
      </header>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter employee name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Department</label>
          <input
            id="description"
            type="text"
            placeholder="Enter employee department"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="input"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <div className="button-container">
          <button type="submit" className="btn btn-create">Add Employee</button>
          <Link to="/" className="btn btn-back">Back</Link>
        </div>
      </form>
    </div>
  );
};

export default CreateItem;

