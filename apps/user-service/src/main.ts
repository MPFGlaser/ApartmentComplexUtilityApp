import app from './app';

(async () => {
  const port = process.env.PORT || 3000;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
  });
  server.on('error', console.error);
})();
