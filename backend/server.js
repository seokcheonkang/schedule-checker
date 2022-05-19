const os = require('os');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  const result = {
    userAgent: req.headers['user-agent'],
    hostname: os.hostname(),
  };

  res.send(result);
});

let PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: path.join(__dirname, 'env/.env.production') });
  } else if (process.env.NODE_ENV === 'development') {
    dotenv.config({ path: path.join(__dirname, 'env/.env.development') });
  } else {
    throw new Error('process.env.NODE_ENV is not set.');
  }

  const URL = PORT === 80 || PORT === 443 ? `${process.env.CONTEXT_PATH}` : `${process.env.CONTEXT_PATH}:${PORT}`;

  console.log(`Server listening : ${URL}`);
});
