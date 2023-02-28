// import express module's router method
const express = require('express');
const router = express.Router();

// import the controllers
const { createUser } = require('../controllers/users');

// POST create a user
router.post('/create', createUser);

// export routes for server.js to access
module.exports = router;
