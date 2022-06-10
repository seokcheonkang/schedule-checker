<script setup>
import { reactive } from 'vue';

// custom
import CustomPageHeader from '@/components/CustomPageHeader.vue';
import CustomActionButton from '@/components/CustomActionButton.vue';

// mixin
import $api from '@/mixin/api.js';
import { logDebug, log } from '@/mixin/log.js';

// jwt
import jwt_decode from 'jwt-decode';

// env
const backEndUrl = import.meta.env.VITE_APP_BASE_URL_BACKEND;

const state = reactive({
  form: {
    userEmail: '',
    userPassword: '',
  },
});

const login = async () => {
  const args = {
    userEmail: state.form.userEmail,
    userPassword: state.form.userPassword,
  };

  const tokens = await $api(`${backEndUrl}/members/login`, args, 'post');

  import.meta.env.DEV
    ? logDebug(tokens.resultCode, tokens.resultMessage)
    : log(tokens.resultCode, tokens.resultMessage);

  if (tokens.resultCode === 'A000') {
    const accessToken = tokens.data.accessToken;
    const accessTokenDecoded = jwt_decode(accessToken);
    logDebug(accessToken);
    logDebug(JSON.stringify(accessTokenDecoded));
  }
};
</script>

<template>
  <CustomPageHeader text="로그인" />
  <div class="container">
    <div class="row align-items-center py-1">
      <div class="col-md-10 mx-auto col-lg-10">
        <form class="p-4 p-md-4 border rounded-3 bg-light">
          <h4 class="mb-3">로그인</h4>
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="userEmail"
              placeholder="name@example.com"
              v-model="state.form.userEmail"
              autofocus="autofocus"
            />
            <label for="userEmail">이메일</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="password"
              class="form-control"
              id="userPassword"
              v-model="state.form.userPassword"
              placeholder="Password"
            />
            <label for="userPassword">비밀번호</label>
          </div>
          <CustomActionButton text="로그인" @click="login" />
          <hr class="my-4" />
          <div class="mb-1">
            <small class="text-muted"
              >아이디나 비밀번호를 잃어버리셨나요? <router-link to="/find" class="text-reset">찾기</router-link></small
            >
          </div>
          <div class="mb-1">
            <small class="text-muted"
              >계정이 없으신가요? <router-link to="/join" class="text-reset">가입</router-link></small
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
