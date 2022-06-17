<script setup>
import { onBeforeMount, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';

// custom
import CustomPageHeader from '@/components/CustomPageHeader.vue';

// mixin
import API from '@/mixin/api.js';
import MESSAGE from '@/mixin/message';
import CONSTANT from '@/mixin/constant';
import { LOG, LOGD } from '@/mixin/log.js';

// env
const ENV_URL_BACKEND_HOME = import.meta.env.VITE_APP_BASE_URL_BACKEND_HOME;

// route
const route = useRoute();

// state
const state = reactive({
  msg: {},
});

onBeforeMount(() => {
  LOGD(route.name);
});

onMounted(async () => {
  const url = `${ENV_URL_BACKEND_HOME}/`;
  const args = {};

  LOGD(CONSTANT.GET, url, JSON.stringify(args));

  const data = await API(CONSTANT.GET, url, args);

  if (data.code === MESSAGE.CODE_HTTP_STATUS_200) {
    LOGD(JSON.stringify(data));

    state.msg.userAgent = data.result.userAgent;
    state.msg.hostname = data.result.hostname;
  } else {
    state.msg.userAgent = MESSAGE.MESSAGE_HTTP_STATUS_500;
    state.msg.hostname = MESSAGE.MESSAGE_HTTP_STATUS_500;
  }
});
</script>

<template>
  <h5 class="mt-2" style="text-align: center">
    <img src="/assets/image/bespinglobal_logo_B.png" alt="베스핀글로벌" width="800" height="200" />
  </h5>
  <hr />
  <h5 class="">
    <span>User-Agent : </span>
    <span> {{ state.msg.userAgent }}</span>
  </h5>
  <h5 class="">
    <span>hostname : </span>
    <span>{{ state.msg.hostname }} </span>
  </h5>
</template>
