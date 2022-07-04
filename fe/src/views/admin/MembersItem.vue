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

const confirm = (paramForParent) => {
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

const getUserInfo = async (user_email) => {
  const url = `${ENV_URL_BACKEND_MEMBER}/members/${user_email}`;
  const args = {};
  const header = {
    authorization: loginStore.accessToken,
  };

  const response = await API(CONSTANT.GET, url, args, header);

  if (response.code === MESSAGE.CODE_HTTP_STATUS_200) {
    state.userInfo.user_code = response.result.user_code;
    state.userInfo.user_email = response.result.user_email;
    state.userInfo.user_name = response.result.user_name;
    state.userInfo.grade = response.result.grade;
    state.userInfo.status = response.result.status;
    state.userInfo.regist_date = response.result.regist_date;
    state.userInfo.grade_val = response.result.grade_val;
    state.userInfo.status_val = response.result.status_val;
  } else {
    LOGD(response.code);
  }
};

onBeforeMount(() => {
  LOGD(route.name);
});

onMounted(() => {
  getUserInfo(route.params.user_email);
});
</script>

<template>
  <CustomPageHeader text="회원 상세" />
  <div class="container">
    <div class="row align-items-center my-3">
      <div class="col-md-10 mx-auto col-lg-10">
        <div class="p-4 p-md-4 border rounded-3 bg-light">
          <h4 class="mb-3">{{ state.userInfo.user_name }}</h4>
          <div class="form-floating mb-3">
            <h5 class="text-muted mb-3">
              <span>코드</span>
              <span>&nbsp;:&nbsp;</span>
              <span>{{ state.userInfo.user_code }}</span>
            </h5>
            <h5 class="text-muted mb-3">
              <span>이메일</span>
              <span>&nbsp;:&nbsp;</span>
              <span>{{ state.userInfo.user_email }}</span>
            </h5>
            <h5 class="text-muted mb-3">
              <span>이름</span>
              <span>&nbsp;:&nbsp;</span>
              <span>{{ state.userInfo.user_name }}</span>
            </h5>
            <h5 class="text-muted mb-3">
              <span>등급</span>
              <span>&nbsp;:&nbsp;</span>
              <span>
                <select class="form-select me-2 w-20 dpin" aria-label="searchOption" v-model="state.userInfo.grade">
                  <option :value="column.key" v-for="column in MemberGrade">
                    {{ column.val }}
                  </option>
                </select>
              </span>
            </h5>
            <h5 class="text-muted mb-3">
              <span>상태</span>
              <span>&nbsp;:&nbsp;</span>
              <span>
                <select class="form-select me-2 w-20 dpin" aria-label="searchOption" v-model="state.userInfo.status">
                  <option :value="column.key" v-for="column in MemberRegisterStatus">
                    {{ column.val }}
                  </option>
                </select>
              </span>
            </h5>
            <h5 class="text-muted mb-3">
              <span>가입일시</span>
              <span>&nbsp;:&nbsp;</span>
              <span>{{ state.userInfo.regist_date }}</span>
            </h5>
          </div>
          <CustomActionButton text="회원 수정" command="memberConfirm" @buttonClicked="confirm" />
        </div>
      </div>
    </div>
  </div>
</template>
