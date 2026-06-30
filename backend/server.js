require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
    origin: process.env.FRONTEND_URL || '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Default route
app.get('/', (req, res) => {
    res.send('Influencer Portfolio API is running...');
});

// Import routes (To be created)
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/statistics', require('./routes/statistics.routes'));
app.use('/api/medias', require('./routes/medias.routes'));
app.use('/api/collaborations', require('./routes/collaborations.routes'));
app.use('/api/testimonials', require('./routes/testimonials.routes'));
app.use('/api/contacts', require('./routes/contacts.routes'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




