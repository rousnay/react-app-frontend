// import type { FillLayer } from "react-map-gl";
// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/
export const LayerStyle = {
  id: "route",
  type: "line",
  source: "route",
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
  paint: {
    "line-color": "#f73a6b",
    "line-width": 5,
  },
};
