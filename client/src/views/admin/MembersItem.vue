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
  userEmail: 'yunbeom.kim@bespinglobal.com',
  userName: '김*범',
  userGrade: 98,
  registerDate: '2022-05-03 23:59:59',
  registerStatus: '승인',
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

<template>
  <CustomPageHeader text="회원 상세" />
  <div class="container">
    <div class="row align-items-center my-3">
      <div class="col-md-10 mx-auto col-lg-10">
        <div class="p-4 p-md-4 border rounded-3 bg-light">
          <h4 class="mb-3">{{ item.userName }}</h4>
          <div class="form-floating mb-3">
            <h5 class="text-muted">순번</h5>
            <div class="mb-3">{{ item.seq }}</div>
            <h5 class="text-muted">이메일</h5>
            <div class="mb-3">{{ item.userEmail }}</div>
            <h5 class="text-muted">이름</h5>
            <div class="mb-3">{{ item.userName }}</div>
            <h5 class="text-muted">회원등급</h5>
            <div class="mb-3">{{ item.userGrade }}</div>
            <h5 class="text-muted">가입일시</h5>
            <div class="mb-3">{{ item.registerDate }}</div>
            <h5 class="text-muted">가입상태</h5>
            <div class="mb-3">{{ item.registerStatus }}</div>
          </div>
          <CustomActionButton text="확인" command="memberConfirm" @buttonClicked="confirm" />
        </div>
      </div>
    </div>
  </div>
</template>
