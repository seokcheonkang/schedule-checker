const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

const passport = require('passport');
const session = require('express-session');

// --
const app = express();
app.use(express.json());

// Passport setting
app.use(session({ secret: 'MySecret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

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
const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
  setEnv(process.env.NODE_ENV);

  const URL = `${process.env.BASE_URL_THIS}`;

  console.log(`Server listening : ${URL}`);
});

// ---
app.all('/*', (req, res, next) => {
  setCors(res);
  next();
});

// ---
const authGoogleController = require(`${CONTROLLER_PATH}/authGoogleController`);
const jwtController = require(`${CONTROLLER_PATH}/jwtController`);

app.use('/auth/google', authGoogleController);
app.use('/jwt', jwtController);
