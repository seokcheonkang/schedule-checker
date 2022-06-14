const getLog = (val, color, type) => {
  const datetime = new Date().toISOString();

  if (typeof val === 'object') {
    val = JSON.parse(JSON.stringify(val));
  }

  console.log('%c%s', `color: ${color}`, `[${type}][${datetime}]`, val);
};

const LOGD = (mode, val = '') => {
  if (mode === 'DEV') {
    getLog(val, 'yellowgreen', 'LOG_DEBUG');
  }
};

const LOG = (mode, val = '') => {
  if (mode !== 'DEV') {
    getLog(val, 'tomato', 'LOG');
  }
};

export { LOGD, LOG };
