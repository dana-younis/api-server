'use strict';

const express = require('express');
const router = express.Router();
const interFace = require('../models/data-collection-class');
const foodModel = require('../models/food');

const foodInstance = new interFace(foodModel);

router.get('/', getFood);
router.get('/:id', getFood);
router.post('/', createFood);
router.put('/:id', updateFood);
router.delete('/:id', deleteFood);

async function getFood(req, res, next) {
  try {
    let id = req.params.id;
    let items = await foodInstance.get(id);
    res.status(200).json(items);
  } catch (error) {
    next({
      error,
    });
  }
}

async function createFood(req, res, next) {
  
  try {
    let obj = req.body;
     let newItem = await foodInstance.create(obj);
     res.status(200).json(newItem);
    console.log(obj)
  } catch (error) {
    next({
      error,
    });
  }
}

async function updateFood(req, res, next) {
  try {
    let id = req.params.id;
    const obj = req.body;
    let updatedFood = await foodInstance.update(id, obj);
    res.status(200).json(updatedFood);
  } catch (error) {
    next({
      error,
    });
  }
}

async function deleteFood(req, res, next) {
  try {
    let id = req.params.id;
    let deleted = await foodInstance.delete(id);
    let msg = deleted ? 'Item is deleted' : 'Item was not Found';
    let statusCode = deleted ? 202 : 204;
    res.status(statusCode).json({
      msg: msg,
      deleted: deleted,
    });
  } catch (error) {
    next({
      error,
    });
  }
}

module.exports = router;
