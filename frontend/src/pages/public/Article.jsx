import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import Navbar from '../../components/Navbar';

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await api.get(`/articles/${id}`);
        setArticle(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container py-5 text-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      </>
    );
  }

  if (!article) {
    return (
      <>
        <Navbar />
        <div className="container py-5 text-center mt-5">
          <h2>Article introuvable</h2>
          <Link to="/" className="btn btn-primary mt-3">Retour à l'accueil</Link>
        </div>
      </>
    );
  }

  return (
    <div className="bg-light min-vh-100 pb-5">
      <Navbar />
      
      {/* Header with Background Image (if exists) */}
      <div 
        className="position-relative d-flex align-items-center justify-content-center" 
        style={{ 
          height: '40vh', 
          backgroundColor: '#333',
          backgroundImage: article.image_url ? `url(${article.image_url})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          marginTop: '60px' // for fixed navbar
        }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-75"></div>
        <div className="container position-relative z-1 text-center text-white px-4">
          <h1 className="fw-bold display-4 mb-3">{article.title}</h1>
          <p className="lead opacity-75 mb-0">Publié le {new Date(article.created_at).toLocaleDateString('fr-FR')}</p>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm p-4 p-md-5">
              {/* Content processing (preserving line breaks) */}
              {article.content.split('\n').map((paragraph, idx) => (
                <p key={idx} className="fs-5" style={{ lineHeight: '1.8' }}>
                  {paragraph}
                </p>
              ))}
              
              <div className="mt-5 text-center">
                <Link to="/" className="btn btn-outline-primary">&larr; Retour au portfolio</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
