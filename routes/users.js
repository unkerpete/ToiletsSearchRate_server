// import express module's router method
const express = require('express');
const router = express.Router();

// import auth levels
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

// import the controllers
const {
  createUser,
  login,
  getSingleUser,
  deleteUser,
} = require('../controllers/users');

// POST create a user
router.post('/create', createUser);

// POST user login
router.post('/login', login);

// POST find user by username
router.post('/find', authAdmin, getSingleUser);

// Delete user by username
router.delete('/delete', authAdmin, deleteUser);

// export routes for server.js to access
module.exports = router;
