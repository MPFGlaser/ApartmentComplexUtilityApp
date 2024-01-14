import sequelize from './config/sequelize.init';
import app from './app';

(async () => {
  for (let i = 0; i < 5; i++) {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      await sequelize.sync();
      console.log('All models were synchronized successfully.');
      break; // Exit the loop once the connection is successful
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      if (i < 4) {
        // Don't wait after the last attempt
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before trying again
      } else {
        process.exit(1);
      }
    }
  }

  const port = process.env.PORT || 3000;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
  });
  server.on('error', console.error);
})();
