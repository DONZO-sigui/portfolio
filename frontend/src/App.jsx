import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/public/Home';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Article from './pages/public/Article';
import Resume from './pages/public/Resume';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cv" element={<Resume />} />
        <Route path="/blog/:id" element={<Article />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
