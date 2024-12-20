const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const mainRouter = require('./routes'); // Import your main router

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// Middleware to serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Use main router for all routes
app.use('/', mainRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!'); // Send a generic error response
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Export app for testing or further configuration
