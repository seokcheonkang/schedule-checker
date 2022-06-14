const express = require('express');
const path = require('path');
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
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
};
// --
const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
  setEnv(process.env.NODE_ENV);

  const URL = `${process.env.BASE_URL_BACKEND}`;

  console.log(`Server listening : ${URL}`);
});

// ---
app.all('/*', (req, res, next) => {
  setCors(res);
  next();
});

// ---
const signController = require(`${CONTROLLER_PATH}/signController`);
const jwtController = require(`${CONTROLLER_PATH}/jwtController`);

app.use('/sign', signController);
app.use('/jwt', jwtController);
