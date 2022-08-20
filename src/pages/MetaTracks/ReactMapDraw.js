import React, { useState, useEffect } from "react";
// import map from "mapbox-gl";
import MapGL, { Source, Layer, Marker } from "@urbica/react-map-gl";
import Draw from "@urbica/react-map-gl-draw";

import { LayerStyle1, LayerStyle2, LayerStyle3 } from "./LayerStyle";
import { GeoData } from "./SampleGeoJSON";
import { GeoData2 } from "./SampleGeoJSON2";
import PinPoint from "./PinPoint";
import PinInfo from "./PinInfo";

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

const initialData = {
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
const getLocalData = JSON.parse(localStorage.getItem("layers")) || initialData;

const GeoCoordinatesLocal = getLocalData.features.map(
  (features, i) => features.geometry.coordinates
);

console.log(GeoCoordinatesLocal);

const GeoCoordinates = GeoData.features[0].geometry.coordinates;
const GeoCoordinates2 = GeoData2.features[0].geometry.coordinates;

console.log(GeoCoordinates);
console.log(GeoCoordinates2);

export default function ReactMapDraw() {
  const [mode, setMode] = useState("simple_select");
  const [data, setData] = useState(getLocalData);
  useEffect(() => {
    localStorage.setItem("layers", JSON.stringify(data));
    console.log(data);
  }, [data]);

  // const [viewport, setViewport] = useState({
  //   latitude: 37.830348,
  //   longitude: -122.486052,
  //   zoom: 15,
  // });
  // const [position, setPosition] = useState({
  //   longitude: 127.075062,
  //   latitude: 37.509365,
  // });

  // const onDragEnd = (lngLat) => {
  //   setPosition({ longitude: lngLat.lng, latitude: lngLat.lat });
  // };
  // const onMapClick = (event) => {
  //   setPosition({ longitude: event.lngLat.lng, latitude: event.lngLat.lat });
  // };

  const onMarkerClick = (event) => {
    alert("You clicked on marker");
    event.stopPropagation();
  };
  const pointMarker = GeoCoordinates.map((lngLat, index) => (
    <Marker key={index} longitude={lngLat[0]} latitude={lngLat[1]}>
      <PinPoint ids={index + 1} />
    </Marker>
  ));

  const pointMarkerNew = GeoCoordinates2.map((lngLat, index) => (
    <Marker
      key={index}
      longitude={lngLat[0]}
      latitude={lngLat[1]}
      // draggable
      // onDragEnd={onDragEnd}
      // onClick={onMarkerClick}
    >
      <PinPoint ids={index + 1} />
    </Marker>
  ));

  const pointMarkerLocal = GeoCoordinatesLocal.map((lngLat, index) => (
    <Marker
      key={index}
      longitude={lngLat[0]}
      latitude={lngLat[1]}
      // draggable
      // onDragEnd={onDragEnd}
      // onClick={onMarkerClick}
    >
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
        <Layer {...LayerStyle1} />
        <Layer {...LayerStyle2} />
        {/* <Layer {...LayerStyle3} /> */}
        <Draw
          position={"top-right"}
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
        />

        {pointMarker}
        {pointMarkerNew}
        {pointMarkerLocal}
      </MapGL>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
