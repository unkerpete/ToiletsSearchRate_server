// import express module's router method
const express = require('express');
const router = express.Router();

// import the controllers
const { createUser, login } = require('../controllers/users');

// POST create a user
router.post('/create', createUser);

// POST user login
router.post('/login', login);

// export routes for server.js to access
module.exports = router;
