const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
    const { movieId, userId, rating, reviewText } = req.body;

    if (!movieId || !userId || typeof rating !== 'number' || rating < 1 || rating > 5 || !reviewText) {
        return res.status(400).json({ message: 'All fields are required and rating must be between 1 and 5.' });
    }

    const sql = 'INSERT INTO reviews (movieId, userId, rating, reviewText, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())';

    db.query(sql, [movieId, userId, rating, reviewText], (err, result) => {
        if (err) {
            console.error('Error inserting review:', err);
            return res.status(500).json({ message: 'Error submitting review' });
        }
        res.status(201).json({ message: 'Review submitted successfully!', reviewId: result.insertId });
    });
});

module.exports = router;
