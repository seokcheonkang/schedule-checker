const express = require('express');
const ip = require('ip');

// --
const app = express();
app.use(express.json());

// --
const MIDDLEWARE_PATH = './middleware';

// --
const LOG = require(`${MIDDLEWARE_PATH}/log`);
const LOGD = require(`${MIDDLEWARE_PATH}/logd`);
const UTIL = require(`${MIDDLEWARE_PATH}/util`);

// --
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  UTIL.setEnv(process.env.NODE_ENV);

  const URL = !process.env.BASE_URL_THIS ? ip.address() + ':' + PORT : process.env.BASE_URL_THIS;

  LOGD(`Server listening : ${URL}`);
});

// ---
app.all('/*', (req, res, next) => {
  UTIL.setCors(res);
  next();
});

// ---
const CONTROLLER_PATH = './controller';
const mainController = require(`${CONTROLLER_PATH}/mainController`);
const scheduleController = require(`${CONTROLLER_PATH}/scheduleController`);
const emailController = require(`${CONTROLLER_PATH}/emailController`);

app.use('/', mainController);
app.use('/schedules', scheduleController);
app.use('/email', emailController);
