import { defineStore, acceptHMRUpdate } from "pinia";

export const useLayersMapStore = defineStore({
  id: "layersMapStore",
  state: () => ({
    layername: "base",
  }),
  getters: {
    getLayerName: () => localStorage.layername ?? "base",
  },
  actions: {
    setLayerName(c) {
      this.layername = c;
      localStorage.setItem("layername", c);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLayersMapStore, import.meta.hot));
}
