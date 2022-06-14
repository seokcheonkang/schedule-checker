import { defineStore } from 'pinia';

export const useJwtStore = defineStore({
  id: 'jwt',
  state: () => ({
    accessToken: null,
    refreshToken: null,
  }),
  getters: {
    getAccessToken: (state) => {
      return state.accessToken;
    },
    getRefreshToken: (state) => {
      return state.refreshToken;
    },
  },
  actions: {
    setAccessToken(val) {
      this.accessToken = val;
    },
    setRefreshToken(val) {
      this.refreshToken = val;
    },
  },
  persist: {
    enabled: false, // It keeps you logged in even after updating your web browser.
  },
});
