import express from 'express';

const app = express();

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to auth-service!' });
});

app.get('/api/health', (req, res) => {
  res.send({ message: 'auth-service is healthy' });
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
