import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const ManageBlog = () => {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await api.get('/articles');
      setArticles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (file) formData.append('image', file);

    try {
      await api.post('/articles', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Article publié avec succès !');
      setTitle('');
      setContent('');
      setFile(null);
      fetchArticles();
    } catch (err) {
      alert('Erreur lors de la publication.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cet article ?')) return;
    try {
      await api.delete(`/articles/${id}`);
      fetchArticles();
    } catch (err) {
      alert('Erreur lors de la suppression.');
    }
  };

  const handleEditClick = (article) => {
    setEditingId(article.id);
    setEditTitle(article.title);
    setEditContent(article.content);
  };

  const handleSaveEdit = async (id) => {
    try {
      await api.put(`/articles/${id}`, { title: editTitle, content: editContent });
      alert('Modifié avec succès !');
      setEditingId(null);
      fetchArticles();
    } catch (err) {
      alert('Erreur lors de la modification.');
    }
  };

  return (
    <div className="card shadow-sm border-0 p-4">
      <h4 className="mb-4 text-primary">Gérer le Blog</h4>
      
      <form onSubmit={handleUpload} className="mb-5 bg-light p-3 rounded">
        <h5>Nouvel Article</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <input type="text" className="form-control" placeholder="Titre de l'article" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="col-md-6">
            <input type="file" className="form-control" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <div className="col-12">
            <textarea className="form-control" placeholder="Contenu de l'article..." rows="6" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
          </div>
          <div className="col-md-3">
            <button type="submit" className="btn btn-primary-custom w-100" disabled={uploading}>
              {uploading ? 'Publication...' : 'Publier'}
            </button>
          </div>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th>Titre & Contenu</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article => (
              <tr key={article.id}>
                <td>
                  {article.image_url ? (
                    <img src={article.image_url} alt={article.title} width="80" height="60" className="object-fit-cover rounded" />
                  ) : (
                    <span className="text-muted small">Aucune image</span>
                  )}
                </td>
                <td>
                  {editingId === article.id ? (
                    <>
                      <input type="text" className="form-control mb-2" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                      <textarea className="form-control" rows="3" value={editContent} onChange={(e) => setEditContent(e.target.value)}></textarea>
                    </>
                  ) : (
                    <>
                      <strong>{article.title}</strong>
                      <p className="text-muted small mb-0" style={{ maxWidth: '400px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{article.content}</p>
                    </>
                  )}
                </td>
                <td>
                  {editingId === article.id ? (
                    <>
                      <button className="btn btn-sm btn-success me-2" onClick={() => handleSaveEdit(article.id)} title="Valider"><FaSave /></button>
                      <button className="btn btn-sm btn-secondary" onClick={() => setEditingId(null)} title="Annuler"><FaTimes /></button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-sm btn-warning text-white me-2" onClick={() => handleEditClick(article)} title="Modifier"><FaEdit /></button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(article.id)} title="Supprimer"><FaTrash /></button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {articles.length === 0 && <p className="text-center text-muted">Aucun article publié.</p>}
      </div>
    </div>
  );
};

export default ManageBlog;
