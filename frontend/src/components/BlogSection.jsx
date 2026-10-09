import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const BlogSection = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await api.get('/articles');
        setArticles(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchArticles();
  }, []);

  if (!articles || articles.length === 0) {
    return <p className="text-center text-muted mt-4">Aucun article publié pour le moment.</p>;
  }

  return (
    <div className="row g-4 mt-4">
      {articles.slice(0, 3).map((article, index) => (
        <div key={article.id} className="col-md-4" data-aos="fade-up" data-aos-delay={index * 100}>
          <div className="card h-100 border-0 shadow-sm overflow-hidden" style={{ transition: 'transform 0.3s' }}>
            {article.image_url ? (
              <img src={article.image_url} alt={article.title} className="card-img-top object-fit-cover" style={{ height: '200px' }} />
            ) : (
              <div className="bg-secondary text-white d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                <span>Aucune image</span>
              </div>
            )}
            <div className="card-body p-4 d-flex flex-column">
              <small className="text-muted mb-2">{new Date(article.created_at).toLocaleDateString('fr-FR')}</small>
              <h5 className="card-title fw-bold text-primary">{article.title}</h5>
              <p className="card-text text-muted" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {article.content}
              </p>
              <Link to={`/blog/${article.id}`} className="mt-auto btn btn-outline-primary btn-sm align-self-start">Lire la suite &rarr;</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogSection;
