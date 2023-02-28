//require dependencies
const pool = require('../db/db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');

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
      // generate jwt token to send back to user
      const token = jwtGenerator(
        newUser.rows[0].username,
        newUser.rows[0].email,
        newUser.rows[0]._role
      );
      res.json({ token });
    }
  } catch (err) {
    console.error(err.message);
    res.json(err.message);
  }
};

// POST user login
const login = async (req, res) => {
  try {
    //1. destructure req.body
    const { email, _password } = req.body;

    //2. check if incoming password same as database password
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);
    const validPassword = await bcrypt.compare(
      _password,
      user.rows[0]._password
    );

    //3. if correct, give jwt token
    if (validPassword) {
      const token = jwtGenerator(
        user.rows[0].username,
        user.rows[0].email,
        user.rows[0]._role
      );
      res.json({ token });
    } else {
      res.json({ message: 'Incorrect login email or password' });
    }
  } catch (error) {
    res.status(500);
  }
};

// delete user

// update user

// find user

module.exports = { createUser, login };
