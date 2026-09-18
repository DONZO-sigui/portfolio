import React, { useState } from 'react';
import { FaHeart, FaExpand, FaTimes } from 'react-icons/fa';
import api from '../services/api';

const MediaGallery = ({ medias: initialMedias }) => {
  const [medias, setMedias] = useState(initialMedias || []);
  const [selectedMedia, setSelectedMedia] = useState(null);

  // Synchroniser l'état local si les props changent
  React.useEffect(() => {
    setMedias(initialMedias || []);
  }, [initialMedias]);

  const handleLike = async (e, mediaId) => {
    e.stopPropagation(); // Évite d'ouvrir l'image quand on like
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
    <>
      <div className="row g-4">
        {medias.map((media, index) => {
          const likedMedias = JSON.parse(localStorage.getItem('likedMedias')) || [];
          const isLiked = likedMedias.includes(media.id);

          return (
            <div key={media.id} className="col-md-4" data-aos="zoom-in" data-aos-delay={index * 100}>
              <div 
                className="gallery-item position-relative shadow-sm rounded overflow-hidden" 
                style={{ cursor: 'pointer', height: '100%', minHeight: '250px' }}
                onClick={() => setSelectedMedia(media)}
              >
                {media.type === 'video' ? (
                  <video src={media.url} className="w-100 h-100 object-fit-cover position-absolute top-0 start-0" preload="metadata"></video>
                ) : (
                  <img src={media.url} alt={media.title} className="w-100 h-100 object-fit-cover position-absolute top-0 start-0" />
                )}
                
                {/* Icône d'agrandissement au survol */}
                <div className="position-absolute top-0 end-0 p-2 opacity-75">
                  <span className="badge bg-dark rounded-circle p-2"><FaExpand /></span>
                </div>

                <div className="position-absolute bottom-0 start-0 w-100 p-3 bg-dark bg-opacity-75 text-white d-flex flex-column justify-content-end" style={{ zIndex: 2 }}>
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <h5 className="mb-0 fw-bold">{media.title}</h5>
                    <button 
                      className="btn btn-sm d-flex align-items-center gap-1 text-white border-0" 
                      onClick={(e) => handleLike(e, media.id)}
                      style={{ background: 'transparent' }}
                    >
                      <FaHeart color={isLiked ? '#dc3545' : 'white'} size={20} />
                      <span>{media.likes || 0}</span>
                    </button>
                  </div>
                  {media.description && (
                    <p className="small mb-0 opacity-75">{media.description}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox / Modal d'agrandissement */}
      {selectedMedia && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center" 
          style={{ zIndex: 1050, backdropFilter: 'blur(5px)' }} 
          onClick={() => setSelectedMedia(null)}
        >
          <button 
            className="position-absolute top-0 end-0 m-4 btn text-white fs-3 border-0" 
            onClick={() => setSelectedMedia(null)}
            style={{ zIndex: 1060 }}
          >
            <FaTimes />
          </button>
          
          <div className="position-relative text-center" style={{ maxWidth: '90%', maxHeight: '90%' }} onClick={(e) => e.stopPropagation()}>
            {selectedMedia.type === 'video' ? (
              <video src={selectedMedia.url} className="rounded shadow" controls autoPlay style={{ maxWidth: '100%', maxHeight: '75vh' }}></video>
            ) : (
              <img src={selectedMedia.url} alt={selectedMedia.title} className="img-fluid rounded shadow" style={{ maxHeight: '75vh' }} />
            )}
            <div className="text-white mt-3 px-3 py-2 bg-dark bg-opacity-50 rounded d-inline-block shadow" style={{ maxWidth: '100%' }}>
              <h4 className="fw-bold mb-1">{selectedMedia.title}</h4>
              {selectedMedia.description && <p className="mb-0 text-light">{selectedMedia.description}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MediaGallery;

export default MediaGallery;
