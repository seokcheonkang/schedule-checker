<script setup>
import { onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import GoogleLogin from './GoogleLogin.vue';

// custom
import CustomPageHeader from '@/components/CustomPageHeader.vue';

// mixin
import { LOG, LOGD } from '@/mixin/log.js';

// store
import { useLoginStore } from '@/store/login.js';

// route
const route = useRoute();
const router = useRouter();

// store
const loginStore = useLoginStore();

watchEffect(() => {
  if (loginStore.isLogin) {
    router.push('/');
  }
});

onBeforeMount(() => {
  LOGD(route.name);
});

onMounted(() => {});
</script>

<template>
  <CustomPageHeader text="로그인" />
  <div class="container">
    <div class="row align-items-center py-1">
      <div class="col-md-10 mx-auto col-lg-10">
        <form class="p-4 p-md-4 border rounded-3 bg-light">
          <div v-if="!loginStore.isLogin">
            <GoogleLogin />
            <hr class="my-4" />
          </div>
          <div v-else>환영합니다. {{ loginStore.userInfo.name }}님.</div>
        </form>
      </div>
    </div>
  </div>
</template>
