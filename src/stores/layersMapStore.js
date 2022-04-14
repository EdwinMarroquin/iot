import { defineStore, acceptHMRUpdate } from "pinia";
import layers from "@/data/mapLayers.js";
import leaflet from "leaflet";

const L = leaflet;


export const useLayersMapStore = defineStore({
  id: "layersMapStore",
  state: () => ({
    layername:"base",
    layerdata: {
      url: "",
      options: {},
    },
  }),
  getters: {
    getLayerMap: (state) => {
      var l;
      if (localStorage.layermap !== undefined) {
        l = localStorage.layermap;
      } else {
        l = state.layername;
      }
      state.layerdata.url = layers[l].url;
      state.layerdata.options = layers[l].options;
      return state.layerdata;
    },
  },
  actions: {
    async setLayerMap(c) {
      this.$state.layermap = !c;
      await localStorage.setItem("layermap", this.$state.layermap);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLayersMapStore, import.meta.hot));
}
