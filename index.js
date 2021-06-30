'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./src/server');
const port = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    server.start(port);
  })
  .catch((e) => {
    console.error('CONNECTION ERROR', e.message);
  });