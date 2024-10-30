const express = require('express');
const { getAllGames } = require('../database/queries');
const router = express.Router();

// GET route for games
router.get('/', async (req, res) => {
    try {
        const games = await getAllGames();
        res.render('games', { games }); // Render 'games.ejs' and pass the games data
    } catch (err) {
        console.error('Error retrieving games:', err.stack);
        res.status(500).send('Error retrieving games');
    }
});

module.exports = router;
