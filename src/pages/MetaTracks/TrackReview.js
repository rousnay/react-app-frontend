import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
// import map from "mapbox-gl";
import {
  Container,
  Grid,
  Stack,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import MapGL, {
  Source,
  Layer,
  Marker,
  ScaleControl,
  NavigationControl,
} from "@urbica/react-map-gl";
import Draw from "@urbica/react-map-gl-draw";
import * as turf from "@turf/turf";
import swal from "sweetalert";
import toGeoJson from "@mapbox/togeojson";
import { LayerStyle1, LayerStyle2, LayerStyle3 } from "./LayerStyle";
import TrackReviewPinList from "./TrackReviewPinList";
import { MetaInfoFormStyled } from "./MetaTracksStyles";
import PrivetSideBar from "../../components/PrivetSideBar";
import PrivetHeader from "../../components/PrivetHeader";
import TrackCreationNav from "./TrackCreationNav";
import { onMapClick, onDataDelete, onDataChange } from "./InteractionHandler";
import TrackReviewContent from "./TrackReviewContent";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";

import "./style.css";

const userInfo = JSON.parse(localStorage.getItem("userData")) || null;
const localUserToken = localStorage.token;
const localCurrentTrackId = localStorage.currentTrackId;
const localCurrentTrackName = localStorage.currentTrackName;

const initialLineData = {
  type: "FeatureCollection",
  features: [
    {
      id: "Initial_pin_ID",
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [
          [0, 0],
          [0, 0],
        ],
        type: "Point",
      },
    },
  ],
};

const localGeoJSONLineData = JSON.parse(
  localStorage.getItem("geoJSONLineLocal")
);
const localLineCentralCoordinate = JSON.parse(
  localStorage.getItem("centralLineCoordinateLocal")
);
const GeoCoordinates = localGeoJSONLineData.features[0].geometry.coordinates;
const theMiddle = Math.floor(GeoCoordinates.length / 2);
const theMiddleCoordinates = GeoCoordinates[theMiddle];
var line = turf.lineString(GeoCoordinates);
// console.log(line);
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiZmludXRzcyIsImEiOiJja3BvdjJwdWYwcHQ3Mm9udXo4M3Nod3YzIn0.OMVZjImaogKth_ApsJTlNg";
const baseURL = "https://api.finutss.com";

export default function TrackReview() {
  // ===============================
  // Async GET REQ
  // ===============================
  const [trackInfoData, setTrackInfoData] = useState({});
  const [trackingTags, setTrackingTags] = useState([]);

  const getTrackInfo = async () => {
    const response = await fetch(
      `${baseURL}/track/${localCurrentTrackId}/info`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localUserToken,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Data coud not be fetched!");
    } else {
      return response.json();
    }
  };
  useEffect(() => {
    getTrackInfo()
      .then((res) => {
        swal("Success", "Pin point lists loaded", "success", {
          buttons: false,
          timer: 1000,
        }).then((value) => {
          setTrackInfoData(res.data);
          convertToGeoJSON(res.data.rawGpx);
          setTrackingTags(res.data.tags.split(","));
        });
      })
      .catch((e) => {
        swal("Oops!", e.message, "error", {
          buttons: true,
        }).then((value) => {});
      });
  }, []);

  // ===============================
  // Convert GET RES to Map data
  // ===============================
  const [geoJSONLine, setGeoJSON] = useState([]);
  const [trackName, setTrackName] = useState([]);
  const [trackCoordinates, setTrackCoordinates] = useState([]);
  const [centralLineCoordinate, setCentralCoordinate] = useState([]);

  const convertToGeoJSON = (gpxPayload) => {
    if (gpxPayload) {
      var geoJSONLineData = toGeoJson.gpx(
        new DOMParser().parseFromString(gpxPayload, "text/xml")
      );
      const LineCollectionName = geoJSONLineData.features[0].properties.name;
      const allLineGeoCoordinates =
        geoJSONLineData.features[0].geometry.coordinates;

      const turfLineFeatureCollection = turf.points(allLineGeoCoordinates);
      const turfcenterLineFeature = turf.center(turfLineFeatureCollection);
      const centralLineCoordinates = turfcenterLineFeature.geometry.coordinates;

      setGeoJSON(geoJSONLineData);
      setTrackName(LineCollectionName);
      setTrackCoordinates(allLineGeoCoordinates);
      setCentralCoordinate(centralLineCoordinates);
    } else {
      setGeoJSON(initialLineData);
      setCentralCoordinate([0, 0]);
    }
  };

  useEffect(() => {
    console.log(geoJSONLine);
    console.log(centralLineCoordinate);
    // trackInfoData.pinPoints.pinPointArray
    // // setNewFeatures ==================
    // const updatedLocalGeofeatures = updatedLocalGeo.features.map(
    //   (features) => features
    // );
    // const featureArray = updatedLocalGeofeatures.map((features, index) => {
    //   const featuresId = features.id;
    //   const featuresCoords = features.geometry.coordinates;
    //   const featureAdd = {
    //     type: "Feature",
    //     id: featuresId,
    //     properties: { name: "a name", pointNumber: index + 1 },
    //     geometry: { type: "Point", coordinates: featuresCoords },
    //   };

    //   return featureAdd;
    // });
    // setNewFeatures(featureArray);
  }, [geoJSONLine, trackInfoData]);

  // console.log(trackInfoData.description);
  // console.log(trackInfoData.tags);
  // console.log(trackInfoData.previewImage);
  // console.log(trackInfoData.privacy);
  // console.log(trackInfoData.pinPoints.pinPointArray);
  // console.log(trackInfoData.rawGpx);

  // const GeoCoordinates = localGeoJSONLineData.features[0].geometry.coordinates;
  // const theMiddle = Math.floor(GeoCoordinates.length / 2);
  // const theMiddleCoordinates = GeoCoordinates[theMiddle];
  // var line = turf.lineString(GeoCoordinates);

  //   const currentCoordinates = geoJSONPoint.features.map(
  //     (features) => features.geometry.coordinates
  //   );

  //   const pointMarkerLocal = currentCoordinates.map((lngLat, index) => (
  //     <Marker
  //       key={index}
  //       longitude={lngLat[0]}
  //       latitude={lngLat[1]}
  //       onClick={(e) => markerClickHandler(e, index)}
  //       // draggable
  //       // onDragEnd={onDragEnd}
  //     >
  //       <PinPoint ids={index + 1} />
  //     </Marker>
  // ));

  return (
    <>
      <PrivetHeader loginInfo={userInfo} />

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
          <TrackCreationNav />
          {/* <TrackInfoFormStyled noValidate onSubmit={submitMetaInfo}> */}
          <MetaInfoFormStyled>
            <Grid item sm={12} md={8} className="gpxFileInfo">
              <div className="metaMapContainer">
                <h4>Track Name: {trackInfoData.name}</h4>

                <MapGL
                  style={{ width: "100%", height: "500px" }}
                  mapStyle="mapbox://styles/finutss/ckx8kko1c51of14obluquad77"
                  accessToken={MAPBOX_ACCESS_TOKEN}
                  longitude={localLineCentralCoordinate[0]}
                  latitude={localLineCentralCoordinate[1]}
                  zoom={11.8}
                >
                  <Source id="route" type="geojson" data={geoJSONLine} />
                  <Layer {...LayerStyle1} />
                  {/* {pointMarkerLocal} */}
                  <NavigationControl />
                </MapGL>
              </div>
              <Stack className="pinInfoHeader">
                <h3>Pins</h3>
              </Stack>
              <div className="pin_list">
                {/* <TrackReviewPinList
                data={geoJSONPoint}
                localFormValues={initialFormValuesLocal}
                cuttentPinIndex={selectedPinIndex}
                /> */}
              </div>
            </Grid>

            <Grid
              item
              sm={12}
              md={4}
              className="trackInformation metaInformation"
            >
              <TrackReviewContent
                data={trackInfoData}
                trackingTags={trackingTags}
                // pinId={pinId}
                // pinLon={pinLon}
                // pinLat={pinLat}
                // pinName={pinName}
                // distanceInKm={distanceInKm}
                // pinFeature={pinFeature}
                // localFormValues={initialFormValuesLocal}
                // formVisibility={formVisibility}
                // selectedPinIndex={selectedPinIndex}
              />

              <Stack direction="row" sx={{ justifyContent: "space-around" }}>
                <Link to="/MetaInfo">
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

                <Button
                  type="button"
                  size="small"
                  variant="contained"
                  color="themepurple"
                  className="metaInfoSubmit"
                  onClick={() => {
                    swal(
                      "Track Creation Completed!",
                      "Meta-track production capabilities are in the testing phase and will be reviewed by the operations to determine whether or not they are finalised to the user. Please note that contents that cause disgust to users, tracks that have problems with their use, and metadata that violates copyright can be returned after review.",
                      "success",
                      {
                        buttons: ["Create another track", "Manage Tracks"],
                      }
                    ).then((maangeTrack) => {
                      if (maangeTrack) {
                        window.location.href = "/ManageTracks";
                      } else {
                        window.location.href = "/CreateTrack";
                      }
                    });
                  }}
                >
                  Next
                </Button>
              </Stack>
            </Grid>
          </MetaInfoFormStyled>
        </Grid>
      </Container>
    </>
  );
}
