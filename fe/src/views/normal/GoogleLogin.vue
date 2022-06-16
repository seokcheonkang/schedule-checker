<script setup>
import { onMounted, inject } from 'vue';

// mixin
import API from '@/mixin/api.js';
import CONSTANT from '@/mixin/constant';
import { LOG } from '@/mixin/log.js';

// store
import { useLoginStore } from '@/store/login.js';

// store
const loginStore = useLoginStore();

// env
const ENV_MODE = import.meta.env.MODE;
const ENV_URL_BACKEND_AUTH = import.meta.env.VITE_APP_BASE_URL_BACKEND_AUTH;

// google oauth
const Vue3GoogleOauth = inject('Vue3GoogleOauth');

const handleClickSignIn = async () => {
  try {
    const googleUser = await Vue3GoogleOauth.instance.signIn();

    if (!googleUser) {
      return null;
    }

    const profile = {
      // access_token: googleUser.getAuthResponse().access_token,
      email: googleUser.getBasicProfile().getEmail(),
      id: googleUser.getBasicProfile().getId(),
      imageUrl: googleUser.getBasicProfile().getImageUrl(),
    };

    loginStore.setIsLogin(true);
    loginStore.setLoginInfo(profile);

    const setAccessTokenByServer = async () => {
      const urlCreate = `${ENV_URL_BACKEND_AUTH}/auth/google/create`;
      const argsCreate = { userEmail: profile.email };
      const methodCreate = 'post';

      LOG(ENV_MODE, CONSTANT.REQ, methodCreate, urlCreate, JSON.stringify(argsCreate));
      const responseCreate = await API(methodCreate, urlCreate, argsCreate);
      LOG(ENV_MODE, CONSTANT.RES, methodCreate, urlCreate, JSON.stringify(responseCreate));

      // ---

      const authorization = CONSTANT.BEARER + responseCreate.result.accessToken;

      const urlVerify = `${ENV_URL_BACKEND_AUTH}/auth/google/verify`;
      const argsVerify = {};
      const methodVerify = 'post';
      const headerVerify = { authorization };

      LOG(ENV_MODE, CONSTANT.REQ, methodVerify, urlVerify, JSON.stringify(argsVerify));
      const responseVerify = await API(methodVerify, urlVerify, argsVerify, headerVerify);
      LOG(ENV_MODE, CONSTANT.RES, methodVerify, urlVerify, JSON.stringify(responseVerify));

      if (responseVerify.code === 200) {
        loginStore.setAccessToken(authorization);
        loginStore.setRefreshToken(responseCreate.result.refreshToken);
        loginStore.setRole(responseVerify.result.userGrade);
      }
    };

    await setAccessTokenByServer();
  } catch (error) {
    //on fail do something
    console.error(error);
    return null;
  }
};

const handleClickGetAuthCode = async () => {
  try {
    const authCode = await Vue3GoogleOauth.instance.getAuthCode();
    console.log('handleClickGetAuthCode authCode', authCode);
  } catch (error) {
    //on fail do something
    console.error(error);
    return null;
  }
};

const handleClickSignOut = async () => {
  try {
    await Vue3GoogleOauth.instance.signOut();
    console.log('handleClickSignOut isAuthorized', Vue3GoogleOauth.isAuthorized);
    loginStore.setIsLogin(false);
    loginStore.setLoginInfo({});
  } catch (error) {
    console.error(error);
  }
};

const handleClickDisconnect = () => {
  window.location.href = `https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=${window.location.href}`;
};

onMounted(() => {
  LOG(ENV_MODE, 'GoogleLogin');
});
</script>

<template>
  <div class="google-btn" @click="handleClickSignIn" v-if="Vue3GoogleOauth.isInit">
    <div class="google-icon-wrapper">
      <img class="google-icon" src="/assets/image/google-logo.svg" />
    </div>
    <p class="btn-text">
      <b>구글로 계속하기</b>
    </p>
  </div>
</template>

<style lang="scss">
@import '../../../public/assets/css/google-logo.scss';
</style>
