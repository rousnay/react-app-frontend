export const initialLineCollection = {
  type: "FeatureCollection",
  features: [
    {
      id: "Initial_LineString_ID",
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: [
          [0, 0],
          [0, 0],
        ],
      },
    },
  ],
};

export const initialPointCollection = {
  type: "FeatureCollection",
  features: [
    {
      id: "Initial_Point_ID",
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [0, 0],
        type: "Point",
      },
    },
  ],
};

export const initialLineString = {
  id: "Initial_LineString_ID",
  type: "Feature",
  properties: {},
  geometry: {
    type: "LineString",
    coordinates: [
      [0, 0],
      [0, 0],
    ],
  },
};

export const initialFormValues = [
  {
    id: "",
    name: "",
    save: "not_saved",
  },
];
