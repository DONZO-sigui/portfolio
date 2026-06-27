const pool = require('../config/db');

const getAllTestimonials = async () => {
    const { rows } = await pool.query('SELECT * FROM testimonials ORDER BY created_at DESC');
    return rows;
};

const createTestimonial = async (author_name, author_role, content, rating) => {
    const { rows } = await pool.query(
        'INSERT INTO testimonials (author_name, author_role, content, rating) VALUES ($1, $2, $3, $4) RETURNING *',
        [author_name, author_role, content, rating]
    );
    return rows[0];
};

const updateTestimonial = async (id, author_name, author_role, content, rating) => {
    const { rows } = await pool.query(
        'UPDATE testimonials SET author_name = $1, author_role = $2, content = $3, rating = $4 WHERE id = $5 RETURNING *',
        [author_name, author_role, content, rating, id]
    );
    return rows[0];
};

const deleteTestimonial = async (id) => {
    await pool.query('DELETE FROM testimonials WHERE id = $1', [id]);
};

const replyToTestimonial = async (id, replyText) => {
    const { rows } = await pool.query(
        'UPDATE testimonials SET admin_reply = $1 WHERE id = $2 RETURNING *',
        [replyText, id]
    );
    return rows[0];
};

module.exports = { getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial, replyToTestimonial };
