<script setup>
// library
import { onBeforeMount, onMounted, inject } from 'vue';
import { useRoute } from 'vue-router';

// mixin
import API from '@/mixin/api.js';
import MESSAGE from '@/mixin/message';
import CONSTANT from '@/mixin/constant';
import { LOG, LOGD } from '@/mixin/log.js';

// store
import { useLoginStore } from '@/store/login.js';

// swal
import swal from 'sweetalert2';

// env
const ENV_URL_BACKEND_HOME = import.meta.env.VITE_APP_BASE_URL_BACKEND_HOME;
const ENV_URL_BACKEND_AUTH = import.meta.env.VITE_APP_BASE_URL_BACKEND_AUTH;

// route
const route = useRoute();

// store
const loginStore = useLoginStore();

// google oauth
const Vue3GoogleOauth = inject('Vue3GoogleOauth');

const isMember = async (user_email) => {
  const url = `${ENV_URL_BACKEND_HOME}/members/${user_email}`;
  const args = {};

  LOGD('url', url);

  const response = await API(CONSTANT.GET, url, args);

  return response;
};

const createMember = async (profile) => {
  const url = `${ENV_URL_BACKEND_HOME}/members`;
  const args = { user_code: profile.id, user_name: profile.name, user_email: profile.email };

  const response = await API(CONSTANT.POST, url, args);

  return response;
};

const createToken = async (user_email) => {
  const url = `${ENV_URL_BACKEND_AUTH}/auth/google/create`;
  const args = { user_email };

  const response = await API(CONSTANT.POST, url, args);

  return response;
};

const verifyToken = async (responseCreateToken) => {
  const authorization = CONSTANT.BEARER + responseCreateToken.result.accessToken;

  const url = `${ENV_URL_BACKEND_AUTH}/auth/google/verify`;
  const args = {};
  const header = { authorization };

  const response = await API(CONSTANT.POST, url, args, header);

  if (response.code === MESSAGE.CODE_HTTP_STATUS_200) {
    loginStore.setAccessToken(authorization);
    loginStore.setRefreshToken(responseCreateToken.result.refreshToken);
    loginStore.setGrade(response.result.grade);
    loginStore.setStatus(response.result.status);
  } else if (response.code === MESSAGE.CODE_ERR_BAD_REQUEST || response.code === MESSAGE.CODE_HTTP_STATUS_419) {
    swal.fire({
      icon: 'error',
      title: '에러',
      text: MESSAGE.MESSAGE_HTTP_STATUS_419,
    });
  }
};

const handleClickSignIn = async () => {
  try {
    const googleUser = await Vue3GoogleOauth.instance.signIn();

    if (!googleUser) {
      return null;
    }

    const profile = {
      // access_token: googleUser.getAuthResponse().access_token,
      id: googleUser.getBasicProfile().getId(),
      name: googleUser.getBasicProfile().getName(),
      email: googleUser.getBasicProfile().getEmail(),
      image: googleUser.getBasicProfile().getImageUrl(),
    };

    const responseIsMember = await isMember(profile.email);
    if (responseIsMember.code !== MESSAGE.CODE_HTTP_STATUS_200) {
      await createMember(profile);
    }

    const responseCreateToken = await createToken(profile.email);
    await verifyToken(responseCreateToken);

    const processAfterToken = async () => {
      loginStore.setIsLogin(true);
      loginStore.setUserInfo(profile);
    };

    await processAfterToken();
  } catch (error) {
    //on fail do something
    LOGD('error', JSON.stringify(error));
    return null;
  }
};

const handleClickGetAuthCode = async () => {
  try {
    const authCode = await Vue3GoogleOauth.instance.getAuthCode();
  } catch (error) {
    //on fail do something
    console.error(error);
    return null;
  }
};

const handleClickSignOut = async () => {
  try {
    await Vue3GoogleOauth.instance.signOut();
    loginStore.setIsLogin(false);
    loginStore.setUserInfo({});
  } catch (error) {
    console.error(error);
  }
};

const handleClickDisconnect = () => {
  window.location.href = `https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=${window.location.href}`;
};

onBeforeMount(() => {});

onMounted(() => {});
</script>

<template>
  <div class="google-area-wrapper">
    <div class="google-btn" @click="handleClickSignIn" v-if="Vue3GoogleOauth.isInit">
      <div class="google-icon-wrapper">
        <img class="google-icon" src="/assets/image/google-logo.svg" />
      </div>
      <p class="btn-text">
        <b>구글로 계속하기</b>
      </p>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../../public/assets/css/google-logo.scss';
</style>
