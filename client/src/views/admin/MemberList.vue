<script setup>
// vue lifecycle
import { onMounted, ref, reactive } from 'vue';

// swal
import swal from 'sweetalert2';

const refSearch = ref(null);
onMounted(() => {
  refSearch.value.focus();
});

const members = reactive({
  items: [
    { seq: 3, userEmail: '3@bespinglobal.com', userName: '관리자', auth: 'normal', insDate: '2022-05-02 23:59:59' },
    {
      seq: 2,
      userEmail: 'yunbeom.kim@bespinglobal.com',
      userName: '김윤범',
      auth: 'normal',
      insDate: '2022-05-31 23:59:59',
    },
    { seq: 1, userEmail: 'admin@bespinglobal.com', userName: '관리자', auth: 'normal', insDate: '2022-05-03 23:59:59' },
  ],
});
</script>

<template>
  <h1 class="text-center my-3">회원</h1>
  <form class="d-flex justify-content-center my-3">
    <input class="form-control me-2 w-75" type="search" placeholder="검색어" aria-label="검색" ref="refSearch" />
    <button class="btn btn-outline-dark" type="button">검색</button>
  </form>
  <div class="table-responsive">
    <table class="table table-light table-hover">
      <thead>
        <tr>
          <th scope="col" class="text-nowrap">순번</th>
          <th scope="col" class="text-nowrap">이메일</th>
          <th scope="col" class="text-nowrap">이름</th>
          <th scope="col" class="text-nowrap">권한</th>
          <th scope="col" class="text-nowrap">가입일시</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in members.items" role="button">
          <th scope="row">{{ item.seq }}</th>
          <td>{{ item.userEmail }}</td>
          <td>{{ item.userName }}</td>
          <td>{{ item.auth }}</td>
          <td>{{ item.insDate }}</td>
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
