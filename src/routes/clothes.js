'use strict';

const express = require('express');
const router = express.Router();

const interFace = require('../models/data-collection-class');
const clothesItem = require('../models/clothes');
const clothesInstance = new interFace(clothesItem);

router.get('/', getClothes);
router.get('/:id', getClothes);
router.post('/', createClothes);
router.put('/:id', updateClothes);
router.delete('/:id', deleteClothes);

async function getClothes(req, res, next) {
  try {
    let id = req.params.id;
    let items = await clothesInstance.get(id);
    res.status(200).json(items);
  } catch (error) {
    next({
      error,
    });
  }
}

async function createClothes(req, res, next) {
  try {
    let obj = req.body;
    let newItem = await clothesInstance.create(obj);
    res.status(200).json(newItem);
  } catch (error) {
    next({
      error,
    });
  }
}

async function updateClothes(req, res, next) {
  try {
    let id = req.params.id;
    const obj = req.body;
    let updatedClothes = await clothesInstance.update(id, obj);
    res.status(200).json(updatedClothes);
  } catch (error) {
    next({
      error,
    });
  }
}

async function deleteClothes(req, res, next) {
  try {
    let id = req.params.id;
    let deleted = await clothesInstance.delete(id);
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
