import { defineStore, acceptHMRUpdate } from "pinia";
import layers from "@/data/mapLayers.js";

export const useLayersMapStore = defineStore({
  id: "layersMapStore",
  state: () => ({
    layername: "base",
    layerdata: {
      url: "",
      options: {},
    },
  }),
  getters: {
    getLayername: (state) =>
      localStorage.layername !== undefined
        ? localStorage.layername
        : state.layername,

    getLayerMap: (state) => {
      let l;
      if (
        localStorage.layername !== undefined &&
        localStorage.layername !== false
      ) {
        l = localStorage.layername;
      } else {
        localStorage.layername = state.layername;
        l = localStorage.layername;
      }

      state.layerdata.url = layers[l].url;
      state.layerdata.options = layers[l].options;
      return state.layerdata;
    },
  },

  actions: {
    async setLayerMap(c) {
      this.$state.layername = c;
      await localStorage.setItem("layername", this.$state.layername);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLayersMapStore, import.meta.hot));
}
