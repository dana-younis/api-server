'use strict'

const clothesModel = require('../models/clothes.js');

const Collection = require('../models/data-collection-class.js');

const newClothes = new Collection(clothesModel);


const express = require("express");

const router = express.Router();


const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log("Connected to MongoDB clothes")).catch((err) => console.error(err));



router.post('/clothes', async(req, res) => {

    let obj = req.body;

    let createNew = await newClothes.create(obj);
    res.status(201).json(createNew);
});




router.get('/clothes', async(req, res) => {

    let readAll = await newClothes.get();

    res.status(200).json(readAll);

});





router.get('/clothes/:id', async(req, res) => {
    let id = req.params.id;

    let getOneItem = await newClothes.get(id);

    res.status(200).json(getOneItem);
});




router.put('/clothes/:id', async(req, res) => {
    let id = req.params.id;

    let obj = req.body;

    let toUpdate = await newClothes.update(id, obj);

    res.status(200).json(toUpdate);
});



router.delete('/clothes/:id', async(req, res) => {

    let id = req.params.id;
    let deleted = await newClothes.delete(id);

    res.status(202).json(deleted);
});


module.exports = router;