<script setup>
import { onBeforeMount, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// custom
import CustomPageHeader from '@/components/CustomPageHeader.vue';
import CustomActionButton from '@/components/CustomActionButton.vue';

import MemberGrade from '@/flag/memberGrade.json';
import MemberStatus from '@/flag/memberStatus.json';

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
const router = useRouter();

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

const goBack = () => {
  router.go(-1);
};

const updateMember = async () => {
  const user_email = state.userInfo.user_email;
  const grade = state.userInfo.grade;
  const status = state.userInfo.status;

  const url = `${ENV_URL_BACKEND_MEMBER}/members/${user_email}`;
  const args = { grade, status };
  const header = {
    authorization: loginStore.accessToken,
  };

  const response = await API(CONSTANT.PATCH, url, args, header);

  if (response.code === MESSAGE.CODE_HTTP_STATUS_201) {
    swal.fire({
      icon: 'info',
      title: '수정 완료',
      text: MESSAGE.MESSAGE_HTTP_STATUS_200,
    });

    router.go(-1);
  } else if (response.code === MESSAGE.CODE_ERR_BAD_REQUEST || response.code === MESSAGE.CODE_HTTP_STATUS_419) {
    swal.fire({
      icon: 'error',
      title: '에러',
      text: MESSAGE.MESSAGE_HTTP_STATUS_419,
    });
  } else {
    LOGD(response.code);
  }
};

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

        updateMember();
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
    state.userInfo = response.result;
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
  <CustomPageHeader text="회원 상세" option3="txt-admin" />
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
                  <option :value="column.key" v-for="column in MemberStatus">
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
          <hr />
          <CustomActionButton text="회원 수정" command="memberConfirm" option1="btn-admin" @buttonClicked="confirm" />
          <CustomActionButton text="목록" @click="goBack" />
        </div>
      </div>
    </div>
  </div>
</template>
