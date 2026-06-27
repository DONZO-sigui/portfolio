import React from 'react';
import { FaInstagram, FaTiktok, FaYoutube, FaFacebook } from 'react-icons/fa';

const StatCard = ({ stat, delay }) => {
  const getIconAndColor = (platform) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return { icon: <FaInstagram />, color: '#E1306C' };
      case 'tiktok': return { icon: <FaTiktok />, color: '#000000' };
      case 'youtube': return { icon: <FaYoutube />, color: '#FF0000' };
      case 'facebook': return { icon: <FaFacebook />, color: '#1877F2' };
      default: return { icon: null, color: '#333' };
    }
  };

  const { icon, color } = getIconAndColor(stat.platform);

  return (
    <div className="col-md-6 col-lg-3" data-aos="zoom-in" data-aos-delay={delay}>
      <div className="card text-center p-4 border-0 shadow-sm h-100 stat-card" style={{ borderTop: `4px solid ${color}` }}>
        <div className="mb-3" style={{ fontSize: '2.5rem', color: color }}>
          {icon}
        </div>
        <h4 className="fw-bold mb-3">{stat.platform}</h4>
        
        <div className="d-flex flex-column gap-2 text-start px-2">
          <div className="d-flex justify-content-between border-bottom pb-1">
            <span className="text-muted small">Abonnés</span>
            <span className="fw-bold">{stat.followers}</span>
          </div>
          <div className="d-flex justify-content-between border-bottom pb-1">
            <span className="text-muted small">Engagement</span>
            <span className="fw-bold">{stat.engagement_rate}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span className="text-muted small">Vues/mois</span>
            <span className="fw-bold">{stat.monthly_views}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
