// @ts-nocheck
import sequelize from './db';
import User from './models/User';
import Room from './models/Room';
import ClassCode from './models/ClassCode';

async function syncDatabase() {
    try {
        await sequelize.authenticate();
        console.log("Database connection established.");

        // Sync all models, including any associations
        await sequelize.sync({ alter: true });
        console.log("All models were synchronized.");
        
        process.exit(0);
    } catch (error) {
        console.error("Error during database synchronization:", error);
        process.exit(1);
    }
}

syncDatabase();
