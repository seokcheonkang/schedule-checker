const schedules = {
  columns: [
    {
      key: 'schedule_code',
      val: '순번',
    },
    { key: 'title', val: '제목' },
    {
      key: 'status_val',
      val: '스케줄 상태',
    },
    {
      key: 'uncompleted_count',
      val: '미완료건수',
    },
    {
      key: 'completed_count',
      val: '완료건수',
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
           t1.schedule_code
         , max(t1.title) as title
         , max(t1.status) as status
         , date_format(max(t1.regist_date), '%y-%m-%d %h:%i:%s') as regist_date
         , date_format(max(t1.limit_date), '%y-%m-%d %h:%i:%s') as limit_date
         , max(t1.status_val) as status_val
         , sum(t1.uncompleted_count) as uncompleted_count
         , sum(t1.completed_count) as completed_count
      from (
            select 
                   a.schedule_code
                 , a.title
                 , a.status
                 , a.regist_date
                 , a.limit_date
                 , case when a.status = '1' then '준비'
                        when a.status = '2' then '취소'
                        when a.status = '3' then '만료'
                        when a.status = '99' then '진행'
                        else '알수없음'
                    end as status_val
                 , case when b.status = '1' then 1 
                        else 0
                    end as uncompleted_count
                 , case when b.status = '99' then 1 
                        else 0
                    end as completed_count
              from tb_schedule a
              left join tb_schedule_detail b
                on a.schedule_code = b.schedule_code
             where 1=1 
        ) t1
     where 1=1
     group by t1.schedule_code
     order by t1.schedule_code desc
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
           t1.schedule_code
         , max(t1.title) as title
         , max(t1.status) as status
         , date_format(max(t1.regist_date), '%y-%m-%d %h:%i:%s') as regist_date
         , date_format(max(t1.limit_date), '%y-%m-%d %h:%i:%s') as limit_date
         , max(t1.status_val) as status_val
         , sum(t1.uncompleted_count) as uncompleted_count
         , sum(t1.completed_count) as completed_count
      from (
            select 
                   a.schedule_code
                 , a.title
                 , a.status
                 , a.regist_date
                 , a.limit_date
                 , case when a.status = '1' then '준비'
                        when a.status = '2' then '취소'
                        when a.status = '3' then '만료'
                        when a.status = '99' then '진행'
                        else '알수없음'
                    end as status_val
                 , case when b.status = '1' then 1 
                        else 0
                    end as uncompleted_count
                 , case when b.status = '99' then 1 
                        else 0
                    end as completed_count
              from tb_schedule a
              left join tb_schedule_detail b
                on a.schedule_code = b.schedule_code
             where 1=1 
               and a.schedule_code = ?
        ) t1
     where 1=1
     group by t1.schedule_code
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
