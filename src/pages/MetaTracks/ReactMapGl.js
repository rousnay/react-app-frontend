import React, { useState, useEffect, useReducer } from "react";
// import map from "mapbox-gl";
import Map, { useControl, Source, Layer } from "react-map-gl";
import { LayerStyle } from "./LayerStyle";
import { GeoData } from "./SampleGeoJSON";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { addLayer, selectLayer } from "./actions";
import { initialState, reducer } from "./reducer";
import GeoJsonModel from "./GeoJsonModel";
// import ReactMapboxGl, { GeoJSONLayer } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiZmludXRzcyIsImEiOiJja3BvdjJwdWYwcHQ3Mm9udXo4M3Nod3YzIn0.OMVZjImaogKth_ApsJTlNg";

// const initialViewport = {
//   longitude: 127.047943,
//   latitude: 37.506427,
//   zoom: 13,
// };

// function DrawControl(props: DrawControlProps) {
//   useControl(() => new MapboxDraw(props), {
//     position: props.position,
//   });

//   return null;
// }
function DrawControl(props) {
  useControl(
    function () {
      return new MapboxDraw(props);
    },
    {
      position: props.position,
    }
  );
  return null;
}

const layerStyle1 = {
  id: "point",
  type: "circle",
  paint: {
    "circle-radius": 5,
    "circle-color": "#007cbf",
  },
};

// var Draw = new MapboxDraw();

// map.addControl(Draw, "bottom-left");

export default function ReactMapGl() {
  // const [viewport, setViewport] = useState(initialViewport);
  // console.log(GeoData);
  // const data =

  // const [geoData, setgeoData] = useState({});

  const [data, setData] = useState({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          coordinates: [127.075062, 37.503365],
          type: "Point",
        },
      },
    ],
  });

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("layers", JSON.stringify(state.layers));
  }, [state.layers]);

  const onDrawCreate = ({ features }) => {
    let feature = new GeoJsonModel(features[0]);
    console.log("feature", feature);
    dispatch(addLayer(feature));
  };

  const onDrawUpdate = ({ features }) => {
    const feature = new GeoJsonModel(features[0]);
    console.log("feature", feature.getId());
  };

  const onDrawDelete = ({ features }) => {
    const feature = features[0];
    console.log("feature", feature);
  };

  const onDrawSelectionChange = ({ features }) => {
    if (features.length > 0) {
      const feature = new GeoJsonModel(features[0]);
      dispatch(selectLayer(feature.getId()));
    } else {
      dispatch(selectLayer(null));
    }
  };

  // const [mode, setMode] = useState("draw_point");

  return (
    <>
      {/* <div>Mode: {mode}</div>
      <div>
        <button onClick={() => setMode("simple_select")}>simple_select</button>
        <button onClick={() => setMode("draw_line_string")}>
          draw_line_string
        </button>
        <button onClick={() => setMode("draw_polygon")}>draw_polygon</button>
        <button onClick={() => setMode("draw_point")}>draw_point</button>
      </div> */}

      <Map
        initialViewState={{
          longitude: 127.075062,
          latitude: 37.503365,
          zoom: 13,
        }}
        mapStyle="mapbox://styles/finutss/ckx8kko1c51of14obluquad77"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={["GeoData"]}
        // height="100vh"
        // width="100vw"
        // {...viewport}
        // onViewportChange={(newViewport) => setViewport(newViewport)}
        style={{ width: "100%", height: "400px" }}
        // onMouseMove={onHover}
      >
        <DrawControl
          position="top-left"
          displayControlsDefault={false}
          controls={{
            point: true,
            trash: true,
          }}
          defaultMode={"draw_point"}
          // modes={mode}
          // onDrawModeChange={({ mode }) => setMode(mode)}
          onDrawCreate={onDrawCreate}
          onDrawUpdate={onDrawUpdate}
          onDrawDelete={onDrawDelete}
          onDrawSelectionChange={onDrawSelectionChange}
          onChange={(data) => setData(data)}
        />

        {/* <Draw
          data={data}
          onChange={(data) => setData(data)}
          position={position}
        /> */}

        <Source type="geojson" data={GeoData}>
          <Layer {...LayerStyle} />
          <Layer {...layerStyle1} />
        </Source>

        {/* <Source type="geojson" data={GeoData}>
          <Layer {...layerStyle1} />
        </Source> */}

        {/* {state.layers.map((layer, key) => (
          <Layer key={key} data={layer} />
        ))} */}
      </Map>
      {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
