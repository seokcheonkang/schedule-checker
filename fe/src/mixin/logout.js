// mixin
import { LOG, LOGD } from '@/mixin/log.js';

// store
import { useLoginStore } from '@/store/login.js';

const LOGOUT = (router) => {
  useLoginStore().$reset();

  LOGD('Logout');

  router.push('/');
};

export { LOGOUT };
