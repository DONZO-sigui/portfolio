import React, { useEffect, useRef } from 'react';
import { FaUserCircle, FaStar } from 'react-icons/fa';

const TestimonialFeed = ({ testimonials }) => {
  const feedRef = useRef(null);

  // Auto-scroll subtil vers le haut si on veut un effet live continu
  // Pour un portfolio, laisser l'utilisateur scroller est souvent plus confortable,
  // mais nous ajoutons un effet d'apparition (fade-in) pour les nouveaux messages.

  return (
    <div className="testimonial-feed-container shadow-sm bg-white rounded p-3" style={{ height: '400px', overflowY: 'auto', border: '1px solid #e2e8f0' }}>
      {testimonials.length === 0 ? (
        <p className="text-center text-muted mt-5">Soyez le premier à laisser un avis !</p>
      ) : (
        <div className="d-flex flex-column gap-3">
          {testimonials.map((test, index) => (
            <div 
              key={test.id} 
              className="testimonial-bubble d-flex gap-3 p-3 rounded" 
              style={{ backgroundColor: '#f8fafc', animation: 'fadeInUp 0.5s ease-out forwards' }}
            >
              <FaUserCircle size={40} className="text-secondary" />
              <div className="w-100">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <h6 className="mb-0 fw-bold">{test.author_name}</h6>
                  <small className="text-muted">{new Date(test.created_at).toLocaleDateString()}</small>
                </div>
                <small className="text-primary fw-semibold d-block mb-2">{test.author_role}</small>
                <p className="mb-1 text-dark" style={{ fontSize: '0.95rem' }}>{test.content}</p>
                <div className="text-warning small mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} color={i < test.rating ? '#F59E0B' : '#e2e8f0'} />
                  ))}
                </div>
                
                {test.admin_reply && (
                  <div className="admin-reply bg-white p-2 rounded border border-light" style={{ marginLeft: '20px' }}>
                    <small className="d-block fw-bold text-primary mb-1">↳ Réponse de l'auteur :</small>
                    <p className="mb-0 text-muted" style={{ fontSize: '0.9rem' }}>{test.admin_reply}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <style>{`
        .testimonial-feed-container::-webkit-scrollbar {
          width: 6px;
        }
        .testimonial-feed-container::-webkit-scrollbar-track {
          background: #f1f1f1; 
          border-radius: 10px;
        }
        .testimonial-feed-container::-webkit-scrollbar-thumb {
          background: #cbd5e1; 
          border-radius: 10px;
        }
        .testimonial-feed-container::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; 
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default TestimonialFeed;
