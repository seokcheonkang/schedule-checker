const service = (req, os) => {
  return { userAgent: req.headers['user-agent'], hostname: os.hostname() };
};

module.exports = service;
