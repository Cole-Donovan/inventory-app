const pool = require('../src/database/pool');

// Function to populate the games table
const populateGamesTable = async () => {
    const games = [
        { id: 1, title: 'Minecraft', release_date: '2011-11-18', description: 'A sandbox game that allows players to build and explore virtual worlds.' },
        { id: 2, title: 'Noita', release_date: '2020-10-15', description: 'A magical action roguelite set in a physics-based world.' },
        { id: 3, title: 'In Stars and Time', release_date: '2023-11-20', description: 'A time-looping RPG puzzle game.' },
        { id: 4, title: 'Animal Crossing: New Horizons', release_date: '2020-03-20', description: 'A life simulation game where players develop a deserted island.' },
        { id: 5, title: 'The Legend of Zelda: Breath of the Wild', release_date: '2017-03-03', description: 'An open-world adventure where Link awakens to save Hyrule from Calamity Ganon.' },
    ];

    for (const game of games) {
        await pool.query('INSERT INTO games (id, title, release_date, description) VALUES ($1, $2, $3, $4)', [game.id, game.title, game.release_date, game.description]);
    }
    console.log('Games table populated successfully.');
};

// Function to populate the genres table
const populateGenresTable = async () => {
    const genres = [
        { id: 1, name: 'Action' },
        { id: 2, name: 'Adventure' },
        { id: 7, name: 'Puzzle' },
        { id: 4, name: 'Simulation' },
        { id: 3, name: 'RPG' },
        { id: 5, name: 'Strategy' },
        { id: 10, name: 'Sandbox' },
        { id: 6, name: 'Sports' },
        { id: 9, name: 'Open World' },
        { id: 8, name: 'Platformer' },
    ];

    for (const genre of genres) {
        await pool.query('INSERT INTO genres (id, name) VALUES ($1, $2)', [genre.id, genre.name]);
    }
    console.log('Genres table populated successfully.');
};

// Function to populate the developers table
const populateDevelopersTable = async () => {
    const developers = [
        { id: 1, name: 'Mojang Studios' },
        { id: 2, name: 'Nolla Games' },
        { id: 3, name: 'insertdisc5' },
        { id: 4, name: 'Nintendo' },
    ];

    for (const developer of developers) {
        await pool.query('INSERT INTO developers (id, name) VALUES ($1, $2)', [developer.id, developer.name]);
    }
    console.log('Developers table populated successfully.');
};

// Function to populate the games_genres table
const populateGamesGenresTable = async () => {
    const gamesGenres = [
        { gameId: 1, genreId: 10 },
        { gameId: 1, genreId: 9 },
        { gameId: 2, genreId: 1 },
        { gameId: 2, genreId: 2 },
        { gameId: 2, genreId: 4 },
        { gameId: 3, genreId: 2 },
        { gameId: 3, genreId: 3 },
        { gameId: 4, genreId: 4 },
        { gameId: 4, genreId: 10 },
        { gameId: 5, genreId: 1 },
        { gameId: 5, genreId: 9 },
        { gameId: 5, genreId: 2 },
    ];

    for (const gameGenre of gamesGenres) {
        await pool.query('INSERT INTO games_genres (game_id, genre_id) VALUES ($1, $2)', [gameGenre.gameId, gameGenre.genreId]);
    }
    console.log('Games_Genres table populated successfully.');
};

// Function to populate the games_developers table
const populateGamesDevelopersTable = async () => {
    const gamesDevelopers = [
        { gameId: 1, developerId: 1 },
        { gameId: 2, developerId: 2 },
        { gameId: 3, developerId: 3 },
        { gameId: 4, developerId: 4 },
        { gameId: 5, developerId: 4 },
    ];

    for (const gameDeveloper of gamesDevelopers) {
        await pool.query('INSERT INTO games_developers (game_id, developer_id) VALUES ($1, $2)', [gameDeveloper.gameId, gameDeveloper.developerId]);
    }
    console.log('Games_Developers table populated successfully.');
};

// Function to populate all tables
const populateAllTables = async () => {
    await populateGamesTable();
    await populateGenresTable();
    await populateDevelopersTable();
    await populateGamesGenresTable();
    await populateGamesDevelopersTable();
    console.log('All tables have been populated successfully.');
};

// Export all populate functions
module.exports = {
    populateGamesTable,
    populateGenresTable,
    populateDevelopersTable,
    populateGamesGenresTable,
    populateGamesDevelopersTable,
    populateAllTables,
};
