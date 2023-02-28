require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./db/db");
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// import the routes from the different routers
const toilets = require("./routes/toilets-tbl");

// test connection
app.use("/toilets", toilets);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
