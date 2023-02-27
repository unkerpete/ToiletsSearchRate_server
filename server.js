require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./db/db");
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// test postgresdb connection
app.get("/showalltoilet", async (req, res) => {
  try {
    const allToilets = await pool.query("SELECT * FROM toilets");
    console.log(allToilets.rows);
    res.json(allToilets.rows);
  } catch (err) {
    console.error(err.message);
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
