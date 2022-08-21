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

import PinList from "./PinList";

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";

import "./style.css";
import { CloseFullscreenOutlined } from "@mui/icons-material";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiZmludXRzcyIsImEiOiJja3BvdjJwdWYwcHQ3Mm9udXo4M3Nod3YzIn0.OMVZjImaogKth_ApsJTlNg";

const GeoCoordinates = GeoData.features[0].geometry.coordinates;
const theMiddle = Math.floor(GeoCoordinates.length / 2);
const theMiddleCoordinates = GeoCoordinates[theMiddle];

var line = turf.lineString(GeoCoordinates);
const turfFeatures = turf.points(GeoCoordinates);
const centerFeatures = turf.center(turfFeatures);
const centralCoordinates = centerFeatures.geometry.coordinates;

const initialData = {
  type: "FeatureCollection",
  features: [
    {
      id: "initialID742ddabd3f",
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: theMiddleCoordinates,
        type: "Point",
      },
    },
  ],
};

const getLocalData = JSON.parse(localStorage.getItem("layers")) || initialData;

// var pt = turf.point([127.05404, 37.505342]);
// var isPointOnLine = turf.booleanPointOnLine(pt, line);
// var isWithin = turf.booleanWithin(pt, line);
// console.log(isPointOnLine);
// console.log(isWithin);

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

  const onMapClick = (event) => {
    let NewSelectedPoint = [event.lngLat.lng, event.lngLat.lat];
    let theDistance = JSON.stringify(
      turf.pointToLineDistance(NewSelectedPoint, line, { units: "meters" })
    );
    if (recentMode === "draw_point") {
      recentMode = "simple_select";
      if (theDistance < 10) {
        swal("Success", "New pin has been added", "success");
        console.info(`Success: ${theDistance}`);
      } else {
        swal("Error", "Pin is not on the line", "error");
        console.info(`Error: ${theDistance}`);
      }
    }
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
    event.stopPropagation();
    let currentPoint = JSON.stringify(lngLat);
    swal("Coordinates", currentPoint, "info");
  };

  const onDataChange = (data) => {
    // event.stopPropagation();
    let selectedPoint =
      data.features[data.features.length - 1].geometry.coordinates;
    let pointToLineDistance = JSON.stringify(
      turf.pointToLineDistance(selectedPoint, line, { units: "meters" })
    );
    if (pointToLineDistance < 10) {
      setData(data);
    } else {
    }
  };

  const onDataDelete = (h) => {
    console.log(`Deleted feature ID: ${h.features[0].id}`);
  };

  const newCurrentData = data.features.map(
    (features, i) => features.geometry.coordinates
  );

  const pointMarkerLocal = newCurrentData.map((lngLat, index) => (
    <Marker
      key={index}
      longitude={lngLat[0]}
      latitude={lngLat[1]}
      // draggable
      // onDragEnd={onDragEnd}
      // onClick={(event) => onMarkerClick(event, lngLat)}
    >
      <PinPoint ids={index + 1} />
    </Marker>
  ));

  return (
    <>
      <div>
        Mode: {mode} prevMode: {prevMode.current}
      </div>
      <div>
        <button onClick={() => setMode("simple_select")}>Selector</button>
        <button onClick={() => setMode("draw_point")}>Draw a point</button>
        {/* <button onClick={() => Draw.deleteFeature()}>Delete</button> */}
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
            point: false,
            trash: true,
            scrollZoom: true,
          }}
          mode={mode}
          data={data}
          pointControl={false}
          lineStringControl={false}
          polygonControl={false}
          combineFeaturesControl={false}
          uncombineFeaturesControl={false}
          onDrawModeChange={({ mode }) => setMode(mode)}
          onDrawDelete={(h) => onDataDelete(h)}
          onChange={(data) => onDataChange(data)}
        />

        {/* {pointMarker}
        {pointMarkerNew} */}
        {pointMarkerLocal}
        <ScaleControl />
      </MapGL>

      <PinList data={data} />
    </>
  );
}
