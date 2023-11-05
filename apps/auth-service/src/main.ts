import express from 'express';

import healthRoute from './routes/health';
import registerRoute from './routes/register';
import sequelize from './config/sequelize';
import bodyParser from 'body-parser';

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

    const app = express();

    app.use(bodyParser.json());

    // Routes
    app.use('/health', healthRoute);
    app.use('/register', registerRoute);

    app.get('/', (req, res) => {
        res.send({ message: 'Welcome to auth-service!' });
    });

    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
        console.log(`Listening at http://localhost:${port}/`);
    });
    server.on('error', console.error);
})();
