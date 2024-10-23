
const express = require('express');
const db = require('../db'); 
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;


    try {
        const result = await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed. Please try again.' });
    }
});

module.exports = router;
