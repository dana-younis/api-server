'use strict';


const foodModel = require('../models/food.js');
const Collection = require('../models/data-collection-class.js');

const express = require('express');
const router = express.Router();


let newFood = new Collection(foodModel);


const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log("Connecting to MongoDB food")).catch((err) => console.error(err));


router.post('/food', async(req, res) => {

    let obj = req.body;
    let createNew = await newFood.create(obj);
    res.status(201).json(createNew);
});




router.get('/food', async(req, res) => {

    let readAll = await newFood.get();

    res.status(200).json(readAll);

});





router.get('/food/:id', async(req, res) => {
    let id = req.params.id;

    let getOneItem = await newFood.get(id);

    res.status(200).json(getOneItem);
});




router.put('/food/:id', async(req, res) => {
    let id = req.params.id;

    let obj = req.body;

    let toUpdate = await newFood.update(id, obj);

    res.status(200).json(toUpdate);
});



router.delete('/food/:id', async(req, res) => {

    let id = req.params.id;
    let deleted = await newFood.delete(id);

    res.status(202).json(deleted);
});


module.exports = router;