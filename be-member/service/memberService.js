const members = {
  columns: [
    {
      key: 'user_code',
      val: '유저코드',
    },
    {
      key: 'name',
      val: '이름',
    },
    { key: 'e_mail', val: '이메일' },
    { key: 'privilege', val: '회원등급(값)' },
    { key: 'grade', val: '회원등급' },
    { key: 'regist_date', val: '가입일시' },
    { key: 'user_status', val: '가입상태' },
  ],
  dataList: null,
};

// ---
const MIDDLEWARE_PATH = '../middleware';

// ---
const LOG = require(`${MIDDLEWARE_PATH}/log`);

// ---
const db = require('../database/connect/mariadb');
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
  getMemberByUserEmail: async (userEmail) => {
    const sql = 'select * from tb_user where 1=1 and e_mail = ?';
    const param = userEmail;

    const result = await db
      .query(sql, param)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        LOG(err);
      });

    return result;
  },
  insertMember: async (userInfo) => {
    const sql = `insert into tb_user values (?, ?, ?, 'normal', 1, now(), 1)`;
    const param = [userInfo.user_code, userInfo.name, userInfo.e_mail];

    await db.query(sql, param);

    return service.getMemberByUserEmail(userInfo.e_mail);
  },
  updateMember: async (userInfo) => {
    const sql = `update tb_user set grade = ?, user_status = ? where 1=1 and e_mail = ?`;
    const param = [userInfo.grade, userInfo.user_status, userInfo.e_mail];

    await db.query(sql, param);

    return service.getMemberByUserEmail(userInfo.e_mail);
  },
  deleteMember: async (userInfo) => {
    const sql = `delete from tb_user where 1=1 and e_mail = ?`;
    const param = [userInfo.e_mail];

    await db.query(sql, param);
  },
};

module.exports = service;
