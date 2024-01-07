import { Sequelize } from 'sequelize-typescript';
import { Ticket } from '../models/Ticket.model';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT as unknown as number,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  // automatic import of models not possible due to webpack transpilation.
  // Models should be added to this array manually.
  models: [Ticket],
});

export default sequelize;
