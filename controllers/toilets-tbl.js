//require pool dependency
const pool = require('../db/db');

//GET all toilets
const getAllToilets = async (req, res) => {
  try {
    const allToilets = await pool.query(
      'SELECT * FROM toilets ORDER BY id DESC'
    );
    console.log(allToilets.rows);
    res.json(allToilets.rows);
  } catch (err) {
    console.error(err.message);
    res.json(err.message);
  }
};

//GET a single toilet by id (this is for updating it)
const getSingleToiletById = async (req, res) => {
  try {
    const { id } = req.body;
    const singleToilet = await pool.query(
      'SELECT * FROM toilets WHERE id = $1',
      [id]
    );
    if (!singleToilet.rowCount) {
      res.json({ message: 'no toilet with this id' });
    } else {
      res.json(singleToilet.rows);
    }
  } catch (err) {
    console.error(err.message);
    res.json(err.message);
  }
};

//POST create toilet
const createToilet = async (req, res) => {
  try {
    const { imgurl, _location, sex, details, bidet, _address, postalcode } =
      req.body;
    const newToilet = await pool.query(
      'INSERT INTO toilets (imgurl, _location, sex, details, bidet, _address, postalcode) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [imgurl, _location, sex, details, bidet, _address, postalcode]
    );
    console.log(newToilet.rows);
    res.status(200).json({ message: 'toilet created' });
  } catch (err) {
    console.error(err.message);
    res.json(err.message);
  }
};

//DELETE delete toilet
const deleteToilet = async (req, res) => {
  try {
    const { id } = req.body;
    const delToilet = await pool.query('DELETE FROM toilets WHERE id = $1', [
      id,
    ]);
    if (delToilet.rowCount === 0) {
      res.json({ message: 'no toilet with this id' });
    } else {
      res
        .status(200)
        .json({ message: 'toilet deleted', deletedToilet: delToilet.rows });
    }
  } catch (err) {
    console.error(err.message);
    res.json(err.message);
  }
};

//PATCH update toilet
const updateToilet = async (req, res) => {
  try {
    const { id, imgurl, _location, sex, details, bidet, _address, postalcode } =
      req.body;
    const updatedToilet = await pool.query(
      'UPDATE toilets SET imgurl = $1, _location = $2, sex = $3, details = $4, bidet = $5, _address = $6, postalcode = $7 WHERE id = $8 RETURNING *',
      [imgurl, _location, sex, details, bidet, _address, postalcode, id]
    );
    if (updatedToilet.rowCount === 0) {
      res.json({ message: 'no toilet with this id' });
    } else {
      console.log(updatedToilet.rows);
      res.status(200).json({ message: 'toilet updated' });
    }
  } catch (err) {
    console.error(err.message);
    res.json(err.message);
  }
};

module.exports = {
  getAllToilets,
  getSingleToiletById,
  createToilet,
  deleteToilet,
  updateToilet,
};
