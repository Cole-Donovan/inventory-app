const pool = require('../src/database/pool');

// Function to clear the games table
const clearGamesTable = async () => {
    await pool.query('DELETE FROM games;');
    console.log('Cleared games table.');
};

// Function to clear the genres table
const clearGenresTable = async () => {
    await pool.query('DELETE FROM genres;');
    console.log('Cleared genres table.');
};

// Function to clear the developers table
const clearDevelopersTable = async () => {
    await pool.query('DELETE FROM developers;');
    console.log('Cleared developers table.');
};

// Function to clear the games_genres table
const clearGamesGenresTable = async () => {
    await pool.query('DELETE FROM games_genres;');
    console.log('Cleared games_genres table.');
};

// Function to clear the games_developers table
const clearGamesDevelopersTable = async () => {
    await pool.query('DELETE FROM games_developers;');
    console.log('Cleared games_developers table.');
};

// Function to clear all tables
const clearAllTables = async () => {
    await clearGamesTable();
    await clearGenresTable();
    await clearDevelopersTable();
    await clearGamesGenresTable();
    await clearGamesDevelopersTable();
};

// Export the functions
module.exports = {
    clearGamesTable,
    clearGenresTable,
    clearDevelopersTable,
    clearGamesGenresTable,
    clearGamesDevelopersTable,
    clearAllTables,
};
// psql -h  -U postgres -d railway
