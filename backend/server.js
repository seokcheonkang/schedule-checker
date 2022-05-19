const os = require('os');
const express = require('express');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const result = {
    userAgent: req.headers['user-agent'],
    hostname: os.hostname(),
  };

  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Server listening on port : ${PORT}`);
});
