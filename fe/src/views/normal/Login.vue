<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

import GoogleLogin from './GoogleLogin.vue';

// custom
import CustomPageHeader from '@/components/CustomPageHeader.vue';

// mixin
import { LOG } from '@/mixin/log.js';

// store
import { useLoginStore } from '@/store/login.js';

// env
const ENV_MODE = import.meta.env.MODE;

// route
const route = useRoute();

const loginStore = useLoginStore();

onMounted(() => {
  LOG(ENV_MODE, route.name);
});
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
          <div class="mb-1">
            <small class="text-muted"
              >아이디나 비밀번호를 잃어버리셨나요? <router-link to="/find" class="text-reset">찾기</router-link></small
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
