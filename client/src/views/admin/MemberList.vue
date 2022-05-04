<script setup>
// vue lifecycle
import { onMounted, ref, reactive } from 'vue';

// swal
import swal from 'sweetalert2';

const refSearch = ref(null);
onMounted(() => {
  refSearch.value.focus();
});

const members = [
  { seq: 6, userEmail: 'daerim.jeong@bespinglobal.com', userName: '정*림', auth: 1, insDate: '2022-05-03 23:59:59' },
  { seq: 5, userEmail: 'heejung.chae@bespinglobal.com', userName: '채*중', auth: 1, insDate: '2022-05-03 23:59:59' },
  {
    seq: 4,
    userEmail: 'seokcheon.kang@bespinglobal.com',
    userName: '강*천',
    auth: 1,
    insDate: '2022-05-03 23:59:59',
  },
  { seq: 3, userEmail: 'heeyeon.jeon@bespinglobal.com', userName: '전*연', auth: 98, insDate: '2022-05-03 23:59:59' },
  {
    seq: 2,
    userEmail: 'yunbeom.kim@bespinglobal.com',
    userName: '김*범',
    auth: 98,
    insDate: '2022-05-03 23:59:59',
  },
  { seq: 1, userEmail: 'sanghoon.yun@bespinglobal.com', userName: '윤*훈', auth: 99, insDate: '2022-05-03 23:59:59' },
];

const setAuth = (auth) => {
  switch (auth) {
    case 1:
      return '일반';
      break;
    case 98:
      return '운영자';
      break;
    case 99:
      return '관리자';
      break;
    default:
      return '손님';
      break;
  }
};
</script>

<template>
  <h1 class="text-center my-3">회원 목록</h1>
  <form class="d-flex justify-content-center my-3">
    <input class="form-control me-2 w-75" type="search" placeholder="검색어" aria-label="검색" ref="refSearch" />
    <button class="btn btn-outline-dark" type="button">검색</button>
  </form>
  <div class="table-responsive">
    <table class="table table-light table-hover">
      <thead>
        <tr>
          <th class="text-center text-nowrap">순번</th>
          <th class="text-center text-nowrap">이메일</th>
          <th class="text-center text-nowrap">이름</th>
          <th class="text-center text-nowrap">권한</th>
          <th class="text-center text-nowrap">가입일시</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="member in members" role="button">
          <td class="text-end">{{ member.seq }}&nbsp;</td>
          <td class="text-center">{{ member.userEmail }}</td>
          <td class="text-center">{{ member.userName }}</td>
          <td class="text-center">{{ setAuth(member.auth) }}</td>
          <td class="text-center">{{ member.insDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <nav aria-label="Page navigation" class="py-3">
    <ul class="pagination justify-content-center">
      <li class="page-item disabled">
        <a class="page-link">이전</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">1</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">2</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">3</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">다음</a>
      </li>
    </ul>
  </nav>
</template>

<style scoped></style>
