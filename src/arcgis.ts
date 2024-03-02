import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import esriConfig from "@arcgis/core/config";

esriConfig.apiKey = import.meta.env.VITE_ESRI_CONFIG_API_KEY;

export const map = new Map({
  basemap: "arcgis/topographic",
});

export const view = new MapView({
  map: map,
  center: [-118.805, 34.027],
  zoom: 13,
});
