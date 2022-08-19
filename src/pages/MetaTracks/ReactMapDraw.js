import React, { useState, useEffect } from "react";
// import map from "mapbox-gl";
import MapGL, { Source, Layer, Marker } from "@urbica/react-map-gl";
import Draw from "@urbica/react-map-gl-draw";
import PinPoint from "./PinPoint";
import PinInfo from "./PinInfo";

import { LayerStyle } from "./LayerStyle";
import { LayerStyle2 } from "./LayerStyle2";
import { GeoData } from "./SampleGeoJSON";
import { GeoData2 } from "./SampleGeoJSON2";

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

import "mapbox-gl/dist/mapbox-gl.css";

import "./style.css";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiZmludXRzcyIsImEiOiJja3BvdjJwdWYwcHQ3Mm9udXo4M3Nod3YzIn0.OMVZjImaogKth_ApsJTlNg";

const style = {
  padding: "10px",
  color: "#fff",
  cursor: "pointer",
  background: "#1978c8",
  borderRadius: "6px",
};

const localData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        title: "aaaaaa",
      },
      geometry: {
        coordinates: [127.0724674540391, 37.50263022192452],
        type: "Point",
      },
    },
  ],
};
const getLocalData = JSON.parse(localStorage.getItem("layers")) || localData;

const GeoCoordinatesLocal = getLocalData.features.map(
  (features, i) => features.geometry.coordinates
);

console.log(GeoCoordinatesLocal);

const GeoCoordinates = GeoData.features[0].geometry.coordinates;
const GeoCoordinates2 = GeoData2.features[0].geometry.coordinates;

console.log(GeoCoordinates);
console.log(GeoCoordinates2);

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

const layerStyle1 = {
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

export default function ReactMapDraw() {
  // const [data, setData] = useState({
  //   type: "FeatureCollection",
  //   features: [
  //     {
  //       type: "Feature",
  //       properties: {
  //         title: "aaaaaa",
  //       },
  //       geometry: {
  //         coordinates: [127.075062, 37.503365],
  //         type: "Point",
  //       },
  //     },
  //   ],
  // });

  const [data, setData] = useState(getLocalData);
  // const [position, setPosition] = useState("top-right");

  const [position, setPosition] = useState({
    longitude: 127.075062,
    latitude: 37.509365,
  });

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

  // const onMarkerClick = (event) => {
  //   alert("You clicked on marker");
  //   event.stopPropagation();
  // };
  const onDragEnd = (lngLat) => {
    setPosition({ longitude: lngLat.lng, latitude: lngLat.lat });
  };
  const onMapClick = (event) => {
    setPosition({ longitude: event.lngLat.lng, latitude: event.lngLat.lat });
  };

  // const _renderCityMarker = (lngLat, index) => {
  //   return (
  //     <Marker
  //       key={`marker-${index}`}
  //       longitude={lngLat[index][0]}
  //       latitude={lngLat[index][0]}
  //     >
  //       <PinPoint
  //         ids={index + 1}
  //         // size={20}
  //         // onClick={() => this.setState({ popupInfo: city })}
  //       />
  //     </Marker>
  //   );
  // };

  const pointMarker = GeoCoordinates.map((lngLat, index) => (
    <Marker key={index} longitude={lngLat[0]} latitude={lngLat[1]}>
      <PinPoint ids={index + 1} />
    </Marker>
  ));
  const GeoCoordinatesNew = data.features[0].geometry.coordinates;

  const pointMarkerNew = GeoCoordinates2.map((lngLat, index) => (
    <Marker key={index} longitude={lngLat[0]} latitude={lngLat[1]}>
      <PinPoint ids={index + 1} />
    </Marker>
  ));

  const pointMarkerLocal = GeoCoordinatesLocal.map((lngLat, index) => (
    <Marker key={index} longitude={lngLat[0]} latitude={lngLat[1]}>
      <PinPoint ids={index + 1} />
    </Marker>
  ));

  return (
    <>
      <div>Mode: {mode}</div>
      <div>
        <button onClick={() => setMode("simple_select")}>simple_select</button>
        <button onClick={() => setMode("draw_line_string")}>
          draw_line_string
        </button>
        {/* <button onClick={() => setMode("draw_polygon")}>draw_polygon</button> */}
        <button onClick={() => setMode("draw_point")}>draw_point</button>
      </div>

      {/* <select onChange={(e) => setPosition(e.target.value)}>
        <option value="top-left">top-left</option>
        <option value="top-right">top-right</option>
      </select> */}

      <MapGL
        style={{ width: "100%", height: "500px" }}
        mapStyle="mapbox://styles/finutss/ckx8kko1c51of14obluquad77"
        accessToken={MAPBOX_ACCESS_TOKEN}
        longitude={127.07744}
        latitude={37.505021}
        zoom={14}
        // onClick={onMapClick}
        scrollZoom={true}
      >
        <Source id="route" type="geojson" data={GeoData} />
        <Source id="route2" type="geojson" data={GeoData2} />
        <Source id="points2" type="geojson" data={data} />
        <Layer {...LayerStyle} />
        <Layer {...LayerStyle2} />
        {/* <Layer {...LayerStyle3} /> */}
        {/* <Layer {...layerStyle1} /> */}
        <Draw
          displayControlsDefault={false}
          controls={{
            polygon: false,
            point: true,
            trash: true,
          }}
          mode={mode}
          // lineStringControl={false}
          polygonControl={false}
          combineFeaturesControl={false}
          uncombineFeaturesControl={false}
          onDrawModeChange={({ mode }) => setMode(mode)}
          data={data}
          onChange={(data) => setData(data)}
          position={"top-right"}
        />

        {/* <Marker
          longitude={position.longitude}
          latitude={position.latitude}
          // onClick={onMarkerClick}
          // onDragEnd={onDragEnd}
          // draggable
        >
          <div style={style}>1</div>


        </Marker> */}
        {pointMarker}
        {pointMarkerNew}
        {pointMarkerLocal}
      </MapGL>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
