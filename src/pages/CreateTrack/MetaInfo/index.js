import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { MAP_BOX_TOKEN, MAP_BOX_STYLE } from "../../../utils/CONSTANTS";
import { useToken, useTrack } from "../../../hooks/useUserInfo";
import { RequestApi } from "../../../components/RequestApi";
import { Container, Grid, Stack, Button, Typography } from "@mui/material";
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
  initialPointCollection,
  initialLineString,
  initialFormValues,
} from "../MetaTrackInitializer";
import {
  onMapClick,
  onDataDelete,
  onDataChange,
} from "./MetaInfoInteractionHandler";
// const trackId = "9472a6ce-cd91-4828-8a66-91b3e7b30c1d"; // Testing purpose

var pinIdGenerator = (len, bits) => {
  bits = bits || 36;
  var outStr = "",
    newStr;
  while (outStr.length < len) {
    newStr = Math.random().toString(bits).slice(2);
    outStr += newStr.slice(0, Math.min(newStr.length, len - outStr.length));
  }
  return outStr;
};

export default function MetaInfo() {
  // Initialization ==================
  const navigate = useNavigate();
  const [token] = useToken();
  const [trackId] = useTrack();
  const [loading, setLoading] = useState(true);
  const [trackInfoData, setTrackInfoData] = useState({});
  const [geoJSONLine, setGeoJSONLine] = useState([]);
  const [geoJSONPoint, setGeoJSONPoint] = useState(initialPointCollection);
  const [centralLineCoordinate, setCentralCoordinate] = useState([0, 0]);
  const [line, setLine] = useState(initialLineString);
  const initialFormValueForPins =
    JSON.parse(localStorage.getItem("formValuesLocal")) || initialFormValues;
  /******************************************/
  //  Get Track Data from API
  /******************************************/
  // GET TrackInfo ==================
  const getTrackInfo = useCallback(async () => {
    const [getTrackData, loading] = await RequestApi(
      "GET",
      `track/${trackId}/info`,
      token
    );
    setLoading(loading);
    return await getTrackData.data;
  }, [trackId, token]);

  // GET Converted GeoJSON data ==================
  const convertToGeoJSONLine = useCallback(async () => {
    const trackAsyncData = await getTrackInfo();
    const trackAsyncRawGpx = await trackAsyncData.rawGpx;
    var geoJSONLineData = await toGeoJson.gpx(
      new DOMParser().parseFromString(trackAsyncRawGpx, "text/xml")
    );
    console.log(geoJSONLineData);
    setTrackInfoData(trackAsyncData);
    return geoJSONLineData;
  }, [getTrackInfo]);

  // GET PointFeatures ==================
  const convertToPointFeatures = useCallback(async () => {
    const trackAsyncData = await getTrackInfo();
    const trackAsyncPoint = await trackAsyncData.pinPoints;
    console.log("halse");
    if (trackAsyncPoint.count === 0) {
      localStorage.setItem(
        "formValuesLocal",
        JSON.stringify(initialFormValueForPins)
      );
      return false;
    } else {
      console.log("else");
      const trackAsyncPointArray = await trackAsyncPoint.pinPointArray;

      const pointFeatureArray = trackAsyncPointArray.map((pinPoint, index) => {
        const pointFeaturesId = pinPoint.id;
        const pointFeaturesCoords = [pinPoint.lon, pinPoint.lat];
        const pointFeatureAdd = {
          type: "Feature",
          id: pointFeaturesId,
          properties: {
            name: pinPoint.name,
            text: pinPoint.text,
            image: pinPoint.image,
            pointNumber: index + 1,
          },
          geometry: { type: "Point", coordinates: pointFeaturesCoords },
        };
        return pointFeatureAdd;
      });

      const pinFeatureArray = trackAsyncPointArray.map((pinPoint, index) => {
        const pointFeaturesId = pinPoint.id;
        const valuesFoPinList = {
          id: pointFeaturesId,
          name: pinPoint.name,
          save: "saved",
        };
        return valuesFoPinList;
      });
      localStorage.setItem("formValuesLocal", JSON.stringify(pinFeatureArray));
      const pointFeatureCollection = {
        type: "FeatureCollection",
        features: pointFeatureArray.reverse(),
      };
      return pointFeatureCollection;
    }
  }, [getTrackInfo, initialFormValueForPins]);

  // GET CentralCoordinate ==================
  const centralCoordinate = useCallback(async () => {
    const trackAsyncGeoJson = await convertToGeoJSONLine();
    const getPointFeatures = await convertToPointFeatures();
    const allLineGeoCoordinates =
      trackAsyncGeoJson.features[0]?.geometry.coordinates;
    const turfLine = await turf.lineString(allLineGeoCoordinates);
    const createInitialPoint = {
      type: "FeatureCollection",
      features: [
        {
          id: `Starting_Point_${pinIdGenerator(16)}`,
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
    const turfCenterLineFeature = turf.center(turfLineFeatureCollection);
    const centralLineCoordinates = turfCenterLineFeature.geometry.coordinates;
    setLine(turfLine);

    getPointFeatures
      ? setGeoJSONPoint(getPointFeatures)
      : setGeoJSONPoint(createInitialPoint);

    return centralLineCoordinates;
  }, [convertToGeoJSONLine, convertToPointFeatures]);

  // Get TrackInfo Data ==================
  useEffect(() => {
    (async function () {
      const geoJSONData = await convertToGeoJSONLine();
      const centralCoordinates = await centralCoordinate();
      setGeoJSONLine(geoJSONData);
      setCentralCoordinate(centralCoordinates);
    })();
  }, [convertToGeoJSONLine, centralCoordinate]);

  /******************************************/
  //  Drawing mode manipulation
  /******************************************/
  const [mode, setMode] = useState("simple_select");
  const [currentMode, setCurrentMode] = useState("draw_point");
  const prevMode = useRef(mode);
  useEffect(() => {
    prevMode.current = mode;

    if (document.querySelector("canvas.mapboxgl-canvas")) {
      (() => {
        setCurrentMode(prevMode.current);
        const mapCanvas = document.querySelector("canvas.mapboxgl-canvas");
        if (prevMode.current === "draw_point") {
          mapCanvas.classList.add("draw_point_mode");
        } else {
          mapCanvas.classList.remove("draw_point_mode");
        }
      })();
    }
  }, [loading, mode]);

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

  useEffect(() => {
    setPinFeature(JSON.stringify(geoJSONPoint));
    setPinId(geoJSONPoint.features[0].id);
    setPinLon(geoJSONPoint.features[0].geometry.coordinates[0]);
    setPinLat(geoJSONPoint.features[0].geometry.coordinates[1]);
  }, [geoJSONPoint]);

  const formVisibility = {
    opacity: selectedPinIndex + 1 < 1 ? 0.3 : 1,
    pointerEvents: selectedPinIndex + 1 < 1 ? "none" : "initial",
  };

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
    const updatedFormValuesLocal = JSON.parse(
      localStorage.getItem("formValuesLocal")
    );
    const pinId = getPointId(pinIndex, geoJSONPoint);
    const getTheNameValue = updatedFormValuesLocal.findIndex(
      (x) => x.id === pinId
    );
    pinSelector(pinIndex + 1);

    // set Metadata form values ==================
    setSelectedPinIndex(pinIndex);
    setPinId(pinId);
    setPinName2(
      getTheNameValue === -1
        ? `${pinId.slice(0, 14)}...`
        : updatedFormValuesLocal[getTheNameValue].name
    );
    // setPinName(formDataHolder[0].name);
    setPinLon(geoJSONPoint.features[pinIndex].geometry.coordinates[0]);
    setPinLat(geoJSONPoint.features[pinIndex].geometry.coordinates[1]);
    setPinFeature("Test feature");

    // SetDistanceInKm ==================
    const turfPointFrom = turf.point(
      geoJSONPoint.features[0].geometry.coordinates
    );
    const turfPointTo = turf.point(
      geoJSONPoint.features[pinIndex].geometry.coordinates
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

  // Go to Track Review ==================
  const goForTrackReview = (e) => {
    e.preventDefault();
    localStorage.removeItem("formValuesLocal");
    navigate("/CreateTrack/TrackReview");
  };

  // Go to Create Track ==================
  const goForCreateTrack = (e) => {
    e.preventDefault();
    localStorage.removeItem("formValuesLocal");
    navigate("/CreateTrack");
  };

  // Checkpoint for TrackID ==================
  useEffect(() => {
    if (!trackId) {
      navigate("/CreateTrack");
    }
  });
  return (
    <>
      <PrivetHeader />

      <Container maxWidth="xl" sx={{ display: " flex" }}>
        <Grid
          container
          sx={{
            width: "230px",
            display: "flex",
            backgroundColor: `var(--logoBlack)`,
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
          {loading ? (
            <Typography>Loading...</Typography>
          ) : (
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
                    zoom={11.5}
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
                    color="themePurple"
                    className="metaInfoSubmit"
                    onClick={() => setMode("draw_point")}
                  >
                    Add a pin
                  </Button>
                </Stack>
                <div className="pin_list">
                  <MetaInfoPinList
                    data={geoJSONPoint}
                    localFormValues={initialFormValueForPins}
                    currentPinIndex={selectedPinIndex}
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
                  token={token}
                  trackId={trackId}
                  pinId={pinId}
                  pinLon={pinLon}
                  pinLat={pinLat}
                  pinName={pinName}
                  distanceInKm={distanceInKm}
                  pinFeature={pinFeature}
                  localFormValues={initialFormValueForPins}
                  formVisibility={formVisibility}
                  selectedPinIndex={selectedPinIndex}
                />

                <Stack direction="row" sx={{ justifyContent: "space-around" }}>
                  <Button
                    type="button"
                    size="small"
                    variant="outlined"
                    color="themePurple"
                    className="backToTrackInfo"
                    onClick={(e) => {
                      goForCreateTrack(e);
                    }}
                  >
                    Back
                  </Button>

                  <Button
                    type="button"
                    size="small"
                    variant="contained"
                    color="themePurple"
                    className="metaInfoSubmit"
                    onClick={(e) => {
                      goForTrackReview(e);
                    }}
                  >
                    Next
                  </Button>
                </Stack>
              </Grid>
            </MetaInfoFormStyled>
          )}
        </Grid>
      </Container>
    </>
  );
}
