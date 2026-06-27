const pool = require('./config/db');

async function migrate() {
    try {
        await pool.query('DROP TABLE IF EXISTS statistics');
        
        await pool.query(`
            CREATE TABLE statistics (
                id SERIAL PRIMARY KEY,
                platform VARCHAR(50) NOT NULL,
                followers VARCHAR(50),
                engagement_rate VARCHAR(50),
                monthly_views VARCHAR(50),
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        await pool.query(`
            INSERT INTO statistics (platform, followers, engagement_rate, monthly_views) VALUES 
            ('Instagram', '100K', '5%', '1M'),
            ('TikTok', '500K', '8%', '5M'),
            ('YouTube', '50K', '10%', '300K'),
            ('Facebook', '20K', '3%', '100K')
        `);
        
        console.log('DB Migration complete');
    } catch (err) {
        console.error('Error during migration:', err);
    } finally {
        process.exit(0);
    }
}

migrate();
