import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  API_URL,
  MAP_BOX_TOKEN,
  MAP_BOX_STYLE,
} from "../../../utils/CONSTANTS";
import { useToken, useUser } from "../../../auth/userAuth";
import { Container, Grid, Stack, Button } from "@mui/material";
import MapGL, {
  Source,
  Layer,
  Marker,
  NavigationControl,
} from "@urbica/react-map-gl";
import toGeoJson from "@mapbox/togeojson";
import Draw from "@urbica/react-map-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";
import * as turf from "@turf/turf";
import PrivetSideBar from "../../../components/PrivetSideBar";
import PrivetHeader from "../../../components/PrivetHeader";
import MetaTrackNav from "../MetaTrackNav";
import { LayerStyle1 } from "../MetaTrackLayerStyle";
import { MetaInfoFormStyled } from "../MetaTracksStyles";
import MetaInfoPinList from "./MetaInfoPinList";
import MetaInfoPinPoint from "./MetaInfoPinPoint";
import MetaInfoForm from "./MetaInfoForm";

import {
  onMapClick,
  onDataDelete,
  onDataChange,
} from "./MetaInfoInteractionHandler";
//const localCurrentTrackId = "9472a6ce-cd91-4828-8a66-91b3e7b30c1d"; //working

const localCurrentTrackId = localStorage.currentTrackId;

var initialPinId = (len, bits) => {
  bits = bits || 36;
  var outStr = "",
    newStr;
  while (outStr.length < len) {
    newStr = Math.random().toString(bits).slice(2);
    outStr += newStr.slice(0, Math.min(newStr.length, len - outStr.length));
  }
  return outStr;
};

const initialPointCollection = {
  type: "FeatureCollection",
  features: [
    {
      id: initialPinId(32),
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [0, 0],
        type: "Point",
      },
    },
  ],
};

export default function MetaInfo() {
  // Initialization ==================
  const navigate = useNavigate();
  const [token] = useToken();
  const [user] = useUser();
  const [trackInfoData, setTrackInfoData] = useState({});
  const [geoJSONLine, setGeoJSONLine] = useState([]);
  const [geoJSONPoint, setGeoJSONPoint] = useState(initialPointCollection);
  const [centralLineCoordinate, setCentralCoordinate] = useState([0, 0]);
  const [line, setLine] = useState({
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [
        [0, 0],
        [0, 0],
      ],
    },
  });

  /******************************************/
  //  Get Track Data from API
  /******************************************/
  // GET TrackInfo ==================
  async function getTrackInfo() {
    try {
      const reqData = await fetch(
        `${API_URL}/track/${localCurrentTrackId}/info`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const resData = await reqData.json();
      setTrackInfoData(resData.data);
      return resData.data.rawGpx;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // GET Converted GeoJSON data ==================
  async function convertToGeoJSON() {
    const trackAsyncGpx = await getTrackInfo();
    var geoJSONLineData = await toGeoJson.gpx(
      new DOMParser().parseFromString(trackAsyncGpx, "text/xml")
    );
    console.log(geoJSONLineData);
    return geoJSONLineData;
  }

  // GET CentralCoordinate ==================
  async function centralCoordinate() {
    const trackAsyncGeoJson = await convertToGeoJSON();
    const allLineGeoCoordinates =
      trackAsyncGeoJson.features[0]?.geometry.coordinates;
    const turfLine = await turf.lineString(allLineGeoCoordinates);
    const createInitialPoint = {
      type: "FeatureCollection",
      features: [
        {
          id: initialPinId(32),
          type: "Feature",
          properties: {},
          geometry: {
            coordinates: allLineGeoCoordinates[0],
            type: "Point",
          },
        },
      ],
    };
    const turfLineFeatureCollection = turf.points(allLineGeoCoordinates);
    const turfcenterLineFeature = turf.center(turfLineFeatureCollection);
    const centralLineCoordinates = turfcenterLineFeature.geometry.coordinates;

    setLine(turfLine);
    setGeoJSONPoint(createInitialPoint);
    return centralLineCoordinates;
  }

  // Get TrackInfo Data ==================
  useEffect(() => {
    (async function () {
      const geoJSONData = await convertToGeoJSON();
      const centralCoordinates = await centralCoordinate();
      setGeoJSONLine(geoJSONData);
      setCentralCoordinate(centralCoordinates);
    })();
  }, []);

  /******************************************/
  //  Drawing mode manipulation
  /******************************************/
  const [mode, setMode] = useState("simple_select");
  const [currentMode, setCurrentMode] = useState("draw_point");
  const prevMode = useRef(mode);
  useEffect(() => {
    prevMode.current = mode;
    (() => {
      setCurrentMode(prevMode.current);
      const mapCanvas = document.querySelector("canvas.mapboxgl-canvas");
      if (prevMode.current === "draw_point") {
        mapCanvas.classList.add("draw_point_mode");
      } else {
        mapCanvas.classList.remove("draw_point_mode");
      }
    })();
  }, [mode]);

  /******************************************/
  //  Form value of with dynamic PIN info
  /******************************************/
  const [pinId, setPinId] = useState("");
  const [pinName, setPinName2] = useState("");
  const [pinLon, setPinLon] = useState("");
  const [pinLat, setPinLat] = useState("");
  const [distanceInKm, SetDistanceInKm] = useState(0);
  const [pinFeature, setPinFeature] = useState({});

  const [selectedPinIndex, setSelectedPinIndex] = useState(-1);
  const [newCollection, setNewCollection] = useState([initialPointCollection]);
  const [newFeatures, setNewFeatures] = useState([]);

  useEffect(() => {
    localStorage.setItem("geoJSONPointLocal", JSON.stringify(geoJSONPoint));
    setPinFeature(JSON.stringify(geoJSONPoint));
    setPinId(geoJSONPoint.features[0].id);
    setPinLon(geoJSONPoint.features[0].geometry.coordinates[0]);
    setPinLat(geoJSONPoint.features[0].geometry.coordinates[1]);
  }, [geoJSONPoint]);

  useEffect(() => {
    const turfFeaturesCollection = turf.featureCollection([...newFeatures]);
    setNewCollection(turfFeaturesCollection);
  }, [newFeatures]);

  const formVisibility = {
    opacity: selectedPinIndex + 1 < 1 ? 0.3 : 1,
    pointerEvents: selectedPinIndex + 1 < 1 ? "none" : "initial",
  };

  const initialFormValues = [
    {
      id: "",
      name: "",
      save: "not_saved",
    },
  ];

  const initialFormValuesLocal =
    JSON.parse(localStorage.getItem("formValuesLocal")) || initialFormValues;

  /******************************************/
  //  Marker Click Handler
  /******************************************/
  const getPointId = (pin, geoJson) => {
    return geoJson.features[pin].id;
  };

  const pinSelector = (pin) => {
    const allPinItem = document.querySelectorAll(".pin-list");
    allPinItem.forEach((box) => {
      box.classList.remove("selected-pin");
    });
    document.querySelector(`.pin-number-${pin}`).classList.add("selected-pin");
  };

  // markerClickHandler function ==================
  const markerClickHandler = (event, pinIndex) => {
    const updatedLocalGeo = JSON.parse(
      localStorage.getItem("geoJSONPointLocal")
    );
    const updatedformValuesLocal = JSON.parse(
      localStorage.getItem("formValuesLocal")
    );
    const pinId = getPointId(pinIndex, updatedLocalGeo);
    const getTheNameValue = updatedformValuesLocal.findIndex(
      (x) => x.id === pinId
    );
    pinSelector(pinIndex + 1);
    console.log(
      pinIndex + 1,
      pinId.slice(0, 7),
      updatedLocalGeo.features[pinIndex].geometry.coordinates[1]
    );

    // set Metadata form values ==================
    setSelectedPinIndex(pinIndex);
    setPinId(pinId);
    setPinName2(
      getTheNameValue === -1
        ? `PIN ID: ${pinId.slice(0, 5)}...`
        : updatedformValuesLocal[getTheNameValue].name
    );
    // setPinName(formDataHolder[0].name);
    setPinLon(updatedLocalGeo.features[pinIndex].geometry.coordinates[0]);
    setPinLat(updatedLocalGeo.features[pinIndex].geometry.coordinates[1]);
    setPinFeature("Test feature");

    // setNewFeatures ==================
    const updatedLocalGeofeatures = updatedLocalGeo.features.map(
      (features) => features
    );
    const featureArray = updatedLocalGeofeatures.map((features, index) => {
      const featuresId = features.id;
      const featuresCoords = features.geometry.coordinates;
      const featureAdd = {
        type: "Feature",
        id: featuresId,
        properties: { name: "a name", pointNumber: index + 1 },
        geometry: { type: "Point", coordinates: featuresCoords },
      };

      return featureAdd;
    });
    setNewFeatures(featureArray);

    // SetDistanceInKm ==================
    const turfPointFrom = turf.point(
      updatedLocalGeo.features[0].geometry.coordinates
    );
    const turfPointTo = turf.point(
      updatedLocalGeo.features[pinIndex].geometry.coordinates
    );
    const pointToPointDistance = (pointFrom, pointTo, line) => {
      const nearestPointOnLineFrom = turf.nearestPointOnLine(line, pointFrom);
      const nearestPointOnLineTo = turf.nearestPointOnLine(line, pointTo);
      const slicedLine = turf.lineSlice(
        nearestPointOnLineFrom,
        nearestPointOnLineTo,
        line
      );
      return turf.lineDistance(slicedLine, "kilometers").toFixed(2);
    };
    SetDistanceInKm(pointToPointDistance(turfPointFrom, turfPointTo, line));

    event.stopPropagation();
  };

  /******************************************/
  //  Painting map Marker
  /******************************************/
  const currentCoordinates = geoJSONPoint.features.map(
    (features) => features.geometry.coordinates
  );

  const pointMarkerLocal = currentCoordinates.map((lngLat, index) => (
    <Marker
      key={index}
      longitude={lngLat[0]}
      latitude={lngLat[1]}
      onClick={(e) => markerClickHandler(e, index)}
    >
      <MetaInfoPinPoint ids={index + 1} />
    </Marker>
  ));

  // Checkpoint for TrackID ==================
  useEffect(() => {
    if (!localCurrentTrackId) {
      navigate("/CreateTrack");
    }
  });
  return (
    <>
      <PrivetHeader loginInfo={user} />

      <Container maxWidth="xl" sx={{ display: " flex" }}>
        <Grid
          container
          sx={{
            width: "230px",
            display: "flex",
            backgroundColor: `var(--logoblack)`,
          }}
        >
          <PrivetSideBar />
        </Grid>

        <Grid
          container
          sx={{
            width: "calc(100% - 230px)",
            padding: "30px",
            display: "flex",
          }}
        >
          <MetaTrackNav />
          {/* <TrackInfoFormStyled noValidate onSubmit={submitMetaInfo}> */}
          <MetaInfoFormStyled>
            <Grid item sm={12} md={8} className="gpxFileInfo">
              <div className="metaMapContainer">
                <h4>Track Name: {trackInfoData.name}</h4>
                <MapGL
                  style={{ width: "100%", height: "500px" }}
                  mapStyle={MAP_BOX_STYLE}
                  accessToken={MAP_BOX_TOKEN}
                  longitude={centralLineCoordinate[0]}
                  latitude={centralLineCoordinate[1]}
                  onClick={(event) => onMapClick(event, line, currentMode)}
                  zoom={11.7}
                >
                  <Source id="route" type="geojson" data={geoJSONLine} />
                  <Layer {...LayerStyle1} />
                  <Draw
                    position={"top-left"}
                    displayControlsDefault={false}
                    controls={{
                      polygon: false,
                      point: false,
                      trash: true,
                      scrollZoom: true,
                    }}
                    mode={currentMode}
                    data={geoJSONPoint}
                    pointControl={false}
                    lineStringControl={false}
                    polygonControl={false}
                    combineFeaturesControl={false}
                    uncombineFeaturesControl={false}
                    onDrawModeChange={({ mode }) => setMode(mode)}
                    onDrawDelete={(currentFeature) =>
                      onDataDelete(currentFeature)
                    }
                    onChange={(geoJSONPoint) =>
                      onDataChange(geoJSONPoint, line, setGeoJSONPoint)
                    }
                  />
                  {pointMarkerLocal}
                  <NavigationControl />
                </MapGL>
              </div>
              <Stack className="pinInfoHeader">
                <h3 style={{ margin: 0 }}>Pins</h3>
                <Button
                  type="button"
                  size="small"
                  variant={
                    currentMode === "draw_point" ? "contained" : "outlined"
                  }
                  color="themepurple"
                  className="metaInfoSubmit"
                  onClick={() => setMode("draw_point")}
                >
                  Add a pin
                </Button>
              </Stack>
              <div className="pin_list">
                <MetaInfoPinList
                  data={geoJSONPoint}
                  localFormValues={initialFormValuesLocal}
                  cuttentPinIndex={selectedPinIndex}
                />
              </div>
            </Grid>

            <Grid
              item
              sm={12}
              md={4}
              className="trackInformation metaInformation"
            >
              <MetaInfoForm
                pinId={pinId}
                pinLon={pinLon}
                pinLat={pinLat}
                pinName={pinName}
                distanceInKm={distanceInKm}
                pinFeature={pinFeature}
                localFormValues={initialFormValuesLocal}
                formVisibility={formVisibility}
                selectedPinIndex={selectedPinIndex}
              />

              <Stack direction="row" sx={{ justifyContent: "space-around" }}>
                <Link to="/CreateTrack">
                  <Button
                    type="button"
                    size="small"
                    variant="outlined"
                    color="themepurple"
                    className="backToTrackInfo"
                  >
                    Back
                  </Button>
                </Link>

                <Link to="/CreateTrack/TrackReview">
                  <Button
                    type="button"
                    size="small"
                    variant="contained"
                    color="themepurple"
                    className="metaInfoSubmit"
                  >
                    Next
                  </Button>
                </Link>
              </Stack>
            </Grid>
          </MetaInfoFormStyled>
        </Grid>
      </Container>
    </>
  );
}
