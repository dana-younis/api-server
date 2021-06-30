'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./src/server.js');

const DataBase_URI = process.env.MONGODB_URI
const port = process.env.PORT


mongoose.connect(DataBase_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("Connected to DB")
    server.start(port);
}).catch((err) => console.error(err));