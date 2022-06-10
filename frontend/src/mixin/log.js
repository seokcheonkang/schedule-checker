const getLog = (val, color, type) => {
  const datetime = new Date().toISOString();

  if (typeof val === 'object') {
    val = JSON.parse(JSON.stringify(val));
  }

  console.log('%c%s', `color: ${color}`, `[${type}][${datetime}]`, val);
};

const LOGD = (val = '') => {
  getLog(val, 'yellowgreen', 'logDebug');
};

const LOG = (val = '') => {
  getLog(val, 'tomato', 'log');
};

export { LOGD, LOG };
