<script setup>
// library
import { onBeforeMount, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';

// mixin
import API from '@/mixin/api.js';
import MESSAGE from '@/mixin/message';
import CONSTANT from '@/mixin/constant';
import { LOG, LOGD } from '@/mixin/log.js';
import { LOGOUT } from '@/mixin/logout.js';

// store
import { useLoginStore } from '@/store/login.js';

// env
const ENV_URL_BACKEND_HOME = import.meta.env.VITE_APP_BASE_URL_BACKEND_HOME;

// route
const route = useRoute();

// store
const loginStore = useLoginStore();

// state
const state = reactive({
  msg: {},
});

const setAppVersion = () => {
  document.querySelector('title').innerText = `Schedule Checker ${__APP_VERSION__}`;
};

const getInfo = async () => {
  const url = `${ENV_URL_BACKEND_HOME}/`;
  const args = {};

  const response = await API(CONSTANT.GET, url, args);

  if (response.code === MESSAGE.CODE_HTTP_STATUS_200) {
    state.msg = response.result;
    state.msg.appVersion = __APP_VERSION__;
  } else if (response.code === MESSAGE.CODE_ERR_BAD_REQUEST || response.code === MESSAGE.CODE_HTTP_STATUS_419) {
    swal.fire({
      icon: 'error',
      title: '에러',
      text: MESSAGE.MESSAGE_HTTP_STATUS_419,
    });

    LOGOUT(router);
  } else {
    state.msg.userAgent = MESSAGE.MESSAGE_HTTP_STATUS_500;
    state.msg.hostname = MESSAGE.MESSAGE_HTTP_STATUS_500;
  }
};

onBeforeMount(() => {
  LOGD(route.name);
});

onMounted(() => {
  setAppVersion();
  getInfo();
});
</script>

<template>
  <h5 class="tac">
    <img src="/assets/image/bespinglobal_logo_B.png" alt="베스핀글로벌" width="300" height="60" />
  </h5>
  <hr />
  <h5 class="txt-red" v-if="loginStore.isLogin && loginStore.status !== '99'">
    <span>code : {{ loginStore.status }}, 당신의 계정은 사용 허가가 필요합니다. 관리자에게 문의하세요. </span>
  </h5>
  <h5 class="">
    <span>App Version : </span>
    <span> {{ state.msg.appVersion }}</span>
  </h5>
  <h5 class="">
    <span>User-Agent : </span>
    <span> {{ state.msg.userAgent }}</span>
  </h5>
  <h5 class="">
    <span>hostname : </span>
    <span>{{ state.msg.hostname }} </span>
  </h5>
  <hr />
  <h5 class="">
    <span>Link : <a href="https://bespinglobal.okta.com/" target="_blank">Okta</a> </span>
  </h5>
</template>
