import { defineStore, acceptHMRUpdate } from "pinia";

export const useUnitsStore = defineStore({
  id: "unitsStore",
  state: () => ({
    celcius: true,
    formatDate: 1,
    formatTime: 1,
  }),
  getters: {
    getCelcius: () =>
      localStorage.celcius !== undefined
        ? localStorage.celcius
        : true,
    getFormatDate: (state) => state.formatDate,
    getFormatTime: (state) => state.formatDate,
  },
  actions: {
    async setCelcius(c) {
      this.$state.celcius = !c;
      await localStorage.setItem("celcius", !c);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUnitsStore, import.meta.hot));
}
