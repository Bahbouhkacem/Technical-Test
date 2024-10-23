const express = require('express');
const router = express.Router();
const db = require('../db'); 

router.post('/submit', async (req, res) => {
    const { title, director, releaseYear, genre } = req.body;

    if (!title || !director || !releaseYear || !genre) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        await db.query('INSERT INTO movies (title, director, releaseYear, genre) VALUES (?, ?, ?, ?)', 
            [title, director, releaseYear, genre]);
        res.status(201).json({ message: 'Movie submitted successfully!' });
    } catch (err) {
        console.error('Error adding movie:', err);
        res.status(500).json({ message: 'Server error when submitting movie.' });
    }
});

module.exports = router;
