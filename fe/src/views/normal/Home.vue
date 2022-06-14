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
import { LOG } from '@/mixin/log.js';

// env
const ENV_MODE = import.meta.env.MODE;
const ENV_BACKEND_URL = import.meta.env.VITE_APP_BASE_URL_BACKEND_HOME;

const msg = $ref({});

onBeforeMount(() => {
  // LOG(ENV_MODE, 'onBeforeMount');
});
onMounted(async () => {
  // LOG(ENV_MODE, 'onMounted');

  const url = `${ENV_BACKEND_URL}/`;
  const args = {};
  const method = 'get';

  LOG(ENV_MODE, url, JSON.stringify(args), method);

  const result = await API(url, args, method);

  if (result.data?.code === 200) {
    LOG(ENV_MODE, result);

    msg.userAgent = result.data.result.userAgent;
    msg.hostname = result.data.result.hostname;
  } else {
    msg.userAgent = MESSAGE.CODE_HTTP_STATUS_500;
    msg.hostname = MESSAGE.MESSAGE_HTTP_STATUS_500;
  }
});
onBeforeUpdate(() => {
  // LOG(ENV_MODE, 'onBeforeUpdate');
});
onUpdated(() => {
  // LOG(ENV_MODE, 'onUpdated');
});
onBeforeUnmount(() => {
  // LOG(ENV_MODE, 'onBeforeUnmount');
});
onUnmounted(() => {
  // LOG(ENV_MODE, 'onUnmounted');
});
onErrorCaptured(() => {
  // LOG(ENV_MODE, 'onErrorCaptured');
});
onRenderTracked(() => {
  // LOG(ENV_MODE, 'onRenderTracked');
});
onRenderTriggered(() => {
  // LOG(ENV_MODE, 'onRenderTriggered');
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
