const mariaDB = require('mariadb');

// --
const MIDDLEWARE_PATH = '../middleware';
const SECRET_PATH = '../secret';

// --
const LOG = require(`${MIDDLEWARE_PATH}/log`);
const LOGD = require(`${MIDDLEWARE_PATH}/logd`);
const KEY = require(`${SECRET_PATH}/key`);

// --
const dotenv = require('dotenv');
const { getEnv } = require(`${MIDDLEWARE_PATH}/util`);
dotenv.config(getEnv());

// --
const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: KEY.getDatabasePassword(process.env.NODE_ENV),
  database: process.env.DB_DATABASE,
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
};
const conn = mariaDB.createPool(options);
LOGD('db.conn', JSON.stringify(options));

module.exports = conn;
