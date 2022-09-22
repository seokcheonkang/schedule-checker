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
  sendEmailByRequest: (emailInfo) => {
    let result = null;

    LOGD('check parameters', emailInfo); // TODO

    EMAIL.initTransporter();

    const seq = emailInfo.schedule_code;
    const title = emailInfo.title;

    for (let i = 0; i < emailInfo.emails.length; i++) {
      const email = emailInfo.emails[i];
      const content = emailInfo.content;
      const contentHtml = `
        <h1>안녕하세요? Schedule Checker 관리자입니다.</h1>
        <h2>${content}</h2>
        <h2>${process.env.BASE_URL_FRONTEND}/home/schedules/${seq}</h2>
      `;

      EMAIL.sendMail(email, title, content, contentHtml);
    }

    return result;
  },
  sendEmailInsertNewSchedule: (emailInfo) => {
    let result = null;

    EMAIL.initTransporter();

    const title = '[Schedule Checker] 스케줄 생성 알림';

    try {
      const seq = emailInfo.shift();
      for (let i = 0; i < emailInfo.length; i++) {
        const email = emailInfo[i];
        const content = '';
        const contentHtml = `
          <h1>안녕하세요? Schedule Checker 관리자입니다.</h1>
          <h2>스케줄이 생성되었습니다. 아래 링크에서 확인하세요.</h2>
          <h2>${process.env.BASE_URL_FRONTEND}/home/schedules/${seq}</h2>
        `;
        EMAIL.sendMail(email, title, content, contentHtml);
      }

      result = true;
    } catch (error) {
      result = false;
      LOGD(error);
    } finally {
      return result;
    }
  },
  sendEmailUpdateSchedule: (emailInfo) => {
    let result = null;

    EMAIL.initTransporter();

    const title = '[Schedule Checker] 스케줄 수정 알림';

    try {
      const seq = emailInfo.shift();
      for (let i = 0; i < emailInfo.length; i++) {
        const email = emailInfo[i];
        const content = '';
        const contentHtml = `
          <h1>안녕하세요? Schedule Checker 관리자입니다.</h1>
          <h2>스케줄이 수정되었습니다. 아래 링크에서 확인하세요.</h2>
          <h2>${process.env.BASE_URL_FRONTEND}/home/schedules/${seq}</h2>
        `;
        EMAIL.sendMail(email, title, content, contentHtml);
      }

      result = true;
    } catch (error) {
      result = false;
      LOGD(error);
    } finally {
      return result;
    }
  },
};

module.exports = service;
