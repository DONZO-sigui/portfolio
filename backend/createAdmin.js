const bcrypt = require('bcryptjs');
const pool = require('./config/db');

const createAdmin = async () => {
    const email = 'donzosd63@gmail.com';
    const password = 'Donzo@12345678';

    try {
        // Vérifier si l'admin existe déjà
        const check = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (check.rows.length > 0) {
            console.log('L\'administrateur existe déjà !');
            console.log(`Email : ${email} | Mot de passe : ${password}`);
            process.exit(0);
        }

        // Hasher le mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insérer dans la base de données
        await pool.query(
            'INSERT INTO users (email, password) VALUES ($1, $2)',
            [email, hashedPassword]
        );

        console.log('✅ Compte Administrateur créé avec succès !');
        console.log(`Email : ${email}`);
        console.log(`Mot de passe : ${password}`);
        process.exit(0);
    } catch (error) {
        console.error('Erreur lors de la création de l\'admin :', error);
        process.exit(1);
    }
};

createAdmin();
