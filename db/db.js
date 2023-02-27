const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "peter",
  host: "localhost",
  database: "toilets_app",
  port: 5432,
});

module.exports = pool;
