import React, { useState } from "react";
import Map, { useControl, Source, Layer } from "react-map-gl";
import { LayerStyle } from "./LayerStyle";
import { GeoData } from "./SampleGeoJSON";

// import Draw from "@urbica/react-map-gl-draw";

import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiZmludXRzcyIsImEiOiJja3BvdjJwdWYwcHQ3Mm9udXo4M3Nod3YzIn0.OMVZjImaogKth_ApsJTlNg";

// const initialViewport = {
//   longitude: 127.047943,
//   latitude: 37.506427,
//   zoom: 13,
// };

function DrawControl(props: DrawControlProps) {
  useControl(() => new MapboxDraw(props), {
    position: props.position,
  });

  return null;
}

export default function ReactMapGl() {
  // const [viewport, setViewport] = useState(initialViewport);
  // console.log(GeoData);
  // const data =
  return (
    <>
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
            // polygon: true,
            point: true,
            trash: true,
          }}
        />
        <Source type="geojson" data={GeoData}>
          <Layer {...LayerStyle} />
        </Source>
      </Map>
    </>
  );
}
