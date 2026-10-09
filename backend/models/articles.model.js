const pool = require('../config/db');

const getAllArticles = async () => {
    const result = await pool.query('SELECT * FROM articles ORDER BY created_at DESC');
    return result.rows;
};

const getArticleById = async (id) => {
    const result = await pool.query('SELECT * FROM articles WHERE id = $1', [id]);
    return result.rows[0];
};

const createArticle = async (title, content, imageUrl) => {
    const result = await pool.query(
        'INSERT INTO articles (title, content, image_url) VALUES ($1, $2, $3) RETURNING *',
        [title, content, imageUrl]
    );
    return result.rows[0];
};

const updateArticle = async (id, title, content) => {
    const result = await pool.query(
        'UPDATE articles SET title = $1, content = $2 WHERE id = $3 RETURNING *',
        [title, content, id]
    );
    return result.rows[0];
};

const deleteArticle = async (id) => {
    await pool.query('DELETE FROM articles WHERE id = $1', [id]);
};

module.exports = {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle
};
