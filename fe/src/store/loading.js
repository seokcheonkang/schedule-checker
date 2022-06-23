import { defineStore } from 'pinia';

export const useLoadingStore = defineStore({
  id: 'loading',
  state: () => ({
    loading: false,
  }),
  getters: {
    getIsLoading: (state) => {
      return state.loading;
    },
  },
  actions: {
    setIsLoading(val) {
      this.loading = val;
    },
  },
});
