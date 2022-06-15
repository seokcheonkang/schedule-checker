<script setup>
import { onMounted, inject } from 'vue';
import { useRoute } from 'vue-router';

// mixin
import { LOG } from '@/mixin/log.js';

// store
import { useLoginStore } from '@/store/login.js';

// store
const store = useLoginStore();

// env
const ENV_MODE = import.meta.env.MODE;

// route
const route = useRoute();

// google oauth
const Vue3GoogleOauth = inject('Vue3GoogleOauth');

onMounted(() => {
  LOG(ENV_MODE, route.name);
});

const handleClickSignIn = async () => {
  try {
    const googleUser = await Vue3GoogleOauth.instance.signIn();

    if (!googleUser) {
      return null;
    }

    const profile = {
      basicProfile: googleUser.getBasicProfile(),
      email: googleUser.getBasicProfile().getEmail(),
      id: googleUser.getBasicProfile().getId(),
      imageUrl: googleUser.getBasicProfile().getImageUrl(),
    };

    store.setIsLogin(true);
    store.setLoginInfo(profile);

    LOG(ENV_MODE, 'Profile', JSON.stringify(profile));
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
    store.setIsLogin(false);
    store.setLoginInfo({});
  } catch (error) {
    console.error(error);
  }
};

const handleClickDisconnect = () => {
  window.location.href = `https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=${window.location.href}`;
};
</script>

<template>
  <button
    class="router-link-active router-link-exact-active btn btn-outline-light"
    id="btnLogin"
    aria-current="page"
    @click="handleClickSignIn"
    v-if="Vue3GoogleOauth.isInit"
  >
    구글 로그인
  </button>
  <!-- 
  <div>
    <h1>IsInit: {{ Vue3GoogleOauth.isInit }}</h1>
    <h1>IsAuthorized: {{ Vue3GoogleOauth.isAuthorized }}</h1>
    <h2 v-if="user">signed user: {{ user }}</h2>
    <button @click="handleClickSignIn" :disabled="!Vue3GoogleOauth.isInit || Vue3GoogleOauth.isAuthorized">
      sign in
    </button>
    <button @click="handleClickGetAuthCode" :disabled="!Vue3GoogleOauth.isInit">get authCode</button>
    <button @click="handleClickSignOut" :disabled="!Vue3GoogleOauth.isAuthorized">sign out</button>
    <button @click="handleClickDisconnect" :disabled="!Vue3GoogleOauth.isAuthorized">disconnect</button>
  </div>
  -->
</template>
