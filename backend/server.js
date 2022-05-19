const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

const routerRoot = require('./router/root');
const routerSchedules = require('./router/schedules');

// --
const app = express();
app.use(express.json());
// --
const setEnv = (nodeEnv) => {
  if (nodeEnv === 'production') {
    dotenv.config({ path: path.join(__dirname, 'env/.env.production') });
  } else if (nodeEnv === 'development') {
    dotenv.config({ path: path.join(__dirname, 'env/.env.development') });
  } else {
    throw new Error('process.env.NODE_ENV is not set.');
  }
};

const setCors = (res) => {
  res.header('Access-Control-Allow-Origin', process.env.CONTEXT_PATH_FRONTEND);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
};
// --
let PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  setEnv(process.env.NODE_ENV);

  const URL =
    PORT === 80 || PORT === 443 ? `${process.env.CONTEXT_PATH_BACKEND}` : `${process.env.CONTEXT_PATH_BACKEND}:${PORT}`;

  console.log(`Server listening : ${URL}`);
});
// ---
app.all('/*', (req, res, next) => {
  setCors(res);
  next();
});

app.use('/', routerRoot);
app.use('/schedules', routerSchedules);
// ---
