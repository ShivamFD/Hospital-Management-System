import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'; // Make sure this path is correct
import Register from './components/Register';// Make sure this path is correct

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* You can add additional routes here */}
      </Routes>
    </Router>
  );
};

export default App;
