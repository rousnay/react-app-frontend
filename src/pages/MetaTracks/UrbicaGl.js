import React, { useState, useEffect } from "react";
// import Map, { useControl, Source, Layer } from "react-map-gl";
import MapGL, { Source, Layer } from "@urbica/react-map-gl";
import Draw from "@urbica/react-map-gl-draw";

import { LayerStyle1, layerStyle3 } from "./LayerStyle";
import { GeoData } from "./SampleGeoJSON";

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiZmludXRzcyIsImEiOiJja3BvdjJwdWYwcHQ3Mm9udXo4M3Nod3YzIn0.OMVZjImaogKth_ApsJTlNg";

// const dataX = {
//   type: "Feature",
//   geometry: {
//     type: "LineString",
//     coordinates: [
//       [-122.48369693756104, 37.83381888486939],
//       [-122.48348236083984, 37.83317489144141],
//       [-122.48339653015138, 37.83270036637107],
//       [-122.48356819152832, 37.832056363179625],
//       [-122.48404026031496, 37.83114119107971],
//       [-122.48404026031496, 37.83049717427869],
//       [-122.48348236083984, 37.829920943955045],
//       [-122.48356819152832, 37.82954808664175],
//       [-122.48507022857666, 37.82944639795659],
//       [-122.48610019683838, 37.82880236636284],
//       [-122.48695850372314, 37.82931081282506],
//       [-122.48700141906738, 37.83080223556934],
//       [-122.48751640319824, 37.83168351665737],
//       [-122.48803138732912, 37.832158048267786],
//       [-122.48888969421387, 37.83297152392784],
//       [-122.48987674713133, 37.83263257682617],
//       [-122.49043464660643, 37.832937629287755],
//       [-122.49125003814696, 37.832429207817725],
//       [-122.49163627624512, 37.832564787218985],
//       [-122.49223709106445, 37.83337825839438],
//       [-122.49378204345702, 37.83368330777276],
//     ],
//   },
// };

export default function UrbicaGl() {
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

  const [position, setPosition] = useState("top-left");
  const [mode, setMode] = useState("simple_select");

  useEffect(() => {
    localStorage.setItem("layers", JSON.stringify(data));
    console.log(data);
  }, [data]);

  //   useEffect(() => {
  //     localStorage.setItem("layers", JSON.stringify(state.layers));
  //     console.log(state.layers);
  //   }, [state.layers]);

  //   const [viewport, setViewport] = useState({
  //     latitude: 37.830348,
  //     longitude: -122.486052,
  //     zoom: 15,
  //   });

  return (
    <>
      <div>Mode: {mode}</div>
      <div>
        <button onClick={() => setMode("simple_select")}>simple_select</button>
        <button onClick={() => setMode("draw_line_string")}>
          draw_line_string
        </button>
        <button onClick={() => setMode("draw_polygon")}>draw_polygon</button>
        <button onClick={() => setMode("draw_point")}>draw_point</button>
      </div>

      <select onChange={(e) => setPosition(e.target.value)}>
        <option value="top-left">top-left</option>
        <option value="top-right">top-right</option>
      </select>

      <MapGL
        style={{ width: "100%", height: "400px" }}
        mapStyle="mapbox://styles/mapbox/light-v9"
        accessToken={MAPBOX_ACCESS_TOKEN}
        latitude={37.503365}
        longitude={127.075062}
        zoom={13}
      >
        <Source id="route" type="geojson" data={GeoData} />
        <Layer {...LayerStyle1} />
        <Layer {...layerStyle3} />
        <Draw
          displayControlsDefault={false}
          controls={{
            point: true,
            trash: true,
          }}
          mode={mode}
          onDrawModeChange={({ mode }) => setMode(mode)}
          data={data}
          onChange={(data) => setData(data)}
          position={position}
        />
      </MapGL>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
