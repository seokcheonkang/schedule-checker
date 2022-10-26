const showLog = (type, val1, val2, val3, val4, val5) => {
  const datetime = new Date().toISOString();

  if (typeof val1 === 'object') {
    val1 = JSON.parse(JSON.stringify(val1));
  }

  if (typeof val2 === 'object') {
    val2 = JSON.parse(JSON.stringify(val2));
  }

  if (typeof val3 === 'object') {
    val3 = JSON.parse(JSON.stringify(val3));
  }

  if (typeof val4 === 'object') {
    val4 = JSON.parse(JSON.stringify(val4));
  }

  if (typeof val5 === 'object') {
    val5 = JSON.parse(JSON.stringify(val5));
  }

  console.log(
    `${datetime} [${type}]`,
    val1,
    val2 ? ', ' + val2 : '',
    val3 ? ', ' + val3 : '',
    val4 ? ', ' + val4 : '',
    val5 ? ', ' + val5 : ''
  );
};

const LOG = (val1 = '', val2 = '', val3 = '', val4 = '', val5 = '') => {
  const type = 'INFO';

  if (process.env.IS_LOG === 'Y') {
    showLog(type, val1, val2, val3, val4, val5);
  }
};

module.exports = LOG;
