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
      res.status(400).json({ message: 'Username or email already exists' });
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
      // response to client
      res.status(200).json({
        token: token,
        message: 'ok',
        username: newUser.rows[0].username,
        email: newUser.rows[0].email,
        role: newUser.rows[0]._role,
      });
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

    // Check if user exists
    if (user.rows.length === 0) {
      return res
        .status(400)
        .json({ message: 'Incorrect login email or password' });
    }

    // check if password matches
    const validPassword = await bcrypt.compare(
      _password,
      user.rows[0]._password
    );

    //3. if correct, create jwt token for the user
    if (validPassword) {
      const token = jwtGenerator(
        user.rows[0].username,
        user.rows[0].email,
        user.rows[0]._role
      );
      // response to client side
      res.json({
        token: token,
        message: 'Logged in successfully',
        username: user.rows[0].username,
        email: user.rows[0].email,
        role: user.rows[0]._role,
      });
    } else {
      res.status(400).json({ message: 'Incorrect login email or password' });
    }
  } catch (error) {
    res.status(500);
  }
};

// GET finds a user (for admin to find a user and delete him)
const getSingleUser = async (req, res) => {
  try {
    const { userName } = req.body;
    const singleUser = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [userName]
    );
    if (singleUser.rowCount === 0) {
      res.json({ message: 'no such user' });
    } else {
      res.json(singleUser.rows);
    }
  } catch (err) {
    console.error(err.message);
    res.json(err.message);
  }
};

// DELETE user
const deleteUser = async (req, res) => {
  try {
    const { username } = req.params;
    await pool.query('DELETE FROM ratings WHERE users_username = $1', [
      username,
    ]);
    await pool.query('DELETE FROM messages WHERE users_username = $1', [
      username,
    ]);
    await pool.query('DELETE FROM users WHERE username = $1', [username]);
    res.json({ message: 'user deleted' });
  } catch (err) {
    console.error(err.message);
    res.json(err.message);
  }
};

module.exports = { createUser, login, getSingleUser, deleteUser };
