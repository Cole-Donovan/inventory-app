const express = require('express');
const { getGameById } = require('../database/queries');
const router = express.Router();

router.get('/:id', async (req, res) => {
    const gameId = req.params.id;
    try {
        const game = await getGameById(gameId);
        if (game) {
            res.render('layout', { 
                body: 'gameDetails',
                game 
            });
        } else {
            res.status(404).send('Game not found');
        }
    } catch (err) {
        console.error('Error retrieving game details', err.stack);
        res.status(500).send('Error retrieving game details');
    }
});

module.exports = router;
