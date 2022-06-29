const express = require('express');
const ip = require('ip');

// --
const app = express();
app.use(express.json());

// --
const MIDDLEWARE_PATH = './middleware';
const UTIL = require(`${MIDDLEWARE_PATH}/util`);
const LOG = require(`${MIDDLEWARE_PATH}/log`);

// --
const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
  UTIL.setEnv(process.env.NODE_ENV);

  const URL = !process.env.BASE_URL_THIS ? ip.address() + ':' + PORT : process.env.BASE_URL_THIS;

  LOG(`Server listening : ${URL}`);
});

// ---
app.all('/*', (req, res, next) => {
  UTIL.setCors(res);
  next();
});

// ---
const CONTROLLER_PATH = './controller';
const mainController = require(`${CONTROLLER_PATH}/mainController`);
const authGoogleController = require(`${CONTROLLER_PATH}/authGoogleController`);

app.use('/', mainController);
app.use('/auth/google', authGoogleController);
