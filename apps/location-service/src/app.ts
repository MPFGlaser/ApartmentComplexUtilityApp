import express from 'express';

import locationRoute from './routes/location.route';
import healthRoute from './routes/health.route';
import bodyParser from 'body-parser';
import cors from 'cors';
import {
  MessageTopic,
  authenticated,
  generateSubscriptionName,
  initializeSubscriber,
} from '@acua/microservice-shared';
import locationService from './services/location.service';

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

initializeSubscriber(
  MessageTopic.DeleteUserData,
  generateSubscriptionName(MessageTopic.DeleteUserData, 'location-service'),
  (message) => {
    locationService.anonymiseLocationByOwner(message.data.toString());
    message.ack();
  }
);

app.use(cors(corsOptions));

app.use('/', healthRoute);

app.use(authenticated());

// Routes
app.use('/api/location', locationRoute);

export default app;
