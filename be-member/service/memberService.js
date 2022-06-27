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
  dataList: [
    {
      user_code: 'a1',
      name: 'test2',
      e_mail: 'idealful@gmail.com',
      privilege: '관리자',
      grade: 99,
      regist_date: '2022-06-08 23:59:59',
      user_status: '2',
      // seq: 6,
      // userEmail: 'idealful@gmail.com',
      // userName: 'test2',
      // userPassword: '1',
      // userGrade: 99,
      // userGradeVal: '관리자',
      // registerDate: '2022-06-08 23:59:59',
      // registerStatus: '2',
      // registerStatusVal: '승인',
    },
  ],
};

// ---
const db = require('../database/connect/mariadb');
db.getConnection();

const service = {
  getMembers: async () => {
    const sql = 'select * from tb_user';

    const result = await db
      .query(sql)
      .then((response) => {
        return response;
      })
      .then((response) => {
        members.dataList = response;
        return members;
      })
      .catch((err) => {
        console.log(err);
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
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.log(err);
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
