// mixin
import { LOG, LOGD } from '@/mixin/log.js';

// store
import { useLoginStore } from '@/store/login.js';

const LOGOUT = (router) => {
  const loginStore = useLoginStore?._pinia?.state?._value?.login;

  loginStore.isLogin = false;
  loginStore.loginInfo = null;
  loginStore.role = null;
  loginStore.accessToken = null;
  loginStore.refreshToken = null;

  LOGD('Logout');

  router.push('/');
};

export { LOGOUT };
