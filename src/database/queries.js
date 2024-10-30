const pool = require('./pool');
const getAllGames = async () => {
    const result = await pool.query('SELECT id, title FROM games');
    return result.rows;
};

const getGameById = async (id) => {
    const result = await pool.query(`
        SELECT 
            g.id,
            g.title,
            g.description,
            g.release_date,
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

module.exports = {
    getAllGames,
    getGameById,
};
