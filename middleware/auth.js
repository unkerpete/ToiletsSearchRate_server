require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const jwtToken = req.header('token');

    if (!jwtToken) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const payload = jwt.verify(jwtToken, process.env.ACCESS_SECRET);

    req.decoded = payload;
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(403).json('Not authorized');
  }
};

module.exports = auth;
