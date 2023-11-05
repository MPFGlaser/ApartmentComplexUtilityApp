import express from 'express';

import healthRoute from './routes/health.route';
import registerRoute from './routes/register.route';
import loginRoute from './routes/login.route';
import bodyParser from 'body-parser';

const app = express();

// disable version number leak
app.disable('x-powered-by');

app.use(bodyParser.json());

// Routes
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/health', healthRoute);

app.get('/', (req, res) => {
    res.send({ message: 'Welcome to auth-service!' });
});

export default app;
