require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// import the routes from the different routers
const toilets = require('./routes/toilets-tbl');
const users = require('./routes/users');

// mount the routers middleware
app.use('/toilets', toilets);
app.use('/user', users);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
