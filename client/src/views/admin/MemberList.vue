<template>
  <CustomPageHeader text="회원 목록" />
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
        <tr v-for="item in paginatedData" role="button">
          <td class="text-center">{{ item.seq }}&nbsp;</td>
          <td class="text-center">{{ item.userEmail }}</td>
          <td class="text-center">{{ item.userName }}</td>
          <td class="text-center">{{ setAuth(item.auth) }}</td>
          <td class="text-center">{{ item.insDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <paginate
    :pageCount="pageCnt"
    :clickHandler="goToPage"
    :prevText="'이전'"
    :nextText="'다음'"
    :container-class="'pagination justify-content-center btn py-3 px-1'"
    :initial-page="curPage"
  >
  </paginate>
</template>

<script setup>
import { onMounted, ref, reactive, computed } from 'vue';

// custom
import CustomPageHeader from '@/components/CustomPageHeader.vue';

// Paginate
import Paginate from 'vuejs-paginate-next';

const refSearch = ref(null);
onMounted(() => {
  refSearch.value.focus();
  goToPage(1);
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

// pagination
let curPage = ref(1); // 현재 페이지
let perPage = ref(10); // 페이지마다 출력할 게시물 수
let pageCnt = ref(10); // 총 페이지 수

const paginatedData = computed(() => {
  return members.slice((curPage.value - 1) * perPage.value, curPage.value * perPage.value);
});

const goToPage = (numPage) => {
  pageCnt.value = Math.floor(members.length / perPage.value) + 1;
  curPage.value = numPage;
};
</script>
