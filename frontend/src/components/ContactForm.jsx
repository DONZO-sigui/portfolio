import React, { useState } from 'react';
import api from '../services/api';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Envoi en cours...');
    try {
      await api.post('/contacts', formData);
      setStatus('Message envoyé avec succès !');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus('Erreur lors de l\'envoi du message.');
    }
  };

  return (
    <div className="card shadow-sm border-0 p-4" data-aos="fade-up">
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <input type="text" name="name" className="form-control" placeholder="Votre Nom" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <input type="email" name="email" className="form-control" placeholder="Votre Email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="col-12">
            <input type="text" name="subject" className="form-control" placeholder="Sujet" value={formData.subject} onChange={handleChange} required />
          </div>
          <div className="col-12">
            <textarea name="message" className="form-control" rows="5" placeholder="Votre Message" value={formData.message} onChange={handleChange} required></textarea>
          </div>
          <div className="col-12 text-center mt-4">
            <button type="submit" className="btn btn-primary-custom px-5 py-2">Envoyer le message</button>
          </div>
          {status && <div className="col-12 text-center mt-3 text-muted">{status}</div>}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
