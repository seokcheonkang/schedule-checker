<script setup>
// custom
import CustomPageHeader from '@/components/CustomPageHeader.vue';

import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered,
} from 'vue';

// mixin
import API from '@/mixin/api.js';
import MESSAGE from '@/mixin/message';
import { LOGD, LOG } from '@/mixin/log.js';

// env
const ENV_MODE = import.meta.env.VITE_APP_ENV_MODE;
const ENV_BACKEND_URL = import.meta.env.VITE_APP_BASE_URL_BACKEND_HOME;

const msg = $ref({});

onBeforeMount(() => {
  // LOGD(ENV_MODE, 'onBeforeMount');
});
onMounted(async () => {
  LOGD(ENV_MODE, 'onMounted');

  const result = await API(`${ENV_BACKEND_URL}/`, {}, 'get');

  import.meta.env.DEV
    ? LOGD(ENV_MODE, result.resultCode, result.resultMessage)
    : LOG(ENV_MODE, result.resultCode, result.resultMessage);

  if (result.resultCode === MESSAGE.RESULT_CODE_ERR_NETWORK) {
    msg.userAgent = MESSAGE.RESULT_MESSAGE_ERR_NETWORK;
    msg.hostname = MESSAGE.RESULT_MESSAGE_ERR_NETWORK;
    return;
  }

  if (result.resultCode === MESSAGE.RESULT_CODE_SUCCESS) {
    msg.userAgent = result.data.userAgent;
    msg.hostname = result.data.hostname;
  }
});
onBeforeUpdate(() => {
  // LOGD(ENV_MODE, 'onBeforeUpdate');
});
onUpdated(() => {
  // LOGD(ENV_MODE, 'onUpdated');
});
onBeforeUnmount(() => {
  // LOGD(ENV_MODE, 'onBeforeUnmount');
});
onUnmounted(() => {
  // LOGD(ENV_MODE, 'onUnmounted');
});
onErrorCaptured(() => {
  // LOGD(ENV_MODE, 'onErrorCaptured');
});
onRenderTracked(() => {
  // LOGD(ENV_MODE, 'onRenderTracked');
});
onRenderTriggered(() => {
  // LOGD(ENV_MODE, 'onRenderTriggered');
});
</script>

<template>
  <CustomPageHeader text="홈" />
  <h5 class="">
    <span>User-Agent : </span>
    <span> {{ msg.userAgent }}</span>
  </h5>
  <h5 class="">
    <span>hostname : </span>
    <span>{{ msg.hostname }} </span>
  </h5>
</template>
