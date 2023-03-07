// import express and router method in express
const express = require('express');
const router = express.Router();

// import the 2 auth levels
const auth = require('../middleware/auth'); // KIV. To require this auth only for leaving a comment on toilet card or rating it
const authAdmin = require('../middleware/authAdmin');

// import functions from controller
const { submitLikes, getLikes, getDislikes } = require('../controllers/likes');

// POST submit new comment
router.post('/submitlikes', auth, submitLikes);

// GET total number of likes (true values)
router.get('/getlikes/:toilets_id', getLikes);

// GET total number of dislikes (false values)
router.get('/getdislikes/:toilets_id', getDislikes);

module.exports = router;
