// import type { FillLayer } from "react-map-gl";
// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/

export const LayerStyle1 = {
  id: "route",
  type: "line",
  source: "route",
  layout: {
    "line-join": "round",
    "line-cap": "round",
    // "symbol-placement": "line",
    // "text-field": "retwert", // part 2 of this is how to do it
    // "text-size": 16,
  },
  paint: {
    "line-color": "#f73a6b",
    "line-width": 5,
  },
};

export const LayerStyle2 = {
  id: "route2",
  type: "line",
  source: "route2",
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
  paint: {
    "line-color": "#0000ff",
    "line-width": 5,
  },
};

export const layerStyle3 = {
  id: "point",
  type: "circle",
  source: "route",
  layout: {
    // "line-join": "round",
    // "line-cap": "round",
    // "symbol-placement": "line",
    // "text-field": "{title}", // part 2 of this is how to do it
    // "text-size": 16,
  },

  paint: {
    "circle-radius": 3,
    "circle-color": "#007cbf",
  },
};
