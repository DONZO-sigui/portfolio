const fs = require('fs');
const path = require('path');
const pool = require('./config/db');

const initDatabase = async () => {
  try {
    const sqlFilePath = path.join(__dirname, 'database.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf8');
    
    console.log('Exécution du script de création de la base de données...');
    await pool.query(sql);
    console.log('✅ Base de données initialisée avec succès !');
    
    // Fermeture du pool de connexion
    await pool.end();
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de la base de données :', error);
    process.exit(1);
  }
};

initDatabase();
