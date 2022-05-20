const logDebug = (value1 = '', value2 = '') => {
  console.log('%c%s', 'color: yellowgreen', `[logDebug][${new Date().toISOString()}] ${value1} ${value2}`);
};

const log = (value1 = '', value2 = '') => {
  console.log('%c%s', 'color: tomato', `[log][${new Date().toISOString()}] ${value1} ${value2}`);
};

export { logDebug, log };
