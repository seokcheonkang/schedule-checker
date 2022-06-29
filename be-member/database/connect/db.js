const mariaDB = require('mariadb');

const dotenv = require('dotenv');
const MIDDLEWARE_PATH = '../../middleware';
const { getEnv } = require(`${MIDDLEWARE_PATH}/util`);
dotenv.config(getEnv());

const conn = mariaDB.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
});

module.exports = conn;
