const os = require('os');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
// --
const app = express();
app.use(express.json());
// --
const setEnv = (nodeEnv) => {
  if (nodeEnv === 'production') {
    dotenv.config({ path: path.join(__dirname, 'env/.env.production') });
  } else if (nodeEnv === 'development') {
    dotenv.config({ path: path.join(__dirname, 'env/.env.development') });
  } else {
    throw new Error('process.env.NODE_ENV is not set.');
  }
};

const setCors = (res) => {
  res.header('Access-Control-Allow-Origin', process.env.CONTEXT_PATH_FRONTEND);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
};
// --
let PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  setEnv(process.env.NODE_ENV);

  const URL =
    PORT === 80 || PORT === 443 ? `${process.env.CONTEXT_PATH_BACKEND}` : `${process.env.CONTEXT_PATH_BACKEND}:${PORT}`;

  console.log(`Server listening : ${URL}`);
});
// ---
app.all('/*', (req, res, next) => {
  setCors(res);
  next();
});

app.get('/', (req, res) => {
  const result = {
    userAgent: req.headers['user-agent'],
    hostname: os.hostname(),
  };

  res.send(result);
});

app.get('/schedules', (req, res) => {
  const result = {
    columns: [
      {
        key: 'seq',
        val: '순번',
      },
      { key: 'title', val: '제목' },
      { key: 'status', val: '상태' },
      { key: 'uncompletedCount', val: '미완료수' },
      { key: 'completedCount', val: '완료수' },
      { key: 'insertDate', val: '등록일시' },
    ],
    dataList: [
      {
        seq: 201,
        title: '테스트201',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 5,
        insertDate: '2022-12-31 23:59:59',
      },
      {
        seq: 200,
        title: '테스트200',
        status: '마감',
        uncompletedCount: 11,
        completedCount: 11,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 199,
        title: '테스트199',
        status: '등록',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 198,
        title: '테스트198',
        status: '마감',
        uncompletedCount: 11,
        completedCount: 10,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 197,
        title: '테스트197',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 196,
        title: '테스트196',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 195,
        title: '테스트195',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 194,
        title: '테스트194',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 193,
        title: '테스트193',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 192,
        title: '테스트192',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 191,
        title: '테스트191',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 190,
        title: '테스트190',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 189,
        title: '테스트189',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 188,
        title: '테스트188',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 187,
        title: '테스트187',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 186,
        title: '테스트186',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 185,
        title: '테스트185',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 184,
        title: '테스트184',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 183,
        title: '테스트183',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 182,
        title: '테스트182',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 181,
        title: '테스트181',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 180,
        title: '테스트180',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 179,
        title: '테스트179',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 178,
        title: '테스트178',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 177,
        title: '테스트177',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 176,
        title: '테스트176',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 175,
        title: '테스트175',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 174,
        title: '테스트174',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 173,
        title: '테스트173',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 172,
        title: '테스트172',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 171,
        title: '테스트171',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 170,
        title: '테스트170',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 169,
        title: '테스트169',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 168,
        title: '테스트168',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 167,
        title: '테스트167',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 166,
        title: '테스트166',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 165,
        title: '테스트165',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 164,
        title: '테스트164',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 163,
        title: '테스트163',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 162,
        title: '테스트162',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 161,
        title: '테스트161',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 160,
        title: '테스트160',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 159,
        title: '테스트159',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 158,
        title: '테스트158',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 157,
        title: '테스트157',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 156,
        title: '테스트156',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 155,
        title: '테스트155',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 154,
        title: '테스트154',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 153,
        title: '테스트153',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 152,
        title: '테스트152',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 151,
        title: '테스트151',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 150,
        title: '테스트150',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 149,
        title: '테스트149',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 148,
        title: '테스트148',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 147,
        title: '테스트147',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 146,
        title: '테스트146',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 145,
        title: '테스트145',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 144,
        title: '테스트144',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 143,
        title: '테스트143',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 142,
        title: '테스트142',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 141,
        title: '테스트141',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 140,
        title: '테스트140',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 139,
        title: '테스트139',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 138,
        title: '테스트138',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 137,
        title: '테스트137',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 136,
        title: '테스트136',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 135,
        title: '테스트135',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 134,
        title: '테스트134',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 133,
        title: '테스트133',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 132,
        title: '테스트132',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 131,
        title: '테스트131',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 130,
        title: '테스트130',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 129,
        title: '테스트129',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 128,
        title: '테스트128',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 127,
        title: '테스트127',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 126,
        title: '테스트126',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 125,
        title: '테스트125',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 124,
        title: '테스트124',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 123,
        title: '테스트123',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 122,
        title: '테스트122',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 121,
        title: '테스트121',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 120,
        title: '테스트120',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 119,
        title: '테스트119',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 118,
        title: '테스트118',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 117,
        title: '테스트117',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 116,
        title: '테스트116',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 115,
        title: '테스트115',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 114,
        title: '테스트114',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 113,
        title: '테스트113',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 112,
        title: '테스트112',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 111,
        title: '테스트111',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 110,
        title: '테스트110',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 109,
        title: '테스트109',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 108,
        title: '테스트108',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 107,
        title: '테스트107',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 106,
        title: '테스트106',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 105,
        title: '테스트105',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 104,
        title: '테스트104',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 103,
        title: '테스트103',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 102,
        title: '테스트102',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 101,
        title: '테스트101',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 100,
        title: '테스트100',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 99,
        title: '테스트99',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 98,
        title: '테스트98',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 97,
        title: '테스트97',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 96,
        title: '테스트96',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 95,
        title: '테스트95',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 94,
        title: '테스트94',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 93,
        title: '테스트93',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 92,
        title: '테스트92',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 91,
        title: '테스트91',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 90,
        title: '테스트90',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 89,
        title: '테스트89',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 88,
        title: '테스트88',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 87,
        title: '테스트87',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 86,
        title: '테스트86',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 85,
        title: '테스트85',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 84,
        title: '테스트84',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 83,
        title: '테스트83',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 82,
        title: '테스트82',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 81,
        title: '테스트81',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 80,
        title: '테스트80',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 79,
        title: '테스트79',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 78,
        title: '테스트78',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 77,
        title: '테스트77',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 76,
        title: '테스트76',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 75,
        title: '테스트75',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 74,
        title: '테스트74',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 73,
        title: '테스트73',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 72,
        title: '테스트72',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 71,
        title: '테스트71',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 70,
        title: '테스트70',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 69,
        title: '테스트69',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 68,
        title: '테스트68',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 67,
        title: '테스트67',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 66,
        title: '테스트66',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 65,
        title: '테스트65',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 64,
        title: '테스트64',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 63,
        title: '테스트63',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 62,
        title: '테스트62',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 61,
        title: '테스트61',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 60,
        title: '테스트60',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 59,
        title: '테스트59',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 58,
        title: '테스트58',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 57,
        title: '테스트57',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 56,
        title: '테스트56',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 55,
        title: '테스트55',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 54,
        title: '테스트54',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 53,
        title: '테스트53',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 52,
        title: '테스트52',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 51,
        title: '테스트51',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 50,
        title: '테스트50',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 49,
        title: '테스트49',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 48,
        title: '테스트48',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 47,
        title: '테스트47',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 46,
        title: '테스트46',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 45,
        title: '테스트45',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 44,
        title: '테스트44',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 43,
        title: '테스트43',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 42,
        title: '테스트42',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 41,
        title: '테스트41',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 40,
        title: '테스트40',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 39,
        title: '테스트39',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 38,
        title: '테스트38',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 37,
        title: '테스트37',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 36,
        title: '테스트36',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 35,
        title: '테스트35',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 34,
        title: '테스트34',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 33,
        title: '테스트33',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 32,
        title: '테스트32',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 31,
        title: '테스트31',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 30,
        title: '테스트30',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 29,
        title: '테스트29',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 28,
        title: '테스트28',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 27,
        title: '테스트27',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 26,
        title: '테스트26',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 25,
        title: '테스트25',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 24,
        title: '테스트24',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 23,
        title: '테스트23',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 22,
        title: '테스트22',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 21,
        title: '테스트21',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 20,
        title: '테스트20',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 19,
        title: '테스트19',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 18,
        title: '테스트18',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 17,
        title: '테스트17',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 16,
        title: '테스트16',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 15,
        title: '테스트15',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 14,
        title: '테스트14',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 13,
        title: '테스트13',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 12,
        title: '테스트12',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 11,
        title: '테스트11',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 10,
        title: '테스트10',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 9,
        title: '테스트09',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 8,
        title: '테스트08',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 7,
        title: '테스트07',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 6,
        title: '테스트06',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 5,
        title: '테스트05',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 4,
        title: '테스트04',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 3,
        title: '테스트03',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 2,
        title: '테스트02',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
      {
        seq: 1,
        title: '테스트01',
        status: '진행중',
        uncompletedCount: 11,
        completedCount: 0,
        insertDate: '9999-12-31 23:59:59',
      },
    ],
  };

  res.send(result);
});
// ---
