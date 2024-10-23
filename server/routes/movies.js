const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/submit', (req, res) => {
    const { title, director, releaseYear, genre } = req.body; 

    
    if (!title || !director || !releaseYear || !genre) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const query = 'INSERT INTO movies (title, director, releaseYear, genre) VALUES (?, ?, ?, ?)';
    
    db.query(query, [title, director, releaseYear, genre], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
            id: results.insertId,
            title,
            director,
            releaseYear,
            genre
        });
    });
});

router.get('/', (req, res) => {
    const query = 'SELECT * FROM movies';
    
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.get('/titles', (req, res) => {
    const query = 'SELECT id, title FROM movies'; 

    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM movies WHERE id = ?';
    
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).send();
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const query = 'UPDATE movies SET title = ? WHERE id = ?';

    db.query(query, [title, id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id, title });
    });
});

module.exports = router;
