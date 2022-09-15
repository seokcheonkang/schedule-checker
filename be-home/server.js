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
const homeMainController = require(`${CONTROLLER_PATH}/homeMainController`);
const homeScheduleController = require(`${CONTROLLER_PATH}/homeScheduleController`);
const homeEmailController = require(`${CONTROLLER_PATH}/homeEmailController`);
const homeStatController = require(`${CONTROLLER_PATH}/homeStatController`);
const homeMemberController = require(`${CONTROLLER_PATH}/homeMemberController`);

app.use('/home', homeMainController);
app.use('/home/schedules', homeScheduleController);
app.use('/home/email', homeEmailController);
app.use('/home/stat', homeStatController);
app.use('/home/members', homeMemberController);
