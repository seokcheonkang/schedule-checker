<script setup>
import { onBeforeMount, onMounted, inject } from 'vue';
import { useRoute } from 'vue-router';

// mixin
import API from '@/mixin/api.js';
import MESSAGE from '@/mixin/message';
import CONSTANT from '@/mixin/constant';
import { LOG, LOGD } from '@/mixin/log.js';

// store
import { useLoginStore } from '@/store/login.js';
import router from '../../router';

// swal
import swal from 'sweetalert2';

// env
const ENV_URL_BACKEND_AUTH = import.meta.env.VITE_APP_BASE_URL_BACKEND_AUTH;

// route
const route = useRoute();

// store
const loginStore = useLoginStore();

// google oauth
const Vue3GoogleOauth = inject('Vue3GoogleOauth');

const createToken = async (userEmail) => {
  const urlCreate = `${ENV_URL_BACKEND_AUTH}/auth/google/create`;
  const argsCreate = { userEmail };

  const responseCreate = await API(CONSTANT.POST, urlCreate, argsCreate);

  return responseCreate;
};

const verifyToken = async (responseCreateToken) => {
  const authorization = CONSTANT.BEARER + responseCreateToken.result.accessToken;

  const urlVerify = `${ENV_URL_BACKEND_AUTH}/auth/google/verify`;
  const argsVerify = {};
  const headerVerify = { authorization };

  const responseVerify = await API(CONSTANT.POST, urlVerify, argsVerify, headerVerify);

  if (responseVerify.code === MESSAGE.CODE_HTTP_STATUS_200) {
    loginStore.setAccessToken(authorization);
    loginStore.setRefreshToken(responseCreateToken.result.refreshToken);
    loginStore.setRole(responseVerify.result.userGrade);

    router.push('/');
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
      email: googleUser.getBasicProfile().getEmail(),
      id: googleUser.getBasicProfile().getId(),
      imageUrl: googleUser.getBasicProfile().getImageUrl(),
    };

    loginStore.setIsLogin(true);
    loginStore.setLoginInfo(profile);

    const responseCreateToken = await createToken(profile.email);
    await verifyToken(responseCreateToken);
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
