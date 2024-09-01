require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const app = express();
const port = 3001;

app.use(cookieParser());
app.use(express.json());
app.use('/api', routes);

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(`Server has been started on port ${port}...`);
  });
});
