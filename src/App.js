// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateItem from './components/CreateItem';
import EditItem from './components/EditItem';
import DeleteItem from './components/DeleteItem';
import ItemList from './components/ItemList';
import './components/styles.css'; // Import the styles

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ItemList />} />
        <Route path="/create" element={<CreateItem />} />
        <Route path="/edit/:id" element={<EditItem />} />
        <Route path="/delete/:id" element={<DeleteItem />} />
      </Routes>
    </Router>
  );
};

export default App;
