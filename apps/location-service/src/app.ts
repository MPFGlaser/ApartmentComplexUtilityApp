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

const corsOptions = {
  origin:
    process.env.NODE_ENV === 'production'
      ? 'https://acua.mpfglaser.nl'
      : 'http://localhost:4200',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use('/health', healthRoute);

app.use(authenticated());

// Routes
app.use('/', locationRoute);

export default app;
