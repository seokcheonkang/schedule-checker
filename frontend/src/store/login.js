import { defineStore } from 'pinia';
import jwt_decode from 'jwt-decode';

export const useLoginStore = defineStore({
  id: 'login',
  state: () => ({
    isLogin: false,
    accessToken: null,
    loginInfo: null,
  }),
  getters: {
    getIsLogin: (state) => {
      return state.isLogin;
    },
    getAccessToken: (state) => {
      return state.accessToken;
    },
    getLoginInfo: (state) => {
      return state.loginInfo;
    },
  },
  actions: {
    setIsLogin(val) {
      this.isLogin = val;
    },
    setAccessToken(val) {
      this.accessToken = val;
      // this.loginInfo = JSON.parse(JSON.stringify(jwt_decode(val)));
      this.loginInfo = { ...jwt_decode(val) };
    },
  },
  persist: {
    enabled: true, // It keeps you logged in even after updating your web browser.
  },
});
