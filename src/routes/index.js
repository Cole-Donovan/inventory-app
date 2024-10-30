// src/routes/index.js
const express = require('express');
const gamesRouter = require('./games');
const gameDetailsRouter = require('./gameDetails'); // New import for game details

const router = express.Router();

// Use the games routes for the /games path
router.use('/games', gamesRouter);
router.use('/games', gameDetailsRouter); // Use gameDetails for /games/:id routes

// Homepage route
router.get('/', (req, res) => {
    res.send(`
        <h1>Inventory App API</h1>
        <p><a href="/games">games</a></p>
    `);
});

module.exports = router;
