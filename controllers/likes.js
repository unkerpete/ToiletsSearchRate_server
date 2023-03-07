//require dependencies
const pool = require('../db/db');

//GET likes of a toilet
const getLikes = async (req, res) => {
  try {
    const { toilets_id } = req.params;
    const likes = await pool.query(
      'SELECT COUNT(*) FROM ratings WHERE toilets_id = $1 AND liked = true;',
      [toilets_id]
    );
    res.status(200).json(likes.rows[0].count);
  } catch (error) {
    console.log(error.message);
  }
};

//GET dislikes of a toilet
const getDislikes = async (req, res) => {
  try {
    const { toilets_id } = req.params;
    const dislikes = await pool.query(
      'SELECT COUNT(*) FROM ratings WHERE toilets_id = $1 AND liked = false;',
      [toilets_id]
    );
    res.status(200).json(dislikes.rows[0].count);
  } catch (error) {
    console.log(error.message);
  }
};

//POST registers a like or dislike
const submitLikes = async (req, res) => {
  try {
    const { toilets_id, users_username, liked } = req.body;
    const isThereRating = await pool.query(
      'SELECT * FROM ratings WHERE toilets_id = $1 AND users_username = $2',
      [toilets_id, users_username]
    );
    if (isThereRating.rows[0]) {
      await pool.query(
        'DELETE FROM ratings WHERE toilets_id = $1 AND users_username = $2',
        [toilets_id, users_username]
      );
      const rating = await pool.query(
        'INSERT INTO ratings (toilets_id, users_username, liked) VALUES($1, $2, $3) RETURNING *',
        [toilets_id, users_username, liked]
      );
      res
        .status(200)
        .json({ message: 'rating submitted', created: rating.rows[0] });
    } else {
      const rating = await pool.query(
        'INSERT INTO ratings (toilets_id, users_username, liked) VALUES($1, $2, $3) RETURNING *',
        [toilets_id, users_username, liked]
      );
      res
        .status(200)
        .json({ message: 'rating submitted', created: rating.rows[0] });
    }
  } catch (err) {
    console.error(err.message);
    res.json(err.message);
  }
};

module.exports = {
  submitLikes,
  getLikes,
  getDislikes,
};
