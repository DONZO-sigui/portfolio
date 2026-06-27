import React, { useState } from 'react';
import api from '../services/api';

const TestimonialForm = ({ onTestimonialAdded }) => {
  const [formData, setFormData] = useState({ author_name: '', author_role: '', content: '', rating: 5 });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Envoi en cours...');
    try {
      // Le backend enregistre et on appelle le callback pour rafraîchir la liste
      await api.post('/testimonials/public', formData);
      setStatus('Merci pour votre témoignage ! Il est maintenant en ligne.');
      setFormData({ author_name: '', author_role: '', content: '', rating: 5 });
      if (onTestimonialAdded) onTestimonialAdded();
    } catch (err) {
      setStatus('Erreur lors de l\'envoi du témoignage.');
    }
  };

  return (
    <div className="card shadow-sm border-0 p-4 mt-5 mx-auto" style={{ maxWidth: '800px' }} data-aos="fade-up">
      <h4 className="text-center mb-4">Laissez un avis !</h4>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <input type="text" className="form-control" placeholder="Votre nom" value={formData.author_name} onChange={(e) => setFormData({...formData, author_name: e.target.value})} required />
          </div>
          <div className="col-md-4">
            <input type="text" className="form-control" placeholder="Rôle (ex: Client, Abonné)" value={formData.author_role} onChange={(e) => setFormData({...formData, author_role: e.target.value})} />
          </div>
          <div className="col-md-2">
            <input type="number" className="form-control" placeholder="Note /5" min="1" max="5" value={formData.rating} onChange={(e) => setFormData({...formData, rating: e.target.value})} required />
          </div>
          <div className="col-12">
            <textarea className="form-control" rows="3" placeholder="Votre témoignage..." value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} required></textarea>
          </div>
          <div className="col-12 text-center mt-3">
            <button type="submit" className="btn btn-primary-custom">Publier l'avis</button>
          </div>
          {status && <div className="col-12 text-center mt-2 text-success fw-bold">{status}</div>}
        </div>
      </form>
    </div>
  );
};

export default TestimonialForm;
