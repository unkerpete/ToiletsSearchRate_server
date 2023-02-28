// obtain access to our .env file
require('dotenv').config();

const jwt = require('jsonwebtoken');

const jwtGenerator = (username, email, role) => {
  const payload = {
    username: username,
    email: email,
    role: role,
  };

  return jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '999hr' });
};

module.exports = jwtGenerator;
