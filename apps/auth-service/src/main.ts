import sequelize from './config/sequelize.init';
import app from './app';

(async () => {
    // Try to connect to the database and sync the models
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync();
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }

    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
        console.log(`Listening at http://localhost:${port}/`);
    });
    server.on('error', console.error);
})();
