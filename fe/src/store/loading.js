import { defineStore } from 'pinia';

export const useLoadingStore = defineStore({
  id: 'loading',
  state: () => ({
    isLoading: false,
  }),
  getters: {
    getIsLoading: (state) => {
      return state.isLoading;
    },
  },
  actions: {
    setIsLoading(val) {
      this.isLoading = val;
    },
  },
});
