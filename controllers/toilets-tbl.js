//require pool dependency
const pool = require("../db/db");

//GETS all toilets
const getAllToilets = async (req, res) => {
  try {
    const allToilets = await pool.query("SELECT * FROM toilets");
    console.log(allToilets.rows);
    res.json(allToilets.rows);
  } catch (err) {
    console.error(err.message);
  }
};

//filter toilets

//

module.exports = { getAllToilets };
