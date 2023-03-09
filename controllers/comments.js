//require dependencies
const pool = require('../db/db');

//GET all comments of particular toilet
const getComments = async (req, res) => {
  try {
    const { toilets_id } = req.params;
    const comments = await pool.query(
      'SELECT * FROM messages WHERE toilets_id = $1 ORDER BY created_at DESC',
      [toilets_id]
    );
    if (!comments.rowCount) {
      res.json({ message: 'no comments' });
    } else {
      res.json(comments.rows);
    }
  } catch (err) {
    console.error(err.message);
    res.json(err.message);
  }
};

//POST user enter new comment
const createComment = async (req, res) => {
  try {
    const { toilets_id, message, users_username } = req.body;
    const newComment = await pool.query(
      'INSERT INTO messages (message, users_username, toilets_id) VALUES($1, $2, $3) RETURNING *',
      [message, users_username, toilets_id]
    );
    res
      .status(200)
      .json({ message: 'message created', created: newComment.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.json(err.message);
  }
};

//GET all comments from a particular user
const getUserComments = async (req, res) => {
  try {
    const { username } = req.params;
    const comments = await pool.query(
      'SELECT * FROM messages WHERE users_userName = $1 ORDER BY created_at DESC',
      [username]
    );
    if (!comments.rowCount) {
      res.json({ message: 'no comments' });
    } else {
      res.json(comments.rows);
    }
  } catch (err) {
    console.error(err.message);
    res.json(err.message);
  }
};

module.exports = {
  getComments,
  createComment,
  getUserComments,
};
