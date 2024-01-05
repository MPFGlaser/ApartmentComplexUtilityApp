import express from 'express';

import locationRoute from './routes/location.route';
import healthRoute from './routes/health.route';
import bodyParser from 'body-parser';
import cors from 'cors';
import { authenticated } from '@acua/microservice-shared';

const app = express();

// disable version number leak
app.disable('x-powered-by');

app.use(bodyParser.json());

app.use(cors());

app.use('/health', healthRoute);

app.use(authenticated());

// Routes
app.use('/', locationRoute);

export default app;
