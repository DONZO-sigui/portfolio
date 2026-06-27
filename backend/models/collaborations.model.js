const pool = require('../config/db');

const getAllCollaborations = async () => {
    const { rows } = await pool.query('SELECT * FROM collaborations ORDER BY created_at DESC');
    return rows;
};

const createCollaboration = async (brand_name, brand_logo, description, link, public_id) => {
    const { rows } = await pool.query(
        'INSERT INTO collaborations (brand_name, brand_logo, description, link, public_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [brand_name, brand_logo, description, link, public_id]
    );
    return rows[0];
};

const updateCollaboration = async (id, brand_name, description, link) => {
    const { rows } = await pool.query(
        'UPDATE collaborations SET brand_name = $1, description = $2, link = $3 WHERE id = $4 RETURNING *',
        [brand_name, description, link, id]
    );
    return rows[0];
};

const deleteCollaboration = async (id) => {
    const { rows } = await pool.query('DELETE FROM collaborations WHERE id = $1 RETURNING *', [id]);
    return rows[0];
};

const getCollaborationById = async (id) => {
    const { rows } = await pool.query('SELECT * FROM collaborations WHERE id = $1', [id]);
    return rows[0];
};

module.exports = { getAllCollaborations, createCollaboration, updateCollaboration, deleteCollaboration, getCollaborationById };
