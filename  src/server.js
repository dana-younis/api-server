'use strict';

const express = require('express');
const app = express();
app.use(express.json());

const notFoundHandler = require('../src/error-handlers/404.js');
const error = require('../src/error-handlers/500.js')

const foodRoute = require('./routes/food.js');
const clothesRoute = require('./routes/clothes.js');


app.use(foodRoute);
app.use(clothesRoute);


app.get('/badMethod', notFoundHandler)






app.use(error);
app.use('*', notFoundHandler);



function start(port) {
    app.listen(port, () => console.log('Listening on ', port));
}

module.exports = {
    start,
    app
}