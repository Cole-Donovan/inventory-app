const express = require('express');
const { getAllGenres } = require('../database/queries');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const genres = await getAllGenres();
        res.render('layout', { 
            body: 'genres', 
            genres 
        });
    } catch (err) {
        console.error('Error retrieving genres:', err.stack);
        res.status(500).send('Error retrieving genres');
    }
});

module.exports = router;
