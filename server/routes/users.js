const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../db');

const SECRET_KEY = 'your_jwt_secret'; 

// User registration
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, username, password } = req.body;

    if (!firstName || !lastName || !email || !username || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const checkUserQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
        db.query(checkUserQuery, [username, email], async (err, results) => {
            if (err) return res.status(500).json({ error: err.message });

            if (results.length > 0) {
                return res.status(400).json({ message: 'Username or email already exists.' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert new user
            const insertQuery = 'INSERT INTO users (firstName, lastName, email, username, password) VALUES (?, ?, ?, ?, ?)';
            db.query(insertQuery, [firstName, lastName, email, username, hashedPassword], (err, results) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ id: results.insertId, username });
            });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id }, SECRET_KEY);
        res.json({ token });
    });
});

module.exports = router;
