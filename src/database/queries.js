const pool = require('./pool');

const getAllGames = async () => {
    const result = await pool.query('SELECT * FROM games');
    return result.rows;
};

const getAllDevelopers = async () => {
    const result = await pool.query('SELECT * FROM developers');
    return result.rows;
};

const getAllGenres = async () => {
    const result = await pool.query('SELECT * FROM genres');
    return result.rows;
};

const getGameById = async (id) => {
    const result = await pool.query(`
        SELECT 
            g.id,
            g.title,
            g.description,
            g.release_date,
            g.image_url,  -- Include the image_url in the selection
            array_agg(DISTINCT gen.name) AS genres,
            array_agg(DISTINCT dev.name) AS developers
        FROM 
            games g
        LEFT JOIN 
            games_genres gg ON g.id = gg.game_id
        LEFT JOIN 
            genres gen ON gg.genre_id = gen.id
        LEFT JOIN 
            games_developers gd ON g.id = gd.game_id
        LEFT JOIN 
            developers dev ON gd.developer_id = dev.id
        WHERE 
            g.id = $1
        GROUP BY 
            g.id;
    `, [id]);
    return result.rows[0];
};

const addGame = async (title, releaseDate, description, imageUrl) => {
    const result = await pool.query(
        `INSERT INTO games (title, release_date, description, image_url)  -- Include image_url here
         VALUES ($1, $2, $3, $4) RETURNING id;`,
        [title, releaseDate, description, imageUrl]  // Include imageUrl in the parameters
    );
    console.log(`Game "${title}" added successfully with ID: ${result.rows[0].id}`);
    return result.rows[0].id;
};

const removeGame = async (id) => {
    const result = await pool.query(
        `DELETE FROM games WHERE id = $1 RETURNING id;`,
        [id]
    );

    if (result.rowCount === 0) {
        console.log(`No game found with ID: ${id}`);
    } else {
        console.log(`Game with ID: ${result.rows[0].id} deleted successfully.`);
    }
    return result.rowCount;
};

// ... [rest of the functions remain unchanged]

const addGenreToGame = async (gameId, genreId) => {
    const result = await pool.query(
        `INSERT INTO games_genres (game_id, genre_id)
         VALUES ($1, $2) RETURNING game_id, genre_id;`,
        [gameId, genreId]
    );
    console.log(`Genre with ID: ${genreId} added to game with ID: ${gameId}`);
    return result.rows[0];
};

const addDeveloperToGame = async (gameId, developerId) => {
    const result = await pool.query(
        `INSERT INTO games_developers (game_id, developer_id)
         VALUES ($1, $2) RETURNING game_id, developer_id;`,
        [gameId, developerId]
    );
    console.log(`Developer with ID: ${developerId} added to game with ID: ${gameId}`);
    return result.rows[0];
};

// Function to add a genre
const addGenre = async (name) => {
    const result = await pool.query(
        `INSERT INTO genres (name)
         VALUES ($1) RETURNING id;`,
        [name]
    );
    console.log(`Genre "${name}" added successfully with ID: ${result.rows[0].id}`);
    return result.rows[0].id; // Return the ID of the newly added genre
};

// Function to add a developer
const addDeveloper = async (name) => {
    const result = await pool.query(
        `INSERT INTO developers (name)
         VALUES ($1) RETURNING id;`,
        [name]
    );
    console.log(`Developer "${name}" added successfully with ID: ${result.rows[0].id}`);
    return result.rows[0].id; // Return the ID of the newly added developer
};

// Function to remove a genre by ID
const removeGenre = async (id) => {
    await pool.query('DELETE FROM genres WHERE id = $1;', [id]);
    console.log(`Genre with ID ${id} removed successfully.`);
};

// Function to remove a developer by ID
const removeDeveloper = async (id) => {
    await pool.query('DELETE FROM developers WHERE id = $1;', [id]);
    console.log(`Developer with ID ${id} removed successfully.`);
};

const removeGenreFromGame = async (gameId, genreId) => {
    await pool.query(
        `DELETE FROM games_genres 
         WHERE game_id = $1 AND genre_id = $2;`,
        [gameId, genreId]
    );
    console.log(`Relationship removed: Game ID ${gameId} and Genre ID ${genreId}`);
};

const removeDeveloperFromGame = async (gameId, developerId) => {
    await pool.query(
        `DELETE FROM games_developers 
         WHERE game_id = $1 AND developer_id = $2;`,
        [gameId, developerId]
    );
    console.log(`Relationship removed: Game ID ${gameId} and Developer ID ${developerId}`);
};

async function getGamesByGenre(genreId) {
    const result = await pool.query(
        `SELECT g.id, g.title, g.image_url  -- Include image_url here
         FROM games g 
         JOIN games_genres gg ON g.id = gg.game_id 
         WHERE gg.genre_id = $1`,
        [genreId]
    );
    return result.rows;
}

async function getGamesByDeveloper(developerId) {
    const result = await pool.query(
        `SELECT g.id, g.title, g.image_url  -- Include image_url here
         FROM games g 
         JOIN games_developers gd ON g.id = gd.game_id 
         WHERE gd.developer_id = $1`,
        [developerId]
    );
    return result.rows;
}

// Export the functions
module.exports = {
    getGamesByGenre,
    getGamesByDeveloper,
    getAllGames,
    getAllDevelopers,
    getAllGenres,
    getGameById,
    addGame,
    removeGame,
    addGenreToGame,
    addDeveloperToGame,
    addGenre,
    addDeveloper,
    removeGenre,
    removeDeveloper,
    removeGenreFromGame,
    removeDeveloperFromGame,
};
