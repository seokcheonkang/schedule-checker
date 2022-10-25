const schedules = {
  columns: [
    {
      key: 'schedule_code',
      val: '순번',
    },
    { key: 'title', val: '제목' },
    {
      key: 'status_val',
      val: '상태',
    },
    {
      key: 'uncompleted_count',
      val: '미완료(건수)',
    },
    {
      key: 'completed_count',
      val: '완료(건수)',
    },
    {
      key: 'total_count',
      val: '전체(건수)',
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
const LOGD = require(`${MIDDLEWARE_PATH}/logd`);
const EMAIL = require(`${MIDDLEWARE_PATH}/email`);

// ---
const db = require(`${DATABASE_PATH}/db.js`);
db.getConnection();

// ---
const service = {
  selectSchedules: async () => {
    const sql = `
    select 
           t1.schedule_code
         , max(t1.title) as title
         , max(t1.status) as status
         , date_format(max(t1.regist_date), '%Y-%m-%d %H:%i:%s') as regist_date
         , date_format(max(t1.limit_date), '%Y-%m-%d %H:%i:%s') as limit_date
         , max(t1.status_val) as status_val
         , sum(t1.completed_count) + sum(t1.uncompleted_count) as total_count
         , sum(t1.completed_count) as completed_count
         , sum(t1.uncompleted_count) as uncompleted_count
      from (
            select 
                   ts.schedule_code
                 , ts.title
                 , ts.status
                 , ts.regist_date
                 , ts.limit_date
                 , case when ts.status = '1' then '준비'
                        when ts.status = '2' then '취소'
                        when ts.status = '3' then '만료'
                        when ts.status = '99' then '진행'
                        else '알수없음'
                    end as status_val
                 , case when tsd.status = '99' then 1 
                        else 0
                    end as completed_count
                 , case when tsd.status != '99' then 1 
                        else 0
                    end as uncompleted_count
              from tb_schedule ts
              left join tb_schedule_detail tsd
                on ts.schedule_code = tsd.schedule_code
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
        LOGD(err);
      });

    return result;
  },
  selectSchedule: async (scheduleCode) => {
    const sql = `
    select 
           t1.schedule_code
         , max(t1.title) as title
         , max(t1.status) as status
         , date_format(max(t1.regist_date), '%Y-%m-%d %H:%i:%s') as regist_date
         , date_format(max(t1.limit_date), '%Y-%m-%d %H:%i:%s') as limit_date
         , max(t1.status_val) as status_val
         , sum(t1.completed_count) + sum(t1.uncompleted_count) as total_count
         , sum(t1.completed_count) as completed_count
         , sum(t1.uncompleted_count) as uncompleted_count
         , ifnull(group_concat(t1.all_user separator ','), '없음') as all_user
         , ifnull(group_concat(t1.completed_user separator ','), '없음') as completed_user
         , ifnull(group_concat(t1.uncompleted_user separator ','), '없음') as uncompleted_user
         , max(t1.content) as content
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
                 , case when b.status = '99' then 1 
                        else 0
                    end as completed_count
                 , case when b.status != '99' then 1 
                        else 0
                    end as uncompleted_count
                 , concat(c.user_name, '/', c.user_email) as all_user
                 , case when b.status = '99' then concat(c.user_name, '/', c.user_email)
                        else null
                    end as completed_user
                 , case when b.status != '99' then concat(c.user_name, '/', c.user_email)
                   else null
                    end as uncompleted_user
                 , a.content
              from tb_schedule a
              left join tb_schedule_detail b
                on a.schedule_code = b.schedule_code
              left join tb_user c
                on b.user_email = c.user_email
             where 1=1 
               and a.schedule_code = ?
        ) t1
     where 1=1
     group by t1.schedule_code
    `;

    const dbParam = scheduleCode;

    const result = await db
      .query(sql, dbParam)
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
  insertSchedule: async (scheduleInfo) => {
    const sql = `
    insert into tb_schedule
    (
        title
      , content
      , status
      , regist_date
      , limit_date
    ) values (
        ?
      , ?
      , ?
      , STR_TO_DATE(?,'%Y-%m-%d %H:%i:%s')
      , STR_TO_DATE(?,'%Y-%m-%d %H:%i:%s')
    )
    `;

    const dbParam = [
      scheduleInfo.title,
      scheduleInfo.content,
      scheduleInfo.status,
      scheduleInfo.regist_date,
      scheduleInfo.limit_date,
    ];

    const result = await db.query(sql, dbParam);
    return result;
  },
  insertScheduleDetail: async (scheduleInfo) => {
    let result = [];

    const sql = `
    insert into tb_schedule_detail
    (
        schedule_code
      , user_email
      , status
    )
    values (?, ?, ?)
    `;

    let param = [];
    for (let i = 0; i < scheduleInfo.checked_users.length; i++) {
      const subParam = [];

      const seq = '' + scheduleInfo.insertId;
      const email = scheduleInfo.checked_users[i];
      const status = '1';

      subParam.push(seq);
      subParam.push(email);
      subParam.push(status);
      param.push(subParam);

      if (i === 0) {
        result.push(seq);
      }
      result.push(email);
    }

    try {
      await db.batch(sql, param);
    } catch (error) {
      LOGD('error', JSON.stringify(error));
    } finally {
      LOGD('finally', JSON.stringify(result));
      return result;
    }
  },
  updateSchedule: async (scheduleInfo) => {
    const sql = `
    update tb_schedule
       set
           title = ?
         , content = ?
         , status = ?
         , regist_date = STR_TO_DATE(?,'%Y-%m-%d %H:%i:%s')
         , limit_date = STR_TO_DATE(?,'%Y-%m-%d %H:%i:%s')
     where 1=1
       and schedule_code = ?
    `;

    const dbParam = [
      scheduleInfo.title,
      scheduleInfo.content,
      scheduleInfo.status,
      scheduleInfo.regist_date,
      scheduleInfo.limit_date,
      scheduleInfo.schedule_code,
    ];

    const result = await db.query(sql, dbParam);
    return result;
  },
  deleteScheduleDetail: async (scheduleInfo) => {
    const sql = `
    delete 
      from tb_schedule_detail
     where 1=1
       and schedule_code = ?
    `;

    const dbParam = [scheduleInfo.schedule_code];

    const result = await db.query(sql, dbParam);
    return result;
  },
  selectScheduleMember: async (scheduleInfo) => {
    const sql = `
    select 
           tu.user_email
         , tsd.status
      from tb_schedule ts
      join tb_schedule_detail tsd
        on ts.schedule_code = tsd.schedule_code
      join tb_user tu
        on tsd.user_email = tu.user_email
     where 1=1
       and ts.status = '99'
       and ts.limit_date > now()
       and tu.grade in ('1', '99')
       and tu.status = '99'
       and ts.schedule_code = ?
       and tsd.user_email = ?
    `;

    const dbParam = [scheduleInfo.schedule_code, scheduleInfo.user_email];

    const result = await db
      .query(sql, dbParam)
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
  updateScheduleDetail: async (scheduleInfo) => {
    const sql = `
    update tb_schedule_detail 
       set
           status = ?
         , update_date = now()
     where 1=1
       and schedule_code = ?
       and user_email = ?
    `;

    const dbParam = [scheduleInfo.status, scheduleInfo.schedule_code, scheduleInfo.user_email];

    const result = await db.query(sql, dbParam);
    return result;
  },
};

module.exports = service;
