// src/components/DeleteItem.js
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DeleteItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = async () => {
    try {
      await axios.delete(`https://employeesinfo.hopto.org/api/items/${id}`);
      navigate('/');
    } catch (err) {
      alert('Failed to delete item. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Are you sure you want to delete this Employee?</h1>
      <div className="btn-group">
        <button onClick={handleDelete} className="btn btn-danger">Yes, Delete</button>
        <button onClick={() => navigate('/')} className="btn">Cancel</button>
      </div>
    </div>
  );
};

export default DeleteItem;
