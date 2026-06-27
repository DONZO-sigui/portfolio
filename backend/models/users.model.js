const pool = require('../config/db');

const getUserByEmail = async (email) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0];
};

const createUser = async (email, hashedPassword) => {
    const { rows } = await pool.query(
        'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
        [email, hashedPassword]
    );
    return rows[0];
};

module.exports = { getUserByEmail, createUser };
