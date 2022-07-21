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
    { key: 'grade_val', val: '등급' },
    { key: 'status_val', val: '상태' },
    { key: 'regist_date', val: '가입일시' },
  ],
  dataList: null,
};

// ---
const MIDDLEWARE_PATH = '../middleware';
const DATABASE_PATH = '../database';

// ---
const LOG = require(`${MIDDLEWARE_PATH}/log`);
const LOGD = require(`${MIDDLEWARE_PATH}/logd`);

// ---
const db = require(`${DATABASE_PATH}/db.js`);
db.getConnection();

// ---
const service = {
  selectMembers: async () => {
    const sql = `
    select 
           user_code
         , user_email
         , user_name
         , grade
         , status
         , date_format(regist_date, '%Y-%m-%d %H:%i:%s') as regist_date
         , case when grade = '1' then '회원'
                when grade = '99' then '관리자'
                else '알수없음'
            end as grade_val
         , case when status = '1' then '대기'
                when status = '2' then '정지'
                when status = '3' then '탈퇴'
                when status = '99' then '승인'
                else '알수없음'
            end as status_val
      from tb_user 
     where 1=1 
    `;

    const result = await db
      .query(sql)
      .then((response) => {
        members.dataList = response;
        return members;
      })
      .catch((err) => {
        LOGD(err);
      });

    return result;
  },
  selectMemberByUserEmail: async (userEmail) => {
    const sql = `
    select 
           user_code
         , user_email
         , user_name
         , grade
         , status
         , date_format(regist_date, '%Y-%m-%d %H:%i:%s') as regist_date
         , case when grade = '1' then '회원'
                when grade = '99' then '관리자'
                else '알수없음'
            end as grade_val
         , case when status = '1' then '대기'
                when status = '2' then '정지'
                when status = '3' then '탈퇴'
                when status = '99' then '승인'
                else '알수없음'
            end as status_val
      from tb_user 
     where 1=1 
       and user_email = ?
    `;

    const param = userEmail;

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
        LOGD(err);
      });

    return result;
  },
  insertMember: async (userInfo) => {
    const sql = `
    insert into tb_user
    (
        user_code
      , user_email
      , user_name
      , grade
      , status
      , regist_date
    ) values (
        ?
      , ?
      , ?
      , '1'
      , '1'
      , now()
    )
    `;

    const param = [userInfo.user_code, userInfo.user_email, userInfo.user_name];

    await db.query(sql, param);

    return service.selectMemberByUserEmail(userInfo.user_email);
  },
  updateMember: async (userInfo) => {
    const sql = `
    update tb_user 
       set
           grade = ?
         , status = ? 
     where 1=1 
       and user_email = ?
    `;

    const param = [userInfo.grade, userInfo.status, userInfo.user_email];

    await db.query(sql, param);

    return service.getMemberByUserEmail(userInfo.user_email);
  },
  deleteMember: async (userEmail) => {
    const sql = `
    delete from tb_user
     where 1=1 
       and user_email = ?
    `;

    const param = userEmail;

    await db.query(sql, param);
  },
};

module.exports = service;
