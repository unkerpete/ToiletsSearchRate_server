// import express and router method in express
const express = require('express');
const router = express.Router();

// import the 2 auth levels
const auth = require('../middleware/auth'); // KIV. To require this auth only for leaving a comment on toilet card or rating it
const authAdmin = require('../middleware/authAdmin');

// import functions from controller
const { getComments, createComment } = require('../controllers/comments');

// GET all comments
router.get('/getcomments/:toilets_id', getComments);

// POST submit new comment
router.post('/createComment', auth, createComment);

module.exports = router;
