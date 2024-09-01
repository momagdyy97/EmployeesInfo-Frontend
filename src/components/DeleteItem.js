// src/components/DeleteItem.js
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DeleteItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://3.29.24.171:3001/api/items/${id}`);
      navigate('/');
    } catch (err) {
      alert('Failed to delete item. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Are you sure you want to delete this item?</h1>
      <div className="btn-group">
        <button onClick={handleDelete} className="btn btn-danger">Yes, Delete</button>
        <button onClick={() => navigate('/')} className="btn">Cancel</button>
      </div>
    </div>
  );
};

export default DeleteItem;
