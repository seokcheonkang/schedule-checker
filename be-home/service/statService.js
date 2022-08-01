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
  selectStatScheduleStatus: async (reqParam) => {
    const sql = `
    select 
           date_format(ts.limit_date, '%Y-%m') as "기준"
         , sum(case when ts.status = '1' then 1 else 0 end) as "준비"
         , sum(case when ts.status = '2' then 1 else 0 end) as "취소"
         , sum(case when ts.status = '3' then 1 else 0 end) as "만료"
         , sum(case when ts.status = '99' then 1 else 0 end) as "진행"
      from tb_schedule ts
     where 1=1
       and ts.limit_date
       between str_to_date(concat(?, '-01-01 00:00:00'), '%Y-%m-%d %H:%i:%s')
           and str_to_date(concat(?, '-12-31 23:59:59'), '%Y-%m-%d %H:%i:%s')
     group by date_format(ts.limit_date, '%Y-%m')
    `;

    const dbParam = [reqParam.yyyy, reqParam.yyyy];

    const result = await db
      .query(sql, dbParam)
      .then((response) => {
        if (response.length < 1) {
          return null;
        } else {
          return response;
        }
      })
      .catch((err) => {
        LOGD(err);
      });

    return result;
  },
  selectStatScheduleProcess: async (reqParam) => {
    const sql = `
    select 
           date_format(ts.limit_date, '%Y-%m') as "기준"
         , sum(case when tsd.status = '1' then 1 else 0 end) as "미확인"
         , sum(case when tsd.status = '2' then 1 else 0 end) as "확인"
         , sum(case when tsd.status = '99' then 1 else 0 end) as "완료"
      from tb_schedule ts
      left join tb_schedule_detail tsd
        on ts.schedule_code = tsd.schedule_code 
     where 1=1
       and ts.limit_date
       between str_to_date(concat(?, '-01-01 00:00:00'), '%Y-%m-%d %H:%i:%s')
           and str_to_date(concat(?, '-12-31 23:59:59'), '%Y-%m-%d %H:%i:%s')
     group by date_format(ts.limit_date, '%Y-%m')
    `;

    const dbParam = [reqParam.yyyy, reqParam.yyyy];

    const result = await db
      .query(sql, dbParam)
      .then((response) => {
        if (response.length < 1) {
          return null;
        } else {
          return response;
        }
      })
      .catch((err) => {
        LOGD(err);
      });

    return result;
  },
  selectStatScheduleUser: async (reqParam) => {
    const sql = `
    select 
           max(tu.user_name) as "기준"
         , sum(case when tsd.status = '1' then 1 else 0 end) as "미확인"
         , sum(case when tsd.status = '2' then 1 else 0 end) as "확인"
         , sum(case when tsd.status = '99' then 1 else 0 end) as "완료"
      from tb_user tu
      left join tb_schedule_detail tsd
        on tu.user_email = tsd.user_email
      left join tb_schedule ts
        on ts.schedule_code = tsd.schedule_code
     where 1=1
       and ts.limit_date
       between str_to_date(concat(?, '-01-01 00:00:00'), '%Y-%m-%d %H:%i:%s')
           and str_to_date(concat(?, '-12-31 23:59:59'), '%Y-%m-%d %H:%i:%s')
     group by tsd.user_email
    `;

    const dbParam = [reqParam.yyyy, reqParam.yyyy];

    const result = await db
      .query(sql, dbParam)
      .then((response) => {
        if (response.length < 1) {
          return null;
        } else {
          return response;
        }
      })
      .catch((err) => {
        LOGD(err);
      });

    return result;
  },
};

module.exports = service;
