import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import api from '../services/api';

const MediaGallery = ({ medias: initialMedias }) => {
  const [medias, setMedias] = useState(initialMedias || []);

  // Synchroniser l'état local si les props changent
  React.useEffect(() => {
    setMedias(initialMedias || []);
  }, [initialMedias]);

  const handleLike = async (mediaId) => {
    // Vérifier si l'utilisateur a déjà liké
    const likedMedias = JSON.parse(localStorage.getItem('likedMedias')) || [];
    if (likedMedias.includes(mediaId)) return; // Empêcher le double like localement

    try {
      const res = await api.post(`/medias/${mediaId}/like`);
      // Mettre à jour l'état local
      setMedias(medias.map(m => m.id === mediaId ? res.data : m));
      // Enregistrer dans le localStorage
      likedMedias.push(mediaId);
      localStorage.setItem('likedMedias', JSON.stringify(likedMedias));
    } catch (err) {
      console.error('Erreur lors du like', err);
    }
  };

  if (!medias || medias.length === 0) {
    return <p className="text-center text-muted">Aucun média à afficher pour le moment.</p>;
  }

  return (
    <div className="row g-4">
      {medias.map((media, index) => {
        const likedMedias = JSON.parse(localStorage.getItem('likedMedias')) || [];
        const isLiked = likedMedias.includes(media.id);

        return (
          <div key={media.id} className="col-md-4" data-aos="zoom-in" data-aos-delay={index * 100}>
            <div className="gallery-item position-relative">
              {media.type === 'video' ? (
                <video src={media.url} className="w-100 h-100 object-fit-cover" controls preload="metadata"></video>
              ) : (
                <img src={media.url} alt={media.title} className="img-fluid" />
              )}
              <div className="position-absolute bottom-0 start-0 w-100 p-3 bg-dark bg-opacity-50 text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{media.title}</h5>
                <button 
                  className="btn btn-sm d-flex align-items-center gap-1 text-white border-0" 
                  onClick={() => handleLike(media.id)}
                  style={{ background: 'transparent' }}
                >
                  <FaHeart color={isLiked ? '#dc3545' : 'white'} size={20} />
                  <span>{media.likes || 0}</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MediaGallery;
