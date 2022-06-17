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
    seq: null,
    userName: null,
    userGrade: null,
    userGradeVal: null,
    registerDate: null,
    registerStatus: null,
    registerStatusVal: null,
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

const getUserInfo = async (email) => {
  const url = `${ENV_URL_BACKEND_MEMBER}/members/${email}`;
  const args = {};
  const header = {
    authorization: loginStore.accessToken,
  };

  LOGD(CONSTANT.REQ, CONSTANT.GET, url, JSON.stringify(args), JSON.stringify(header));
  const response = await API(CONSTANT.GET, url, args, header);
  LOGD(CONSTANT.RES, CONSTANT.GET, url, JSON.stringify(response));

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
  getUserInfo(route.params.userEmail);
});
</script>

<template>
  <CustomPageHeader text="회원 상세" />
  <div class="container">
    <div class="row align-items-center my-3">
      <div class="col-md-10 mx-auto col-lg-10">
        <div class="p-4 p-md-4 border rounded-3 bg-light">
          <h4 class="mb-3">{{ state.userInfo.userName }}</h4>
          <div class="form-floating mb-3">
            <h5 class="text-muted mb-3">
              <span>순번</span>
              <span>&nbsp;:&nbsp;</span>
              <span>{{ state.userInfo.seq }}</span>
            </h5>
            <h5 class="text-muted mb-3">
              <span>이메일</span>
              <span>&nbsp;:&nbsp;</span>
              <span>{{ state.userInfo.userEmail }}</span>
            </h5>
            <h5 class="text-muted mb-3">
              <span>이름</span>
              <span>&nbsp;:&nbsp;</span>
              <span>{{ state.userInfo.userName }}</span>
            </h5>
            <h5 class="text-muted mb-3">
              <span>회원등급</span>
              <span>&nbsp;:&nbsp;</span>
              <span>{{ state.userInfo.userGrade }}</span>
            </h5>
            <h5 class="text-muted mb-3">
              <span>회원등급(값)</span>
              <span>&nbsp;:&nbsp;</span>
              <span>
                <select class="form-select me-2 w-20 dpin" aria-label="searchOption" v-model="state.userInfo.userGrade">
                  <option :value="column.key" v-for="column in MemberGrade">
                    {{ column.val }}
                  </option>
                </select>
              </span>
            </h5>
            <h5 class="text-muted mb-3">
              <span>가입일시</span>
              <span>&nbsp;:&nbsp;</span>
              <span>{{ state.userInfo.registerDate }}</span>
            </h5>
            <h5 class="text-muted mb-3">
              <span>가입상태</span>
              <span>&nbsp;:&nbsp;</span>
              <span>{{ state.userInfo.registerStatus }}</span>
            </h5>
            <h5 class="text-muted mb-3">
              <span>가입상태(값)</span>
              <span>&nbsp;:&nbsp;</span>
              <span>
                <select
                  class="form-select me-2 w-20 dpin"
                  aria-label="searchOption"
                  v-model="state.userInfo.registerStatus"
                >
                  <option :value="column.key" v-for="column in MemberRegisterStatus">
                    {{ column.val }}
                  </option>
                </select>
              </span>
            </h5>
          </div>
          <CustomActionButton text="회원 수정" command="memberConfirm" @buttonClicked="confirm" />
        </div>
      </div>
    </div>
  </div>
</template>
