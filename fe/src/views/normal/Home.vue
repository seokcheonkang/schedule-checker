<script setup>
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
const ENV_BACKEND_URL = import.meta.env.VITE_APP_BASE_URL_BACKEND_HOME;

// route
const route = useRoute();

const msg = $ref({});

onBeforeMount(() => {
  // LOG(ENV_MODE, 'onBeforeMount');
});
onMounted(async () => {
  LOG(ENV_MODE, route.name);

  const url = `${ENV_BACKEND_URL}/`;
  const args = {};
  const method = 'get';

  LOG(ENV_MODE, url, JSON.stringify(args), method);

  const data = await API(url, args, method);

  if (data.code === 200) {
    LOG(ENV_MODE, JSON.stringify(data));

    msg.userAgent = data.result.userAgent;
    msg.hostname = data.result.hostname;
  } else {
    msg.userAgent = MESSAGE.MESSAGE_HTTP_STATUS_500;
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
