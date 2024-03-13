import Map from "@arcgis/core/Map";
import esriConfig from "@arcgis/core/config";
import Credential from "@arcgis/core/identity/Credential";
import esriId from "@arcgis/core/identity/IdentityManager";
import OAuthInfo from "@arcgis/core/identity/OAuthInfo";
import Portal from "@arcgis/core/portal/Portal";
import MapView from "@arcgis/core/views/MapView";

esriConfig.apiKey = import.meta.env.VITE_ESRI_CONFIG_API_KEY;

export const info = new OAuthInfo({
  appId: import.meta.env.VITE_APP_ID,
  portalUrl: import.meta.env.VITE_PORTAL_URL,
});
esriId.registerOAuthInfos([info]);

export const portal = new Portal();

export const map = new Map({
  basemap: "arcgis/topographic",
});

export const view = new MapView({
  map: map,
  center: [-118.805, 34.027],
  zoom: 13,
});

view.ui.move("zoom", "bottom-right");

export const arcgisUser = {
  credential: new Credential(),
  fetchCredential: async () => {
    try {
      arcgisUser.credential = await esriId.checkSignInStatus(
        info.portalUrl + "/sharing",
      );
    } catch (error) {
      console.error(error);
      arcgisUser.credential = await esriId.getCredential(
        info.portalUrl + "/sharing",
      );
    }
  },
};
