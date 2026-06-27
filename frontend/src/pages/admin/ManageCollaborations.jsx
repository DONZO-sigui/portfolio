import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const ManageCollaborations = () => {
  const [collabs, setCollabs] = useState([]);
  const [brandName, setBrandName] = useState('');
  const [link, setLink] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  // États pour la modification
  const [editingId, setEditingId] = useState(null);
  const [editBrandName, setEditBrandName] = useState('');
  const [editLink, setEditLink] = useState('');

  useEffect(() => {
    fetchCollabs();
  }, []);

  const fetchCollabs = async () => {
    try {
      const res = await api.get('/collaborations');
      setCollabs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('logo', file);
    formData.append('brand_name', brandName);
    formData.append('link', link);

    try {
      await api.post('/collaborations', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Collaboration ajoutée !');
      setFile(null);
      setBrandName('');
      setLink('');
      fetchCollabs();
    } catch (err) {
      alert('Erreur lors de l\'ajout.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cette collab ?')) return;
    try {
      await api.delete(`/collaborations/${id}`);
      fetchCollabs();
    } catch (err) {
      alert('Erreur lors de la suppression.');
    }
  };

  const handleEditClick = (collab) => {
    setEditingId(collab.id);
    setEditBrandName(collab.brand_name);
    setEditLink(collab.link || '');
  };

  const handleSaveEdit = async (id) => {
    try {
      await api.put(`/collaborations/${id}`, {
        brand_name: editBrandName,
        link: editLink
      });
      alert('Collaboration modifiée avec succès !');
      setEditingId(null);
      fetchCollabs();
    } catch (err) {
      alert('Erreur lors de la modification.');
    }
  };

  return (
    <div className="card shadow-sm border-0 p-4">
      <h4 className="mb-4 text-primary">Marques Partenaires</h4>
      
      <form onSubmit={handleUpload} className="mb-5 bg-light p-3 rounded">
        <h5>Ajouter une marque</h5>
        <div className="row g-3">
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Nom de la marque" value={brandName} onChange={(e) => setBrandName(e.target.value)} required />
          </div>
          <div className="col-md-3">
            <input type="url" className="form-control" placeholder="Lien du site web" value={link} onChange={(e) => setLink(e.target.value)} />
          </div>
          <div className="col-md-4">
            <input type="file" className="form-control" accept="image/*" onChange={(e) => setFile(e.target.files[0])} required />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary-custom w-100" disabled={uploading}>
              {uploading ? 'Ajout...' : 'Ajouter'}
            </button>
          </div>
        </div>
      </form>

      <div className="row g-3">
        {collabs.map(collab => (
          <div className="col-md-4" key={collab.id}>
            <div className="card text-center p-3 h-100 d-flex flex-column justify-content-between">
              <div>
                <img src={collab.brand_logo} alt={collab.brand_name} height="50" className="object-fit-contain mx-auto mb-3" />
                
                {editingId === collab.id ? (
                  <div className="mb-3 text-start">
                    <input type="text" className="form-control form-control-sm mb-2" value={editBrandName} onChange={(e) => setEditBrandName(e.target.value)} placeholder="Nom de la marque" />
                    <input type="url" className="form-control form-control-sm" value={editLink} onChange={(e) => setEditLink(e.target.value)} placeholder="Lien du site" />
                  </div>
                ) : (
                  <>
                    <h6 className="mb-1">{collab.brand_name}</h6>
                    {collab.link && <a href={collab.link} target="_blank" rel="noreferrer" className="small text-muted d-block mb-2">Visiter le site</a>}
                  </>
                )}
              </div>

              <div className="d-flex justify-content-center gap-2 mt-auto">
                {editingId === collab.id ? (
                  <>
                    <button className="btn btn-sm btn-success flex-fill" onClick={() => handleSaveEdit(collab.id)}><FaSave /> Valider</button>
                    <button className="btn btn-sm btn-secondary flex-fill" onClick={() => setEditingId(null)}><FaTimes /> Annuler</button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-sm btn-warning flex-fill text-white" onClick={() => handleEditClick(collab)}><FaEdit /> Modifier</button>
                    <button className="btn btn-sm btn-danger flex-fill" onClick={() => handleDelete(collab.id)}><FaTrash /> Supprimer</button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCollaborations;
