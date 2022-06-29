const mariaDB = require('mariadb');

// --
const MIDDLEWARE_PATH = '../middleware';

// --
const LOG = require(`${MIDDLEWARE_PATH}/log`);

// --
const dotenv = require('dotenv');
const { getEnv } = require(`${MIDDLEWARE_PATH}/util`);
dotenv.config(getEnv());

// --
const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
};
const conn = mariaDB.createPool(options);
LOG('db.conn', JSON.stringify(options));

module.exports = conn;
