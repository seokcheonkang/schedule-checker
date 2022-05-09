<template>
  <CustomPageHeader text="회원 상세" />
  <div class="container">
    <div class="row align-items-center my-3">
      <div class="col-md-10 mx-auto col-lg-10">
        <div class="p-4 p-md-4 border rounded-3 bg-light">
          <h4 class="mb-3">{{ item.title }}</h4>
          <div class="form-floating mb-3">
            <h5 class="text-muted">순번</h5>
            <div class="mb-3">{{ seq }}</div>
            <h5 class="text-muted">이름</h5>
            <div class="mb-3">{{ item.userName }}</div>
            <h5 class="text-muted">이메일</h5>
            <div class="mb-3">{{ item.userEmail }}</div>
            <h5 class="text-muted">권한(키)</h5>
            <div class="mb-3">{{ item.auth }}</div>
            <h5 class="text-muted">권한</h5>
            <div class="mb-3">{{ item.authVal }}</div>
            <h5 class="text-muted">입력일시</h5>
            <div class="mb-3">{{ item.insDate }}</div>
          </div>
          <CustomActionButton text="확인" command="scheduleConfirm" @buttonClicked="confirm" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

// custom
import CustomPageHeader from '@/components/CustomPageHeader.vue';
import CustomActionButton from '@/components/CustomActionButton.vue';

// swal
import swal from 'sweetalert2';

// Server Data
const item = {
  seq: 2,
  userName: '김*범',
  userEmail: 'yunbeom.kim@bespinglobal.com',
  auth: 98,
  authValue: '운영자',
  insDate: '2022-05-03 23:59:59',
};

// route
const route = useRoute();
const seq = Number(route.params.seq); // 전달받은 파라미터

const confirm = (paramForParent) => {
  const { title, icon, text, footer } = paramForParent;

  swal.fire({
    icon,
    title,
    text,
    footer,
  });
};
</script>
