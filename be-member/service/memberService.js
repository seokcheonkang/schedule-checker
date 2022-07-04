const members = {
  columns: [
    {
      key: 'user_code',
      val: '코드',
    },
    { key: 'user_email', val: '이메일' },
    {
      key: 'user_name',
      val: '이름',
    },
    { key: 'grade', val: '등급' },
    { key: 'status', val: '상태' },
    { key: 'regist_date', val: '가입일시' },
  ],
  dataList: null,
};

// ---
const MIDDLEWARE_PATH = '../middleware';
const DATABASE_PATH = '../database';

// ---
const LOG = require(`${MIDDLEWARE_PATH}/log`);

// ---
const db = require(`${DATABASE_PATH}/db.js`);
db.getConnection();

const service = {
  getMembers: async () => {
    const sql = 'select * from tb_user';

    const result = await db
      .query(sql)
      .then((response) => {
        members.dataList = response;
        return members;
      })
      .catch((err) => {
        LOG(err);
      });

    return result;
  },
  getMemberByUserEmail: async (user_email) => {
    const sql = 'select * from tb_user where 1=1 and user_email = ?';
    const param = user_email;

    const result = await db
      .query(sql, param)
      .then((response) => {
        if (response.length < 1) {
          return null;
        } else {
          return response[0];
        }
      })
      .catch((err) => {
        LOG(err);
      });

    return result;
  },
  insertMember: async (userInfo) => {
    const sql = `insert into tb_user (user_code, user_email, user_name, grade, status, regist_date) values (?, ?, ?, '1', '1', now())`;
    const param = [userInfo.user_code, userInfo.user_email, userInfo.user_name];

    await db.query(sql, param);

    return service.getMemberByUserEmail(userInfo.user_email);
  },
  updateMember: async (userInfo) => {
    const sql = `update tb_user set grade = ?, status = ? where 1=1 and user_email = ?`;
    const param = [userInfo.grade, userInfo.status, userInfo.user_email];

    await db.query(sql, param);

    return service.getMemberByUserEmail(userInfo.user_email);
  },
  deleteMember: async (userInfo) => {
    const sql = `delete from tb_user where 1=1 and user_email = ?`;
    const param = [userInfo.user_email];

    await db.query(sql, param);
  },
};

module.exports = service;
