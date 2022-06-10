const express = require('express');
const router = express.Router();

const os = require('os');

const SERVICE_PATH = '../service';
const service = require(`${SERVICE_PATH}/root`);

router.get('/', (req, res) => {
  const result = service(req, os);

  res.send(result);
});

module.exports = router;
