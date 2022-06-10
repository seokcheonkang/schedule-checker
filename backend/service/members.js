const members = [
  {
    seq: 5,
    userEmail: 'idealful@gmail.com',
    userPassword: '5',
    userName: '테스터',
    userGrade: 1,
    userGradeVal: '일반',
    registerDate: '2022-06-08 23:59:59',
    registerStatus: '2',
    registerStatusVal: '승인',
  },
  {
    seq: 4,
    userEmail: 'seokcheon.kang@bespinglobal.com',
    userPassword: '4',
    userName: '강*천',
    userGrade: 1,
    userGradeVal: '일반',
    registerDate: '2022-05-03 23:59:59',
    registerStatus: '2',
    registerStatusVal: '승인',
  },
  {
    seq: 3,
    userEmail: 'heeyeon.jeon@bespinglobal.com',
    userName: '전*연',
    userPassword: '3',
    userGrade: 1,
    userGradeVal: '일반',
    registerDate: '2022-05-03 23:59:59',
    registerStatus: '2',
    registerStatusVal: '승인',
  },
  {
    seq: 2,
    userEmail: 'yunbeom.kim@bespinglobal.com',
    userName: '김*범',
    userPassword: '2',
    userGrade: 99,
    userGradeVal: '관리자',
    registerDate: '2022-05-03 23:59:59',
    registerStatus: '2',
    registerStatusVal: '승인',
  },
  {
    seq: 1,
    userEmail: 'sanghoon.yun@bespinglobal.com',
    userName: '윤*훈',
    userPassword: '1',
    userGrade: 99,
    userGradeVal: '관리자',
    registerDate: '2022-05-03 23:59:59',
    registerStatus: '2',
    registerStatusVal: '승인',
  },
];

const service = {
  getMembers: () => {
    return members;
  },
  getMember: (userEmail, userPassword) => {
    return members.find((member) => member.userEmail === userEmail && member.userPassword === userPassword);
  },
};

module.exports = service;
