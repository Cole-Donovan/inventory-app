const express = require('express');
const { getAllGames } = require('../database/queries'); 
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const games = await getAllGames();
        res.render('layout', { 
            body: 'games', 
            games 
        });
    } catch (err) {
        console.error('Error retrieving games:', err.stack);
        res.status(500).send('Error retrieving games');
    }
});

module.exports = router;
