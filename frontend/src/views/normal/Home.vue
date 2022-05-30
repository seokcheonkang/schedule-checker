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
import $api from '@/mixin/api.js';
import { logDebug, log } from '@/mixin/log.js';

// env
const backEndUrl = import.meta.env.VITE_APP_BASE_URL_BACKEND;

const message = $ref({});

onBeforeMount(() => {
  console.log('onBeforeMount');
});
onMounted(async () => {
  console.log('onMounted');

  const result = await $api(`${backEndUrl}/`, {}, 'get');

  import.meta.env.DEV
    ? logDebug(result.resultCode, result.resultMessage)
    : log(result.resultCode, result.resultMessage);

  if (result.resultCode === 'ERR_NETWORK') {
    message.userAgent = '서버와 연결되지 않았습니다.';
    message.hostname = '서버와 연결되지 않았습니다.';
    return;
  }

  if (result.resultCode === 'A000') {
    message.userAgent = result.data.userAgent;
    message.hostname = result.data.hostname;
  }
});
onBeforeUpdate(() => {
  console.log('onBeforeUpdate');
});
onUpdated(() => {
  console.log('onUpdated');
});
onBeforeUnmount(() => {
  console.log('onBeforeUnmount');
});
onUnmounted(() => {
  console.log('onUnmounted');
});
onErrorCaptured(() => {
  console.log('onErrorCaptured');
});
onRenderTracked(() => {
  console.log('onRenderTracked');
});
onRenderTriggered(() => {
  console.log('onRenderTriggered');
});
</script>

<template>
  <CustomPageHeader text="홈" />
  <h5 class="">
    <span>User-Agent : </span>
    <span> {{ message.userAgent }}</span>
  </h5>
  <h5 class="">
    <span>hostname : </span>
    <span>{{ message.hostname }} </span>
  </h5>
</template>
