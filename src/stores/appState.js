import { defineStore, acceptHMRUpdate } from "pinia";

export const useAppState = defineStore({
  id: "appState",
  state: () => ({
    loading: "false",
    count: 0,
    counter: 0,
  }),
  getters: {
    getLoading: (state) => state.loading,
    getCount: (state) => state.count,
    getCounter: (state) => state.counter,
  },
  actions: {
    async setLoading(l) {
      this.$state.loading = l;
    },
    async incrementCount() {
      await this.count++;
    },
    async updateStatus() {
      await this.counter++;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppState, import.meta.hot));
}
