// import type { FillLayer } from "react-map-gl";
// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/
export const LayerStyle2 = {
  id: "route2",
  type: "line",
  source: "route2",
  layout: {
    "line-join": "round",
    "line-cap": "round",
    // "symbol-placement": "line",
    // "text-field": "retwert", // part 2 of this is how to do it
    // "text-size": 16,
  },
  paint: {
    "line-color": "#0000ff",
    "line-width": 5,
  },
};
