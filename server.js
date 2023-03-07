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
const comments = require('./routes/comments');
const likes = require('./routes/likes');

// mount the routers middleware
app.use('/toilets', toilets);
app.use('/user', users);
app.use('/comments', comments);
app.use('/likes', likes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
