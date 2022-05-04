<script setup>
// vue lifecycle
import { onMounted, ref, reactive, computed } from 'vue';

// swal
import swal from 'sweetalert2';

// Paginate
import Paginate from 'vuejs-paginate-next';

const refSearch = ref(null);
onMounted(() => {
  refSearch.value.focus();
  goToPage(1);
});

// Server Data
const schedules = [
  { seq: 21, userName: '관리자', title: '테스트21', expiryDate: '9999-12-31 23:59:59' },
  { seq: 20, userName: '관리자', title: '테스트20', expiryDate: '9999-12-31 23:59:59' },
  { seq: 19, userName: '관리자', title: '테스트19', expiryDate: '9999-12-31 23:59:59' },
  { seq: 18, userName: '관리자', title: '테스트18', expiryDate: '9999-12-31 23:59:59' },
  { seq: 17, userName: '관리자', title: '테스트17', expiryDate: '9999-12-31 23:59:59' },
  { seq: 16, userName: '관리자', title: '테스트16', expiryDate: '9999-12-31 23:59:59' },
  { seq: 15, userName: '관리자', title: '테스트15', expiryDate: '9999-12-31 23:59:59' },
  { seq: 14, userName: '관리자', title: '테스트14', expiryDate: '9999-12-31 23:59:59' },
  { seq: 13, userName: '관리자', title: '테스트13', expiryDate: '9999-12-31 23:59:59' },
  { seq: 12, userName: '관리자', title: '테스트12', expiryDate: '9999-12-31 23:59:59' },
  { seq: 11, userName: '관리자', title: '테스트11', expiryDate: '9999-12-31 23:59:59' },
  { seq: 10, userName: '관리자', title: '테스트10', expiryDate: '9999-12-31 23:59:59' },
  { seq: 9, userName: '관리자', title: '테스트9', expiryDate: '9999-12-31 23:59:59' },
  { seq: 8, userName: '관리자', title: '테스트8', expiryDate: '9999-12-31 23:59:59' },
  { seq: 7, userName: '관리자', title: '테스트7', expiryDate: '9999-12-31 23:59:59' },
  { seq: 6, userName: '관리자', title: '테스트6', expiryDate: '9999-12-31 23:59:59' },
  { seq: 5, userName: '관리자', title: '테스트5', expiryDate: '9999-12-31 23:59:59' },
  { seq: 4, userName: '관리자', title: '테스트4', expiryDate: '9999-12-31 23:59:59' },
  { seq: 3, userName: '관리자', title: '긴급 요청 사항입니다.', expiryDate: '2022-05-02 23:59:59' },
  { seq: 2, userName: '관리자', title: '자격증 업데이트 부탁드립니다.', expiryDate: '2022-05-31 23:59:59' },
  { seq: 1, userName: '관리자', title: '개인 영수증 정산 신청바랍니다.', expiryDate: '2022-05-03 23:59:59' },
];

let curPage = ref(1); // 현재 페이지
let perPage = ref(10); // 페이지마다 출력할 게시물 수
let pageCnt = ref(10); // 총 페이지 수

const paginatedData = computed(() => {
  return schedules.slice((curPage.value - 1) * perPage.value, curPage.value * perPage.value);
});

const goToPage = (numPage) => {
  pageCnt.value = Math.floor(schedules.length / perPage.value) + 1;
  curPage.value = numPage;
  console.log(curPage.value, pageCnt.value);
};
</script>

<template>
  <h1 class="text-center my-3">스케줄 목록</h1>
  <form class="d-flex justify-content-center my-3">
    <input class="form-control me-2 w-75" type="search" placeholder="검색어" aria-label="검색" ref="refSearch" />
    <button class="btn btn-outline-dark" type="button">검색</button>
  </form>
  <div class="table-responsive">
    <table class="table table-light table-hover">
      <thead>
        <tr>
          <th class="text-center text-nowrap">순번</th>
          <th class="text-center text-nowrap">이름</th>
          <th class="text-center text-nowrap">제목</th>
          <th class="text-center text-nowrap">마감일시</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in paginatedData" role="button">
          <td class="text-end">{{ item.seq }}&nbsp;</td>
          <td class="text-center">{{ item.userName }}</td>
          <td class="text-center">
            <router-link :to="{ name: 'ScheduleView', params: { seq: item.seq } }" class="btn__td">
              {{ item.title }}
            </router-link>
          </td>
          <td class="text-center">{{ item.expiryDate }}</td>
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
  <!-- <nav aria-label="Page navigation" class="py-3">
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
  </nav> -->
</template>

<style scoped></style>
