const { Pool } = require('pg');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  ssl: isProduction ? { rejectUnauthorized: false } : false
});

pool.connect()
  .then(async (client) => {
    console.log('Connected to PostgreSQL Database');
    try {
      await client.query('ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS admin_reply TEXT;');
      console.log('Migration OK : Colonne admin_reply vérifiée.');
    } catch (e) {
      console.error('Erreur lors de la migration', e);
    } finally {
      client.release();
    }
  })
  .catch((err) => console.error('Database connection error', err));
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
