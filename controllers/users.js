//require dependencies
const pool = require('../db/db');
const bcrypt = require('bcrypt');

// POST register user
const createUser = async (req, res) => {
  try {
    const { username, email, _password } = req.body;
    //check if user or email already exists
    const user = await pool.query(
      'SELECT * FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );
    if (user.rowCount > 0) {
      res.json({ message: 'user or email already exists' });
    } else {
      // if doesn't exist, continue creating the user
      // bcrypt the user's password
      const hashedPassword = await bcrypt.hash(_password, 12);
      // insert new user
      const newUser = await pool.query(
        'INSERT INTO users (username, email, _password) VALUES ($1, $2, $3) RETURNING *',
        [username, email, hashedPassword]
      );
      res.json(newUser.rows[0]);
    }
    // generate jwt token
  } catch (err) {
    console.error(err.message);
    res.json(err.message);
  }
};

// delete user

// update user

// find user

module.exports = { createUser };
