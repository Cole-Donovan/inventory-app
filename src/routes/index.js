const express = require('express');
const gamesRouter = require('./games');
const gameDetailsRouter = require('./gameDetails');
const genresRouter = require('./genres');
const developersRouter = require('./developers');
const genreDetailsRouter = require('./genreDetails');
const developerDetailsRouter = require('./developerDetails');

const router = express.Router();

// Use the games routes for the /games path
router.use('/games', gamesRouter);
router.use('/games', gameDetailsRouter);

router.use('/genres', genresRouter);
router.use('/developers', developersRouter);

router.use('/genres', genreDetailsRouter);
router.use('/developers', developerDetailsRouter);

// Homepage route
router.get('/', (req, res) => {
    res.render('layout', { 
        body: 'index' // Include the content from index.ejs
    });
});

module.exports = router;
