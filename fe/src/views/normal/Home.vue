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
import API from '@/mixin/api.js';
import MESSAGE from '@/mixin/message';
import { LOG } from '@/mixin/log.js';

// env
const ENV_MODE = import.meta.env.MODE;
const ENV_URL_BACKEND_HOME = import.meta.env.VITE_APP_BASE_URL_BACKEND_HOME;

// route
const route = useRoute();

// state
const state = reactive({
  msg: {},
});

onBeforeMount(() => {
  // LOG(ENV_MODE, 'onBeforeMount');
});
onMounted(async () => {
  LOG(ENV_MODE, route.name);

  const url = `${ENV_URL_BACKEND_HOME}/`;
  const args = {};
  const method = 'get';

  LOG(ENV_MODE, url, JSON.stringify(args), method);

  const data = await API(url, args, method);

  if (data.code === 200) {
    LOG(ENV_MODE, JSON.stringify(data));

    state.msg.userAgent = data.result.userAgent;
    state.msg.hostname = data.result.hostname;
  } else {
    state.msg.userAgent = MESSAGE.MESSAGE_HTTP_STATUS_500;
    state.msg.hostname = MESSAGE.MESSAGE_HTTP_STATUS_500;
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
    <span> {{ state.msg.userAgent }}</span>
  </h5>
  <h5 class="">
    <span>hostname : </span>
    <span>{{ state.msg.hostname }} </span>
  </h5>
</template>
