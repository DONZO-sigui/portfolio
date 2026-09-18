const pool = require('../config/db');

const getAllMedias = async () => {
    const { rows } = await pool.query('SELECT * FROM medias ORDER BY created_at DESC');
    return rows;
};

const createMedia = async (title, url, type, public_id, description) => {
    const { rows } = await pool.query(
        'INSERT INTO medias (title, url, type, public_id, description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [title, url, type, public_id, description]
    );
    return rows[0];
};

const updateMedia = async (id, title, description) => {
    const { rows } = await pool.query(
        'UPDATE medias SET title = $1, description = $2 WHERE id = $3 RETURNING *',
        [title, description, id]
    );
    return rows[0];
};

const deleteMedia = async (id) => {
    const { rows } = await pool.query(
        'DELETE FROM medias WHERE id = $1 RETURNING *',
        [id]
    );
    return rows[0];
};

const getMediaById = async (id) => {
    const { rows } = await pool.query('SELECT * FROM medias WHERE id = $1', [id]);
    return rows[0];
};

const likeMedia = async (id) => {
    const { rows } = await pool.query(
        'UPDATE medias SET likes = COALESCE(likes, 0) + 1 WHERE id = $1 RETURNING *',
        [id]
    );
    return rows[0];
};

module.exports = { getAllMedias, createMedia, updateMedia, deleteMedia, getMediaById, likeMedia };
