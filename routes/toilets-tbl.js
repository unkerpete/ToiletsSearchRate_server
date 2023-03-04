// import express and router method in express
const express = require('express');
const router = express.Router();

// import the 2 auth levels
const auth = require('../middleware/auth'); // KIV. To require this auth only for leaving a comment on toilet card or rating it
const authAdmin = require('../middleware/authAdmin');

// import functions from controller
const {
  getAllToilets,
  getSingleToiletById,
  createToilet,
  deleteToilet,
  updateToilet,
} = require('../controllers/toilets-tbl');

// GET all toilets
router.get('/getalltoilets', getAllToilets); // KIV. To require this auth only for leaving a comment on toilet card or rating it

// GET a single toilet by Id
router.get('/getsingletoilet', auth, getSingleToiletById);

// POST create a new toilet
router.post('/createtoilet', authAdmin, createToilet);

// DELETE delete a toilet by id
router.delete('/deletetoilet', authAdmin, deleteToilet);

// PATCH update a toilet by id
router.patch('/updatetoilet', authAdmin, updateToilet);

module.exports = router;
