const pool = require('../src/database/pool');

// Function to populate the games table
const populateGamesTable = async () => {
    const games = [
        {
            title: 'Minecraft',
            release_date: '2011-11-18',
            description: 'A sandbox game that allows players to build and explore virtual worlds.',
            image_url: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co8fu6.webp'
        },
        {
            title: 'Noita',
            release_date: '2020-10-15',
            description: 'A magical action roguelite set in a physics-based world.',
            image_url: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1qp1.webp'
        },
        {
            title: 'In Stars and Time',
            release_date: '2023-11-20',
            description: 'A time-looping RPG puzzle game.',
            image_url: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5bsf.webp'
        },
        {
            title: 'Animal Crossing: New Horizons',
            release_date: '2020-03-20',
            description: 'A life simulation game where players develop a deserted island.',
            image_url: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co3wls.webp'
        },
        {
            title: 'The Legend of Zelda: Breath of the Wild',
            release_date: '2017-03-03',
            description: 'An open-world adventure where Link awakens to save Hyrule from Calamity Ganon.',
            image_url: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co3p2d.webp'
        },
    ];
    

    for (const game of games) {
        await pool.query(
            'INSERT INTO games (title, release_date, description, image_url) VALUES ($1, $2, $3, $4)',
            [game.title, game.release_date, game.description, game.image_url]
        );
    }
    console.log('Games table populated successfully.');
};

// Function to populate the genres table
const populateGenresTable = async () => {
    const genres = [
        { name: 'Action' },
        { name: 'Adventure' },
        { name: 'Puzzle' },
        { name: 'Simulation' },
        { name: 'RPG' },
        { name: 'Strategy' },
        { name: 'Sandbox' },
        { name: 'Sports' },
        { name: 'Open World' },
        { name: 'Platformer' },
    ];

    for (const genre of genres) {
        await pool.query('INSERT INTO genres (name) VALUES ($1)', [genre.name]);
    }
    console.log('Genres table populated successfully.');
};

// Function to populate the developers table
const populateDevelopersTable = async () => {
    const developers = [
        { name: 'Mojang Studios' },
        { name: 'Nolla Games' },
        { name: 'insertdisc5' },
        { name: 'Nintendo' },
    ];

    for (const developer of developers) {
        await pool.query('INSERT INTO developers (name) VALUES ($1)', [developer.name]);
    }
    console.log('Developers table populated successfully.');
};

// Function to populate the games_genres table
const populateGamesGenresTable = async () => {
    // Fetch all game IDs
    const gamesResult = await pool.query('SELECT id FROM games');
    const gameIds = gamesResult.rows.map(row => row.id);

    // Fetch all genre IDs
    const genresResult = await pool.query('SELECT id FROM genres');
    const genreIds = genresResult.rows.map(row => row.id);

    const gamesGenres = [
        { gameId: gameIds[0], genreId: genreIds[6] }, // Minecraft - Sandbox
        { gameId: gameIds[0], genreId: genreIds[8] }, // Minecraft - Open World
        { gameId: gameIds[1], genreId: genreIds[0] }, // Noita - Action
        { gameId: gameIds[1], genreId: genreIds[1] }, // Noita - Adventure
        { gameId: gameIds[1], genreId: genreIds[3] }, // Noita - Simulation
        { gameId: gameIds[2], genreId: genreIds[1] }, // In Stars and Time - Adventure
        { gameId: gameIds[2], genreId: genreIds[2] }, // In Stars and Time - Puzzle
        { gameId: gameIds[3], genreId: genreIds[3] }, // Animal Crossing - Simulation
        { gameId: gameIds[3], genreId: genreIds[6] }, // Animal Crossing - Sandbox
        { gameId: gameIds[4], genreId: genreIds[0] }, // Breath of the Wild - Action
        { gameId: gameIds[4], genreId: genreIds[8] }, // Breath of the Wild - Open World
        { gameId: gameIds[4], genreId: genreIds[1] }, // Breath of the Wild - Adventure
    ];

    for (const gameGenre of gamesGenres) {
        await pool.query('INSERT INTO games_genres (game_id, genre_id) VALUES ($1, $2)', [gameGenre.gameId, gameGenre.genreId]);
    }
    console.log('Games_Genres table populated successfully.');
};

// Function to populate the games_developers table
const populateGamesDevelopersTable = async () => {
    // Fetch all game IDs
    const gamesResult = await pool.query('SELECT id FROM games');
    const gameIds = gamesResult.rows.map(row => row.id);

    // Fetch all developer IDs
    const developersResult = await pool.query('SELECT id FROM developers');
    const developerIds = developersResult.rows.map(row => row.id);

    const gamesDevelopers = [
        { gameId: gameIds[0], developerId: developerIds[0] }, // Minecraft - Mojang Studios
        { gameId: gameIds[1], developerId: developerIds[1] }, // Noita - Nolla Games
        { gameId: gameIds[2], developerId: developerIds[2] }, // In Stars and Time - insertdisc5
        { gameId: gameIds[3], developerId: developerIds[3] }, // Animal Crossing - Nintendo
        { gameId: gameIds[4], developerId: developerIds[3] }, // Breath of the Wild - Nintendo
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
