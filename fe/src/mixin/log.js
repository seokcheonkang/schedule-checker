const showLog = (type, color, val1, val2, val3) => {
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

  console.log(
    '%c%s',
    `color: ${color}`,
    `[${type}][${datetime}]`,
    val1,
    val2 ? ', ' + val2 : '',
    val3 ? ', ' + val3 : ''
  );
};

const LOG = (mode, val1 = '', val2 = '', val3 = '') => {
  if (mode === 'production') {
    return;
  }

  const type = 'LOG_DEBUG';
  const color = 'skyblue';

  showLog(type, color, val1, val2, val3);
};

export { LOG };
