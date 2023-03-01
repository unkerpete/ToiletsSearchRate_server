// import express
const express = require('express');
// import router
const router = express.Router();

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
router.get('/getalltoilets', auth, getAllToilets); // KIV. To require this auth only for leaving a comment on toilet card or rating it

// GET a single toilet by Id
router.get('/getsingletoilet', authAdmin, getSingleToiletById);

// POST create a new toilet
router.post('/createtoilet', authAdmin, createToilet);

// DELETE delete a toilet by id
router.delete('/deletetoilet', authAdmin, deleteToilet);

// PATCH update a toilet by id
router.patch('/updatetoilet', authAdmin, updateToilet);

module.exports = router;
