const pool = require('../config/db');

const getAllContacts = async () => {
    const { rows } = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    return rows;
};

const createContact = async (name, email, subject, message) => {
    const { rows } = await pool.query(
        'INSERT INTO contacts (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, email, subject, message]
    );
    return rows[0];
};

const deleteContact = async (id) => {
    await pool.query('DELETE FROM contacts WHERE id = $1', [id]);
};

module.exports = { getAllContacts, createContact, deleteContact };
