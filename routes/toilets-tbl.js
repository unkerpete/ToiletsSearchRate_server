// import express
const express = require('express');
// import router
const router = express.Router();
// import functions from controller
const {
  getAllToilets,
  getSingleToiletById,
  createToilet,
  deleteToilet,
  updateToilet,
} = require('../controllers/toilets-tbl');

// GET all toilets
router.get('/getalltoilets', getAllToilets);

// GET a single toilet by Id
router.get('/getsingletoilet', getSingleToiletById);

// POST create a new toilet
router.post('/createtoilet', createToilet);

// DELETE delete a toilet by id
router.delete('/deletetoilet', deleteToilet);

// PATCH update a toilet by id
router.patch('/updatetoilet', updateToilet);

module.exports = router;
