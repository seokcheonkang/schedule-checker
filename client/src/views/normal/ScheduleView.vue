<script setup>
// vue lifecycle
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';

// swal
import swal from 'sweetalert2';

onMounted(() => {});

// Server Data
const item = {
  seq: 1,
  userName: '관리자',
  title: '개인 영수증 정산 신청바랍니다.',
  expiryDate: '2022-05-03 23:59:59',
};

const route = useRoute();
const seq = Number(route.params.seq); // 전달받은 파라미터
console.log(seq);

const confirm = () => {
  swal.fire({
    icon: 'warning',
    title: '앗!',
    text: '아직 공사중 입니다.',
    footer: '<a href="/" class="btn btn-warning">홈으로</a>',
  });
};
</script>

<template>
  <h1 class="text-center my-3">스케줄 상세</h1>
  <div class="container">
    <div class="row align-items-center my-3">
      <div class="col-md-10 mx-auto col-lg-10">
        <div class="p-4 p-md-4 border rounded-3 bg-light">
          <h4 class="mb-3">{{ item.title }}</h4>
          <div class="form-floating mb-3">
            <h5 class="text-muted">순번</h5>
            <div class="mb-3">{{ item.seq }}</div>
            <h5 class="text-muted">이름</h5>
            <div class="mb-3">{{ item.userName }}</div>
            <h5 class="text-muted">마감일시</h5>
            <div class="mb-3">{{ item.expiryDate }}</div>
          </div>
          <button class="w-100 btn btn-lg btn-dark" type="button" @click="confirm">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
