<script setup>
import { onBeforeMount, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';

// custom
import CustomPageHeader from '@/components/CustomPageHeader.vue';
import CustomActionButton from '@/components/CustomActionButton.vue';

import MemberGrade from '@/sampleData/memberGrade.json';
import MemberRegisterStatus from '@/sampleData/MemberRegisterStatus.json';

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
    user_code: null,
    user_email: null,
    user_name: null,
    grade: null,
    status: null,
    regist_date: null,
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
    state.userInfo.user_code = response.result.user_code;
    state.userInfo.user_email = response.result.user_email; // TODO
    state.userInfo.user_name = response.result.user_name;
    state.userInfo.status = response.result.status;
    state.userInfo.grade = response.result.grade;
    state.userInfo.regist_date = response.result.regist_date;
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
            <div class="mb-3">{{ state.userInfo.user_name }}</div>
            <h5 class="text-muted">이메일</h5>
            <div class="mb-3">{{ state.userInfo.user_email }}</div>
            <h5 class="text-muted">권한</h5>
            <div class="mb-3">
              <select class="bg-light w-30 select-border-none" v-model="state.userInfo.grade" disabled>
                <option :value="column.key" v-for="column in MemberGrade">
                  {{ column.val }}
                </option>
              </select>
            </div>
            <h5 class="text-muted">상태</h5>
            <div class="mb-3">
              <select class="bg-light w-30 select-border-none" v-model="state.userInfo.status" disabled>
                <option :value="column.key" v-for="column in MemberRegisterStatus">
                  {{ column.val }}
                </option>
              </select>
            </div>
            <h5 class="text-muted">가입일시</h5>
            <div class="mb-3">{{ state.userInfo.regist_date }}</div>
          </div>
          <CustomActionButton text="회원 탈퇴" command="memberLeave" option1="btn-danger" @buttonClicked="leave" />
        </div>
      </div>
    </div>
  </div>
</template>
