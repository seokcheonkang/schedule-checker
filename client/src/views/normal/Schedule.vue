<script setup>
// vue lifecycle
import { onMounted, ref, reactive } from 'vue';

// swal
import swal from 'sweetalert2';

const refSearch = ref(null);
onMounted(() => {
  refSearch.value.focus();
});

const schedules = reactive({
  items: [
    { seq: 3, userName: '관리자', title: '긴급 요청 사항입니다.', expiryDate: '2022-05-02 23:59:59' },
    { seq: 2, userName: '관리자', title: '자격증 업데이트 부탁드립니다.', expiryDate: '2022-05-31 23:59:59' },
    { seq: 1, userName: '관리자', title: '개인 영수증 정산 신청바랍니다.', expiryDate: '2022-05-03 23:59:59' },
  ],
});
</script>

<template>
  <h1 class="text-center my-3">스케줄</h1>
  <form class="d-flex justify-content-center my-3">
    <input class="form-control me-2 w-75" type="search" placeholder="검색어" aria-label="검색" ref="refSearch" />
    <button class="btn btn-outline-dark" type="button">검색</button>
  </form>
  <div class="table-responsive">
    <table class="table table-light table-hover">
      <thead>
        <tr>
          <th scope="col" class="text-nowrap">순번</th>
          <th scope="col" class="text-nowrap">이름</th>
          <th scope="col" class="text-nowrap">제목</th>
          <th scope="col" class="text-nowrap">마감일시</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in schedules.items" role="button">
          <th scope="row">{{ item.seq }}</th>
          <td>{{ item.userName }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.expiryDate }}</td>
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
