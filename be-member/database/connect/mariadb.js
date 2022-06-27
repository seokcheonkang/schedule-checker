const mariaDB = require('mariadb');

const conn = mariaDB.createPool({
  host: 'localhost', // TODO LOCAL
  // host: '144.24.79.181', // TODO JDL OCI
  port: 3306,
  user: 'scuser',
  password: 'bespin123',
  database: 'scdb',
  connectionLimit: 5,
});

module.exports = conn;
