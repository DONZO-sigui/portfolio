import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ManageStatistics = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get('/statistics');
      setStats(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleChange = (platform, field, value) => {
    setStats(stats.map(s => s.platform === platform ? { ...s, [field]: value } : s));
  };

  const handleUpdate = async (platform) => {
    const statToUpdate = stats.find(s => s.platform === platform);
    try {
      await api.put('/statistics', statToUpdate);
      alert(`Statistiques ${platform} mises à jour avec succès !`);
    } catch (err) {
      alert('Erreur lors de la mise à jour.');
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="card shadow-sm border-0 p-4">
      <h4 className="mb-4 text-primary">Statistiques par Réseau</h4>
      
      <div className="row g-4">
        {stats.map(stat => (
          <div className="col-md-6" key={stat.platform}>
            <div className="card border p-3">
              <h5 className="mb-3">{stat.platform}</h5>
              <div className="mb-2">
                <label className="form-label small text-muted">Abonnés</label>
                <input type="text" className="form-control form-control-sm" value={stat.followers} onChange={(e) => handleChange(stat.platform, 'followers', e.target.value)} />
              </div>
              <div className="mb-2">
                <label className="form-label small text-muted">Taux d'engagement</label>
                <input type="text" className="form-control form-control-sm" value={stat.engagement_rate} onChange={(e) => handleChange(stat.platform, 'engagement_rate', e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label small text-muted">Vues mensuelles</label>
                <input type="text" className="form-control form-control-sm" value={stat.monthly_views} onChange={(e) => handleChange(stat.platform, 'monthly_views', e.target.value)} />
              </div>
              <button className="btn btn-primary-custom btn-sm w-100" onClick={() => handleUpdate(stat.platform)}>Mettre à jour</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageStatistics;
