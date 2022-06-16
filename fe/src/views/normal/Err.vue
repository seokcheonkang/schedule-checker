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
import { LOG } from '@/mixin/log.js';

// env
const ENV_MODE = import.meta.env.MODE;

// route
const route = useRoute();

// state
const state = reactive({
  msg: {},
});

onBeforeMount(() => {
  LOG(ENV_MODE, route.name);
});
onMounted(() => {
  // LOG(ENV_MODE, 'onMounted');
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
  <CustomPageHeader text="에러" />
  <h5 class="">
    <span>에러가 발생했습니다 : {{ route.name }}</span>
  </h5>
</template>
