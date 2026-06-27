-- Initial Database Schema for Influencer Portfolio

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS statistics (
    id SERIAL PRIMARY KEY,
    followers VARCHAR(50) NOT NULL,
    engagement_rate VARCHAR(50) NOT NULL,
    monthly_views VARCHAR(50) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS medias (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'image' or 'video'
    public_id VARCHAR(255), -- for Cloudinary deletion
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS collaborations (
    id SERIAL PRIMARY KEY,
    brand_name VARCHAR(255) NOT NULL,
    brand_logo VARCHAR(500) NOT NULL,
    description TEXT,
    link VARCHAR(500),
    public_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS testimonials (
    id SERIAL PRIMARY KEY,
    author_name VARCHAR(255) NOT NULL,
    author_role VARCHAR(255),
    content TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default statistics if not exists
INSERT INTO statistics (followers, engagement_rate, monthly_views)
SELECT '100K', '5.2%', '1M'
WHERE NOT EXISTS (SELECT 1 FROM statistics);
