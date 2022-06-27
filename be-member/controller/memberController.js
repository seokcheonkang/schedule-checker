const express = require('express');
const router = express.Router();

require('dotenv').config();

// ---

const MIDDLEWARE_PATH = '../middleware';
const SERVICE_PATH = '../service';

// ---

const LOG = require(`${MIDDLEWARE_PATH}/log`);
const verifyJwt = require(`${MIDDLEWARE_PATH}/verifyJwt`);
const {
  getMembers,
  getMemberByUserEmail,
  insertMember,
  updateMember,
  deleteMember,
} = require(`${SERVICE_PATH}/memberService.js`);

// ---

// router.get('/', verifyJwt, async (req, res) => {
router.get('/', async (req, res) => {
  LOG(req.originalUrl);

  const result = await getMembers();

  const response = { code: 200, message: '조회 성공', result };

  LOG(JSON.stringify(response));

  res.status(200).json(response);
});

// router.get('/:userEmail', verifyJwt, async (req, res) => {
router.get('/:userEmail', async (req, res) => {
  LOG(req.originalUrl);

  const userEmail = req.params.userEmail;

  const result = await getMemberByUserEmail(userEmail);

  const response = { code: 200, message: '조회 성공', result };

  LOG(JSON.stringify(response));

  res.status(200).json(response);
});

// router.post('/', verifyJwt, async (req, res) => {
router.post('/', async (req, res) => {
  LOG(req.originalUrl);

  const user_code = req.body.user_code;
  const name = req.body.name;
  const e_mail = req.body.e_mail;

  const userInfo = {
    user_code,
    name,
    e_mail,
  };

  const result = await insertMember(userInfo);

  const response = { code: 201, message: '등록 성공', result };

  LOG(JSON.stringify(response));

  res.status(201).json(response);
});

// router.patch('/', verifyJwt, async (req, res) => {
router.patch('/', async (req, res) => {
  LOG(req.originalUrl);

  const grade = req.body.grade;
  const user_status = req.body.user_status;
  const e_mail = req.body.e_mail;

  const userInfo = {
    grade,
    user_status,
    e_mail,
  };

  const result = await updateMember(userInfo);

  const response = { code: 201, message: '수정 성공', result };

  LOG(JSON.stringify(response));

  res.status(201).json(response);
});
// router.delete('/', verifyJwt, async (req, res) => {
router.delete('/', async (req, res) => {
  LOG(req.originalUrl);

  const e_mail = req.body.e_mail;

  const userInfo = {
    e_mail,
  };

  await deleteMember(userInfo);

  const response = { code: 201, message: '삭제 성공', userInfo };

  LOG(JSON.stringify(response));

  res.status(201).json(response);
});

module.exports = router;
