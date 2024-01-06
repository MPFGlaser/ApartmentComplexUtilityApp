import express from 'express';

import healthRoute from './routes/health.route';

import bodyParser from 'body-parser';

const app = express();

// disable version number leak
app.disable('x-powered-by');

app.use(bodyParser.json());

// Routes
app.use('/health', healthRoute);

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to auth-service!' });
});

export default app;
