import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ManageTestimonials from './ManageTestimonials';
import ManageMessages from './ManageMessages';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('testimonials');

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'testimonials': return <ManageTestimonials />;
      case 'messages': return <ManageMessages />;
      default: return <ManageTestimonials />;
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
        <h3 className="mb-4">Admin Panel</h3>
        <ul className="nav flex-column gap-2">
          <li className="nav-item">
            <button className={`btn w-100 text-start ${activeTab === 'testimonials' ? 'btn-light' : 'btn-outline-light border-0'}`} onClick={() => setActiveTab('testimonials')}>Témoignages & Avis</button>
          </li>
          <li className="nav-item">
            <button className={`btn w-100 text-start ${activeTab === 'messages' ? 'btn-light' : 'btn-outline-light border-0'}`} onClick={() => setActiveTab('messages')}>Messages (Contact)</button>
          </li>
        </ul>
        <button className="btn btn-danger w-100 mt-5" onClick={handleLogout}>Déconnexion</button>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Tableau de bord</h2>
          <a href="/" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">Voir le site</a>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
