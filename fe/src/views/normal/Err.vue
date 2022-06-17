<script setup>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';

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

// custom
import CustomPageHeader from '@/components/CustomPageHeader.vue';

// mixin
import { LOG, LOGD } from '@/mixin/log.js';

// route
const route = useRoute();

onBeforeMount(() => {
  LOGD(route.name);
});
onMounted(() => {
  // LOGD('onMounted');
});
onBeforeUpdate(() => {
  // LOGD('onBeforeUpdate');
});
onUpdated(() => {
  // LOGD('onUpdated');
});
onBeforeUnmount(() => {
  // LOGD('onBeforeUnmount');
});
onUnmounted(() => {
  // LOGD('onUnmounted');
});
onErrorCaptured(() => {
  // LOGD('onErrorCaptured');
});
onRenderTracked(() => {
  // LOGD('onRenderTracked');
});
onRenderTriggered(() => {
  // LOGD('onRenderTriggered');
});
</script>

<template>
  <CustomPageHeader text="에러" />
  <h5 class="">
    <span>에러가 발생했습니다 : {{ route.name }}</span>
  </h5>
</template>
