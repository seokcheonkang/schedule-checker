const NOW_DATE = (p1) => {
  let dt;

  if (p1 == undefined) {
    dt = new Date();
  } else {
    dt = new Date(p1);
  }

  const yyyy = dt.getFullYear();

  let mm = dt.getMonth() + 1;
  if (mm < 10) {
    mm = '0' + mm;
  }

  let dd = dt.getDate();
  if (dd < 10) {
    dd = '0' + dd;
  }

  const result = yyyy + '-' + mm + '-' + dd;

  return result;
};

const NOW_TIME = () => {
  let dt = new Date();

  let hh24 = dt.getHours();
  if (hh24 < 10) {
    hh24 = '0' + hh24;
  }

  let mi = dt.getMinutes();
  if (mi < 10) {
    mi = '0' + mi;
  }

  let ss = dt.getSeconds();
  if (ss < 10) {
    ss = '0' + ss;
  }

  const result = hh24 + ':' + mi + ':' + ss;

  return result;
};

export { NOW_DATE, NOW_TIME };
