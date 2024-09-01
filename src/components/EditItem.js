// src/components/EditItem.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditItem = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { data } = await axios.get(`http://3.29.24.171:3001/api/items/${id}`);
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
      await axios.put(`http://3.29.24.171:3001/api/items/${id}`, { name, description });
      navigate('/');
    } catch (err) {
      setError('Failed to update item. Please try again.');
      console.error('Error updating item:', err);
    }
  };

  return (
    <div className="container">
      <h1>Edit Item</h1>
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
          <label htmlFor="description">Description</label>
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
    </div>
  );
};

export default EditItem;
