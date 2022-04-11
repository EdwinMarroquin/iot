import { defineStore, acceptHMRUpdate } from "pinia";

export const useUnitsState = defineStore({
  id: "unitState",
  state: () => ({
    celcius: 1,
    formatDate: 1,
    formatTime: 1,
  }),
  getters: {
    getCelcius: () =>
      localStorage.celcius !== undefined
        ? localStorage.celcius
        : 0,
    getFormatDate: (state) => state.formatDate,
    getFormatTime: (state) => state.formatDate,
  },
  actions: {
    async setCelcius(c) {
      this.$state.celcius = !c ? 0 : 1;
      await localStorage.setItem("celcius", this.$state.celcius);
      // window.location.reload();
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUnitsState, import.meta.hot));
}
