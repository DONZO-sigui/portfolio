import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const ManageMedia = () => {
  const [medias, setMedias] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  
  // États pour la modification
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    fetchMedias();
  }, []);

  const fetchMedias = async () => {
    try {
      const res = await api.get('/medias');
      setMedias(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('media', file);
    formData.append('title', title);

    try {
      await api.post('/medias', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Média uploadé avec succès !');
      setFile(null);
      setTitle('');
      fetchMedias();
    } catch (err) {
      alert('Erreur lors de l\'upload.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce média ?')) return;
    try {
      await api.delete(`/medias/${id}`);
      fetchMedias();
    } catch (err) {
      alert('Erreur lors de la suppression.');
    }
  };

  const handleEditClick = (media) => {
    setEditingId(media.id);
    setEditTitle(media.title);
  };

  const handleSaveEdit = async (id) => {
    try {
      await api.put(`/medias/${id}`, { title: editTitle });
      alert('Titre modifié avec succès !');
      setEditingId(null);
      fetchMedias();
    } catch (err) {
      alert('Erreur lors de la modification.');
    }
  };

  return (
    <div className="card shadow-sm border-0 p-4">
      <h4 className="mb-4 text-primary">Gérer le Portfolio (Médias)</h4>
      
      <form onSubmit={handleUpload} className="mb-5 bg-light p-3 rounded">
        <h5>Ajouter un nouveau média (Image/Vidéo)</h5>
        <div className="row g-3">
          <div className="col-md-5">
            <input type="text" className="form-control" placeholder="Titre du média" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="col-md-5">
            <input type="file" className="form-control" accept="image/*,video/*" onChange={(e) => setFile(e.target.files[0])} required />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary-custom w-100" disabled={uploading}>
              {uploading ? 'Upload...' : 'Ajouter'}
            </button>
          </div>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Aperçu</th>
              <th>Titre</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {medias.map(media => (
              <tr key={media.id}>
                <td>
                  {media.type === 'video' ? (
                    <video src={media.url} width="60" height="60" className="object-fit-cover rounded" />
                  ) : (
                    <img src={media.url} alt={media.title} width="60" height="60" className="object-fit-cover rounded" />
                  )}
                </td>
                <td>
                  {editingId === media.id ? (
                    <input type="text" className="form-control form-control-sm" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                  ) : (
                    media.title
                  )}
                </td>
                <td><span className={`badge ${media.type === 'video' ? 'bg-info' : 'bg-success'}`}>{media.type}</span></td>
                <td>
                  {editingId === media.id ? (
                    <>
                      <button className="btn btn-sm btn-success me-2" onClick={() => handleSaveEdit(media.id)} title="Valider"><FaSave /></button>
                      <button className="btn btn-sm btn-secondary" onClick={() => setEditingId(null)} title="Annuler"><FaTimes /></button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-sm btn-warning text-white me-2" onClick={() => handleEditClick(media)} title="Modifier le titre"><FaEdit /></button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(media.id)} title="Supprimer"><FaTrash /></button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {medias.length === 0 && <p className="text-center text-muted">Aucun média trouvé.</p>}
      </div>
    </div>
  );
};

export default ManageMedia;
