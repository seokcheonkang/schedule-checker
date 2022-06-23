<script setup>
import { onBeforeMount, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';

// custom
import CustomPageHeader from '@/components/CustomPageHeader.vue';
import CustomActionButton from '@/components/CustomActionButton.vue';

// mixin
import API from '@/mixin/api.js';
import MESSAGE from '@/mixin/message';
import CONSTANT from '@/mixin/constant';
import { LOG, LOGD } from '@/mixin/log.js';

// store
import { useLoginStore } from '@/store/login.js';

// swal
import swal from 'sweetalert2';

// env
const ENV_URL_BACKEND_MEMBER = import.meta.env.VITE_APP_BASE_URL_BACKEND_MEMBER;

// route
const route = useRoute();

// store
const loginStore = useLoginStore();

// state
const state = reactive({
  userInfo: {
    seq: null,
    userName: null,
    userGrade: null,
    userGradeVal: null,
    registerDate: null,
    registerStatus: null,
    registerStatusVal: null,
  },
});

const leave = (paramForParent) => {
  const { title, showDenyButton, confirmButtonText, denyButtonText, resultMessageY, resultMessageN } = paramForParent;

  swal
    .fire({
      title,
      showDenyButton,
      confirmButtonText,
      denyButtonText,
    })
    .then((result) => {
      let resultMessage = resultMessageN;
      let confirmText = 'info';

      if (result.isConfirmed) {
        resultMessage = resultMessageY;
        confirmText = 'success';
      }

      swal.fire(resultMessage, '', confirmText);
    });
};

const getUserInfo = async () => {
  const {
    loginInfo: { email },
  } = loginStore;

  const url = `${ENV_URL_BACKEND_MEMBER}/members/${email}`;
  const args = {};
  const header = {
    authorization: loginStore.accessToken,
  };

  const response = await API(CONSTANT.GET, url, args, header);

  if (response.code === MESSAGE.CODE_HTTP_STATUS_200) {
    state.userInfo.seq = response.result.seq;
    state.userInfo.userEmail = response.result.userEmail;
    state.userInfo.userName = response.result.userName;
    state.userInfo.userGrade = response.result.userGrade;
    state.userInfo.userGradeVal = response.result.userGradeVal;
    state.userInfo.registerDate = response.result.registerDate;
    state.userInfo.registerStatus = response.result.registerStatus;
    state.userInfo.registerStatusVal = response.result.registerStatusVal;
  } else {
    LOGD(response.code);
  }
};

onBeforeMount(() => {
  LOGD(route.name);
});

onMounted(() => {
  getUserInfo();
});
</script>

<template>
  <CustomPageHeader text="프로필" />
  <div class="container">
    <div class="row align-items-center py-1">
      <div class="col-md-10 mx-auto col-lg-10">
        <div class="p-4 p-md-4 border rounded-3 bg-light">
          <h4 class="mb-3">프로필</h4>
          <div class="form-floating mb-3">
            <h5 class="text-muted">이름</h5>
            <div class="mb-3">{{ state.userInfo.userName }}</div>
            <h5 class="text-muted">이메일</h5>
            <div class="mb-3">{{ state.userInfo.userEmail }}</div>
            <h5 class="text-muted">가입일시</h5>
            <div class="mb-3">{{ state.userInfo.registerDate }}</div>
            <h5 class="text-muted">권한</h5>
            <div class="mb-3">{{ state.userInfo.userGradeVal }}</div>
            <h5 class="text-muted">상태</h5>
            <div class="mb-3">{{ state.userInfo.registerStatusVal }}</div>
          </div>
          <CustomActionButton text="회원 탈퇴" command="memberLeave" option1="btn-danger" @buttonClicked="leave" />
        </div>
      </div>
    </div>
  </div>
</template>
