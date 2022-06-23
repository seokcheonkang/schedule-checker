const express = require('express');
const path = require('path');
const ip = require('ip');
const dotenv = require('dotenv');

// --
const app = express();
app.use(express.json());

// --
const CONTROLLER_PATH = './controller';
const ENV_PATH = 'env';

// --
const setEnv = (nodeEnv) => {
  if (nodeEnv === 'production') {
    dotenv.config({ path: path.join(__dirname, `${ENV_PATH}/.env.production`) });
  } else if (nodeEnv === 'development') {
    dotenv.config({ path: path.join(__dirname, `${ENV_PATH}/.env.development`) });
  } else {
    throw new Error('process.env.NODE_ENV is not set.');
  }
};

const setCors = (res) => {
  res.header('Access-Control-Allow-Origin', process.env.BASE_URL_FRONTEND);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
};
// --
const PORT = process.env.PORT || 8003;
app.listen(PORT, () => {
  setEnv(process.env.NODE_ENV);

  const URL = !process.env.BASE_URL_THIS ? ip.address() + PORT : process.env.BASE_URL_THIS;
  // const URL = ip.address() + ':' + PORT;

  console.log(`Server listening : ${URL}`);
});

// ---
app.all('/*', (req, res, next) => {
  setCors(res);
  next();
});

// ---
const memberController = require(`${CONTROLLER_PATH}/memberController`);

app.use('/members', memberController);
