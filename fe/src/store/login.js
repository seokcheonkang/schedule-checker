import { defineStore } from 'pinia';
import jwt_decode from 'jwt-decode';

export const useLoginStore = defineStore({
  id: 'login',
  state: () => ({
    isLogin: false,
    userInfo: null,
    grade: null,
    status: null,
    accessToken: null,
    refreshToken: null,
  }),
  getters: {
    getIsLogin: (state) => {
      return state.isLogin;
    },
    getUserInfo: (state) => {
      return state.userInfo;
    },
    getGrade: (state) => {
      return state.grade;
    },
    getStatus: (state) => {
      return state.status;
    },
    getAccessToken: (state) => {
      return state.accessToken;
    },
    getRefreshToken: (state) => {
      return state.refreshToken;
    },
  },
  actions: {
    setIsLogin(val) {
      this.isLogin = val;
    },
    setUserInfo(val) {
      this.userInfo = val;
    },
    setGrade(val) {
      this.grade = val;
    },
    setStatus(val) {
      this.status = val;
    },
    setAccessToken(val) {
      this.accessToken = val;
      // this.info = JSON.parse(JSON.stringify(jwt_decode(val)));
      // this.info = { ...jwt_decode(val) };
    },
    setRefreshToken(val) {
      this.refreshToken = val;
    },
  },
  persist: {
    enabled: true, // It keeps you logged in even after updating your web browser.
  },
});
