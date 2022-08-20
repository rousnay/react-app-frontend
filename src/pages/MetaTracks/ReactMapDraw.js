import React, { useState, useEffect, useRef } from "react";
// import map from "mapbox-gl";
import MapGL, {
  Source,
  Layer,
  Marker,
  ScaleControl,
} from "@urbica/react-map-gl";
import DeckGL, { FlyToInterpolator } from "deck.gl";
import Draw from "@urbica/react-map-gl-draw";
import * as turf from "@turf/turf";
import swal from "sweetalert";
import { LayerStyle1, LayerStyle2, LayerStyle3 } from "./LayerStyle";
import { GeoData } from "./SampleGeoJSON";
// import { GeoData2 } from "./SampleGeoJSON2";
import PinPoint from "./PinPoint";
import PinInfo from "./PinInfo";

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";

import "./style.css";
import { CloseFullscreenOutlined } from "@mui/icons-material";

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

const turfFeatures = turf.points(GeoCoordinatesLocal);
const centerFeatures = turf.center(turfFeatures);
const centralCoordinates = centerFeatures.geometry.coordinates;
console.log(centralCoordinates);

const GeoCoordinates = GeoData.features[0].geometry.coordinates;
console.log(GeoCoordinates);
var line = turf.lineString(GeoCoordinates);
var pt = turf.point([127.05404, 37.505342]);
var isPointOnLine = turf.booleanPointOnLine(pt, line);

var isWithin = turf.booleanWithin(pt, line);
console.log(isPointOnLine);
console.log(isWithin);

export default function ReactMapDraw() {
  const [data, setData] = useState(getLocalData);
  useEffect(() => {
    localStorage.setItem("layers", JSON.stringify(data));
    console.log(data);
  }, [data]);

  const [mode, setMode] = useState("simple_select");

  const prevMode = useRef(mode);

  useEffect(() => {
    prevMode.current = mode;
  }, [mode]);

  var recentMode = prevMode.current;
  // var [currentMode, setCurrentMode] = useState(mode);
  // useEffect(() => {
  //   currentMode = mode;
  //   console.log(currentMode);
  // }, [mode]);

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

  // if (currentMode === "draw_point") {
  // }

  const onMapClick = (event) => {
    // event.stopPropagation();
    let currentPoint = JSON.stringify(event.lngLat);
    if (recentMode === "draw_point") {
      swal("Coordinates", currentPoint, "info");
      recentMode = "simple_select";
    } else {
      swal("Coordinates", currentPoint, "warning");
    }
    // setPosition({ longitude: event.lngLat.lng, latitude: event.lngLat.lat });
  };

  const onDrawPoint = (newMode) => {
    setMode(newMode);
    console.log("fill");
  };

  const onSimpleSelect = (newMode) => {
    setMode(newMode);
    console.log("blank");
  };

  const onMarkerClick = (event, lngLat) => {
    console.log("fill");
    event.stopPropagation();
    let currentPoint = JSON.stringify(lngLat);

    let isThePointOnLine = JSON.stringify(
      turf.booleanPointOnLine(lngLat, line)
    );
    let theDistance = JSON.stringify(
      turf.pointToLineDistance(lngLat, line, { units: "meters" })
    );
    // swal("Coordinates", currentPoint, "info");
    // swal("Coordinates", isThePointOnLine, "info");
    swal("Coordinates", theDistance, "info");
  };

  const pointMarkerLocal = GeoCoordinatesLocal.map((lngLat, index) => (
    <Marker
      key={index}
      longitude={lngLat[0]}
      latitude={lngLat[1]}
      // draggable
      // onDragEnd={onDragEnd}
      onClick={(event) => onMarkerClick(event, lngLat)}
    >
      <PinPoint ids={index + 1} />
    </Marker>
  ));

  // const pointMarker = GeoCoordinates.map((lngLat, index) => (
  //   <Marker key={index} longitude={lngLat[0]} latitude={lngLat[1]}>
  //     <PinPoint ids={index + 1} />
  //   </Marker>
  // ));

  // const pointMarkerNew = GeoCoordinates2.map((lngLat, index) => (
  //   <Marker
  //     key={index}
  //     longitude={lngLat[0]}
  //     latitude={lngLat[1]}
  //   >
  //     <PinPoint ids={index + 1} />
  //   </Marker>
  // ));

  return (
    <>
      <div>
        Mode: {mode} prevMode: {prevMode.current}
      </div>
      <div>
        <button onClick={() => setMode("simple_select")}>Selector</button>
        <button onClick={() => setMode("draw_point")}>Draw a point</button>
      </div>

      <MapGL
        style={{ width: "100%", height: "500px" }}
        mapStyle="mapbox://styles/finutss/ckx8kko1c51of14obluquad77"
        accessToken={MAPBOX_ACCESS_TOKEN}
        longitude={centralCoordinates[0]}
        latitude={centralCoordinates[1]}
        // longitude={127.07744}
        // latitude={37.505021}
        zoom={14}
        onClick={onMapClick}
        // onClick={
        //   (event, mayMode) => console.log(mayMode)
        //   mayMode === "draw_point" ? onMapClick() : onMap2Click()
        // }
        scrollZoom={true}
        doubleClickZoom={true}
        touchZoom={true}
        interactiveLayerIds={"route"}
      >
        <Source id="route" type="geojson" data={GeoData} />
        {/* <Source id="route2" type="geojson" data={GeoData2} /> */}
        <Source id="points2" type="geojson" data={data} />
        <Layer {...LayerStyle1} />
        {/* <Layer {...LayerStyle2} /> */}
        {/* <Layer {...LayerStyle3} /> */}
        <Draw
          position={"top-right"}
          displayControlsDefault={false}
          controls={{
            polygon: false,
            point: true,
            trash: true,
            scrollZoom: true,
          }}
          mode={mode}
          lineStringControl={false}
          polygonControl={false}
          combineFeaturesControl={false}
          uncombineFeaturesControl={false}
          onDrawModeChange={({ mode }) => setMode(mode)}
          data={data}
          onChange={(data) => setData(data)}
        />

        {/* {pointMarker}
        {pointMarkerNew} */}
        {pointMarkerLocal}
        <ScaleControl />
      </MapGL>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
