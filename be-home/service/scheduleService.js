const schedules = {
  columns: [
    {
      key: 'schedule_code',
      val: '순번',
    },
    { key: 'title', val: '제목' },
    {
      key: 'schedule_status',
      val: '스케줄 상태',
    },
    {
      key: 'process_status',
      val: '진행 상태',
    },
    {
      key: 'regist_date',
      val: '등록일시',
    },
    {
      key: 'limit_date',
      val: '마감일시',
    },
  ],
  dataList: [],
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
  getSchedules: async () => {
    const sql = `
    select 
           schedule_code
         , title
         , schedule_status 
         , process_status 
         , date_format(regist_date, '%Y-%m-%d %H:%i:%s') as regist_date
         , date_format(limit_date, '%Y-%m-%d %H:%i:%s') as limit_date
         , case when schedule_status = '1' then '준비'
                when schedule_status = '2' then '진행'
                when schedule_status = '3' then '취소'
                when schedule_status = '99' then '만료'
                else '알수없음'
            end as schedule_status_val
         , case when process_status = '1' then '준비'
                when process_status = '99' then '종료'
                else '알수없음'
            end as process_status_val
      from tb_schedule 
     where 1=1 
    `;

    const result = await db
      .query(sql)
      .then((response) => {
        schedules.dataList = response;
        return schedules;
      })
      .catch((err) => {
        LOG(err);
      });

    return result;
  },
  getSchedule: async (schedule_code) => {
    const sql = `
    select 
           schedule_code
         , title
         , schedule_status 
         , process_status 
         , date_format(regist_date, '%Y-%m-%d %H:%i:%s') as regist_date
         , date_format(limit_date, '%Y-%m-%d %H:%i:%s') as limit_date
         , case when schedule_status = '1' then '준비'
                when schedule_status = '2' then '진행'
                when schedule_status = '3' then '취소'
                when schedule_status = '99' then '만료'
                else '알수없음'
            end as schedule_status_val
         , case when process_status = '1' then '준비'
                when process_status = '99' then '종료'
                else '알수없음'
            end as process_status_val
      from tb_schedule 
     where 1=1 
       and schedule_code = ?
    `;

    const param = schedule_code;

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
};

module.exports = service;
