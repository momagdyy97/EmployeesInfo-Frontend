// src/components/EditItem.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
        setError('Failed to fetch item details. Make sure the server is running and the item ID is correct.');
        console.error('Error fetching item details:', err);
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
      setError('Failed to update item. Please try again.');
      console.error('Error updating item:', err);
    }
  };

  return (
    <div className="container">
      <h1>Edit Employee or Department</h1>
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
        <button type="submit" className="btn">Update Item</button>
      </form>
      <div className="button-container">
        <Link to="/" className="btn btn-create">Back</Link>
      </div>
    </div>
  );
};

export default EditItem;
