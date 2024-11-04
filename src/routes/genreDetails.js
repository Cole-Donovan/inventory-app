const express = require('express');
const { getGamesByGenre } = require('../database/queries'); // Assumes a query function for this purpose
const router = express.Router();

// Route to display games by a specific genre
router.get('/:id', async (req, res) => {
    const genreId = req.params.id;
    try {
        const games = await getGamesByGenre(genreId);
        res.render('genreDetails', { games }); // Render a page with games in this genre
    } catch (err) {
        console.error('Error retrieving games by genre:', err.stack);
        res.status(500).send('Error retrieving games');
    }
});

module.exports = router;
