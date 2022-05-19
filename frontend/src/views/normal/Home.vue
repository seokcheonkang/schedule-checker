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
import mixin from '@/mixin.js';

const message = $ref({});

onBeforeMount(() => {
  console.log('onBeforeMount');
});
onMounted(async () => {
  console.log('onMounted');

  const data = await mixin.methods.$api(`${mixin.methods.$baseUrl()}/`, {}, 'get');
  message.userAgent = data.userAgent;
  message.hostname = data.hostname;
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
