import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FaTrash } from 'react-icons/fa';

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await api.get('/contacts');
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce message ?')) return;
    try {
      await api.delete(`/contacts/${id}`);
      fetchMessages();
    } catch (err) {
      alert('Erreur lors de la suppression.');
    }
  };

  return (
    <div className="card shadow-sm border-0 p-4">
      <h4 className="mb-4 text-primary">Boîte de Réception</h4>
      <div className="accordion" id="messagesAccordion">
        {messages.length === 0 ? (
          <p className="text-muted">Aucun message reçu pour le moment.</p>
        ) : (
          messages.map((msg, index) => (
            <div className="accordion-item" key={msg.id}>
              <h2 className="accordion-header" id={`heading${msg.id}`}>
                <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${msg.id}`}>
                  {msg.subject} - De: {msg.name} ({new Date(msg.created_at).toLocaleDateString()})
                </button>
              </h2>
              <div id={`collapse${msg.id}`} className="accordion-collapse collapse" data-bs-parent="#messagesAccordion">
                <div className="accordion-body bg-light position-relative">
                  <button 
                    className="btn btn-sm btn-danger position-absolute top-0 end-0 m-3" 
                    onClick={() => handleDelete(msg.id)}
                    title="Supprimer le message"
                  >
                    <FaTrash />
                  </button>
                  <p><strong>Email :</strong> <a href={`mailto:${msg.email}`}>{msg.email}</a></p>
                  <hr />
                  <p className="whitespace-pre-wrap">{msg.message}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageMessages;
