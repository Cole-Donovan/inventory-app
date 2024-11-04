const {
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
} = require('../src/database/queries');

const testQueries = async (action) => {
    try {
        const [arg1, arg2, arg3, arg4] = process.argv.slice(3); // Updated to accommodate an additional argument

        switch (action) {
            case 'addGame':
                await addGame(arg1, arg2, arg3, arg4); // title, releaseDate, description, imageUrl
                break;
            case 'removeGame':
                await removeGame(arg1); // id to delete
                break;
            case 'addGenreToGame':
                await addGenreToGame(arg1, arg2); // gameId, genreId
                break;
            case 'addDeveloperToGame':
                await addDeveloperToGame(arg1, arg2); // gameId, developerId
                break;
            case 'addGenre':
                await addGenre(arg1); // genreName
                break;
            case 'addDeveloper':
                await addDeveloper(arg1); // developerName
                break;
            case 'removeGenre':
                await removeGenre(arg1); // genreId to remove
                break;
            case 'removeDeveloper':
                await removeDeveloper(arg1); // developerId to remove
                break;
            case 'removeGenreFromGame':
                await removeGenreFromGame(arg1, arg2); // gameId, genreId
                break;
            case 'removeDeveloperFromGame':
                await removeDeveloperFromGame(arg1, arg2); // gameId, developerId
                break;
            default:
                console.log('Invalid action. Please specify one of the following:');
                console.log('- addGame <title> <release_date> <description> <image_url>'); // Updated help message
                console.log('- removeGame <id>');
                console.log('- addGenreToGame <game_id> <genre_id>');
                console.log('- addDeveloperToGame <game_id> <developer_id>');
                console.log('- addGenre <name>');
                console.log('- addDeveloper <name>');
                console.log('- removeGenre <id>');
                console.log('- removeDeveloper <id>');
                console.log('- removeGenreFromGame <game_id> <genre_id>');
                console.log('- removeDeveloperFromGame <game_id> <developer_id>');
                break;
        }
    } catch (err) {
        console.error('Error executing query:', err.stack);
    } finally {
        process.exit(); // Exit the process after executing the query
    }
};

// Get action from command line arguments
const action = process.argv[2];
testQueries(action);
