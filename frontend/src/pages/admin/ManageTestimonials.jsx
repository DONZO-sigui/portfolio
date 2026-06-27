import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FaTrash, FaReply } from 'react-icons/fa';

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [replyInputs, setReplyInputs] = useState({});

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await api.get('/testimonials');
      setTestimonials(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReplyChange = (id, text) => {
    setReplyInputs({ ...replyInputs, [id]: text });
  };

  const handleSendReply = async (id) => {
    try {
      await api.post(`/testimonials/${id}/reply`, { replyText: replyInputs[id] });
      alert('Réponse envoyée avec succès !');
      fetchTestimonials();
    } catch (err) {
      alert('Erreur lors de l\'envoi de la réponse.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce témoignage ?')) return;
    try {
      await api.delete(`/testimonials/${id}`);
      fetchTestimonials();
    } catch (err) {
      alert('Erreur lors de la suppression.');
    }
  };

  return (
    <div className="card shadow-sm border-0 p-4">
      <h4 className="mb-4 text-primary">Témoignages</h4>

      <ul className="list-group">
        {testimonials.map(test => (
          <li className="list-group-item" key={test.id}>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <strong>{test.author_name}</strong> - <span className="text-muted">{test.author_role}</span>
                <p className="mb-0 fst-italic mt-1">"{test.content}"</p>
                <small className="text-warning">{'★'.repeat(test.rating)}</small>
                
                {test.admin_reply ? (
                  <div className="mt-2 p-2 bg-light border-start border-3 border-primary">
                    <small className="fw-bold">Votre réponse :</small>
                    <p className="mb-0 small text-muted">{test.admin_reply}</p>
                  </div>
                ) : null}
                
                <div className="mt-3 d-flex gap-2">
                  <input 
                    type="text" 
                    className="form-control form-control-sm" 
                    placeholder="Taper une réponse..." 
                    value={replyInputs[test.id] || ''} 
                    onChange={(e) => handleReplyChange(test.id, e.target.value)} 
                  />
                  <button className="btn btn-sm btn-primary-custom d-flex align-items-center gap-1" onClick={() => handleSendReply(test.id)}>
                    <FaReply /> Répondre
                  </button>
                </div>
              </div>
              <button className="btn btn-sm btn-danger ms-3" onClick={() => handleDelete(test.id)}><FaTrash /></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageTestimonials;
