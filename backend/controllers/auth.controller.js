const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UsersModel = require('../models/users.model');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UsersModel.getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1d' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await UsersModel.getUserByEmail(email);
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await UsersModel.createUser(email, hashedPassword);

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { login, register };
