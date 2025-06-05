const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception:', err.name, err.message);
  console.log('Shutting down the server due to uncaught exception');
});

const DB = process.env.DATABASE.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then((con) => {
  // console.log(con.connections);
  console.log('DB connection successful!');
});
// .catch((err) => {
//   console.error('DB connection error:', err);
// });

const app = require('./app');

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log('Server is running on port ' + port);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.name, err.message);
  server.close(() => {
    console.error('Shutting down the server due to unhandled rejection');
    process.exit(1); // Exit the process to avoid running in an unstable state
  });
});
