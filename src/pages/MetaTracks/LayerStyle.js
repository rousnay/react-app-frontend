export const LayerStyle1 = {
  id: "route",
  type: "line",
  source: "route",
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
  paint: {
    "line-color": "#f73a6b",
    "line-width": 3,
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
  source: "route3",
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
