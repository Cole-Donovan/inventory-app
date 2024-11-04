const {
    clearGamesTable,
    clearGenresTable,
    clearDevelopersTable,
    clearGamesGenresTable,
    clearGamesDevelopersTable,
    clearAllTables,
} = require('../utils/clearTables');

const {
    populateGamesTable,
    populateGenresTable,
    populateDevelopersTable,
    populateGamesGenresTable,
    populateGamesDevelopersTable,
    populateAllTables,
} = require('../utils/populateTables');

const manageDatabase = async (action) => {
    try {
        switch (action) {
            // Clear tables
            case 'clearGames':
                await clearGamesTable();
                break;
            case 'clearGenres':
                await clearGenresTable();
                break;
            case 'clearDevelopers':
                await clearDevelopersTable();
                break;
            case 'clearGamesGenres':
                await clearGamesGenresTable();
                break;
            case 'clearGamesDevelopers':
                await clearGamesDevelopersTable();
                break;
            case 'clearAll':
                await clearAllTables();
                break;

            // Populate tables
            case 'populateGames':
                await populateGamesTable();
                break;
            case 'populateGenres':
                await populateGenresTable();
                break;
            case 'populateDevelopers':
                await populateDevelopersTable();
                break;
            case 'populateGamesGenres':
                await populateGamesGenresTable();
                break;
            case 'populateGamesDevelopers':
                await populateGamesDevelopersTable();
                break;
            case 'populateAll':
                await populateAllTables(); // Call the new populateAllTables function
                break;

            default:
                console.log('Invalid action. Please specify one of the following:');
                console.log('- clearGames');
                console.log('- clearGenres');
                console.log('- clearDevelopers');
                console.log('- clearGamesGenres');
                console.log('- clearGamesDevelopers');
                console.log('- clearAll');
                console.log('- populateGames');
                console.log('- populateGenres');
                console.log('- populateDevelopers');
                console.log('- populateGamesGenres');
                console.log('- populateGamesDevelopers');
                console.log('- populateAll');
                break;
        }
    } catch (err) {
        console.error('Error managing database:', err.stack);
    } finally {
        process.exit(); // Exit the process after managing the database
    }
};

// Get action from command line arguments
const action = process.argv[2];
manageDatabase(action);
