import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './styles.css';

const EditItem = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { data } = await axios.get(`https://employeesinfo.hopto.org/api/items/${id}`);
        setName(data.name);
        setDescription(data.description);
      } catch (err) {
        setError('Failed to fetch employee details. Please try again.');
      }
    };

    fetchItem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://employeesinfo.hopto.org/api/items/${id}`, { name, description });
      navigate('/');
    } catch (err) {
      setError('Failed to update employee. Please try again.');
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>8com-Limited</h1>
        <h2>Edit Employee</h2>
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
          <button type="submit" className="btn btn-edit">Update Employee</button>
          <Link to="/" className="btn btn-back">Back</Link>
        </div>
      </form>
    </div>
  );
};

export default EditItem;
