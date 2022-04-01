import { defineStore, acceptHMRUpdate } from "pinia";

export const useAppState = defineStore({
  id: "appState",
  state: () => ({
    load: false,
    count: 0,
  }),
  getters: {
    getLoad: (state) => state.load,
    getCount: (state) => state.count,
  },
  actions: {
    async setLoad(l) {
      this.load = l;
      console.log(this.load, l);
    },
    async incrementCount() {
      await this.count++;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppState, import.meta.hot));
}
