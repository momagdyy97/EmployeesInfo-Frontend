import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles.css';

const DeleteItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = async () => {
    try {
      await axios.delete(`https://employeesinfo.hopto.org/api/items/${id}`);
      navigate('/');
    } catch (err) {
      alert('Failed to delete employee. Please try again.');
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>8com-Limited</h1>
        <h2>Delete Employee</h2>
      </header>
      <p>Are you sure you want to delete this employee?</p>
      <div className="button-container">
        <button onClick={handleDelete} className="btn btn-delete">Yes, Delete</button>
        <Link to="/" className="btn btn-back">Cancel</Link>
      </div>
    </div>
  );
};

export default DeleteItem;
