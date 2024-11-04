const express = require('express');
const { getAllDevelopers } = require('../database/queries');
const router = express.Router();

// GET route for developers
router.get('/', async (req, res) => {
    try {
        const developers = await getAllDevelopers();
        res.render('layout', { 
            body: 'developers',
            developers 
        });
    } catch (err) {
        console.error('Error retrieving developers:', err.stack);
        res.status(500).send('Error retrieving developers');
    }
});

module.exports = router;
