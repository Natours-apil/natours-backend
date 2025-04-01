const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then((con) => {
    console.log(con.connections);
    console.log('DB connection successful!');
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });

const app = require('./app');

// console.log(process.env);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
