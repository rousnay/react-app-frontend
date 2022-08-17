import React, { useState } from "react";
import Map, { Source, Layer } from "react-map-gl";
import { LayerStyle } from "./LayerStyle";
import { GeoData } from "./SampleGeoJSON";
import { Editor, DrawPolygonMode, DrawPointMode } from "@mapbox/mapbox-gl-draw";

import MapGL from "@urbica/react-map-gl";
import Draw from "@urbica/react-map-gl-draw";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiZmludXRzcyIsImEiOiJja3BvdjJwdWYwcHQ3Mm9udXo4M3Nod3YzIn0.OMVZjImaogKth_ApsJTlNg";

export default function ReactMapDraw() {
  console.log(LayerStyle);
  // const data =
  const [data, setData] = useState({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          coordinates: [-122.41411987304815, 37.792209769935084],
          type: "Point",
        },
      },
    ],
  });
  return (
    <>
      <MapGL
        style={{ width: "100%", height: "400px" }}
        mapStyle="mapbox://styles/mapbox/light-v9"
        accessToken={MAPBOX_TOKEN}
        latitude={37.78}
        longitude={-122.41}
        zoom={11}
      >
        <Draw data={data} onChange={(data) => setData(data)} />
      </MapGL>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
