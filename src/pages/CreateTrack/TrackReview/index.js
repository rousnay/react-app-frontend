import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  API_URL,
  MAP_BOX_TOKEN,
  MAP_BOX_STYLE,
} from "../../../utils/CONSTANTS";
import { useToken, useUser } from "../../../auth/userAuth";
import MapGL, {
  Source,
  Layer,
  Marker,
  NavigationControl,
} from "@urbica/react-map-gl";
import toGeoJson from "@mapbox/togeojson";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";
import * as turf from "@turf/turf";
import { Container, Grid, Stack } from "@mui/material";
import PrivetSideBar from "../../../components/PrivetSideBar";
import PrivetHeader from "../../../components/PrivetHeader";
import MetaTrackNav from "../MetaTrackNav";
import { LayerStyle1 } from "../MetaTrackLayerStyle";
import { MetaInfoFormStyled } from "../MetaTracksStyles";
import TrackReviewPinList from "./TrackReviewPinList";
import TrackReviewPinPoint from "./TrackReviewPinPoint";
import TrackReviewContent from "./TrackReviewContent";
import TrackReviewController from "./TrackReviewController";

const localCurrentTrackId = localStorage.currentTrackId;
// const localCurrentTrackId = "9472a6ce-cd91-4828-8a66-91b3e7b30c1d"; //working
// const localCurrentTrackId = "8ad9a33e-4abc-4356-88f3-1173c61f9955"; //notWorking
const initialLineCollection = {
  type: "FeatureCollection",
  features: [
    {
      id: "Initial_LineString_ID",
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: [
          [0, 0],
          [0, 0],
        ],
      },
    },
  ],
};

export default function TrackReview() {
  // Initialization ==================
  const navigate = useNavigate();
  const [token] = useToken();
  const [user] = useUser();
  const [trackInfoData, setTrackInfoData] = useState({});
  const [trackingTags, setTrackingTags] = useState([]);
  const [privacy, setPrivacy] = useState("");
  const [geoJSONLine, setGeoJSONLine] = useState(initialLineCollection);
  const [geoJSONPoint, setGeoJSONPoint] = useState([]);
  const [centralLineCoordinate, setCentralCoordinate] = useState([0, 0]);
  const [line, setLine] = useState([0, 0]);

  useEffect(() => {
    console.log(line);
  }, [line]);
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
      // console.log(resData.data.rawGpx);
      return resData.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // GET Converted GeoJSON data ==================
  async function convertToGeoJSON() {
    const trackAsyncData = await getTrackInfo();
    const trackAsyncGpx = await trackAsyncData.rawGpx;
    var geoJSONLineData = toGeoJson.gpx(
      new DOMParser().parseFromString(trackAsyncGpx, "text/xml")
    );
    console.log(geoJSONLineData);
    return geoJSONLineData;
  }

  // GET CentralCoordinate ==================
  async function centralCoordinate() {
    const trackAsyncGeoJson = await convertToGeoJSON();
    console.log(trackAsyncGeoJson);
    const allLineGeoCoordinates =
      trackAsyncGeoJson.features[0]?.geometry.coordinates;
    const turfLine = await turf.lineString(allLineGeoCoordinates);
    setLine(turfLine);
    const turfLineFeatureCollection = turf.points(allLineGeoCoordinates);
    const turfcenterLineFeature = turf.center(turfLineFeatureCollection);
    const centralLineCoordinates = turfcenterLineFeature.geometry.coordinates;
    return centralLineCoordinates;
  }

  // GET PointFeatures ==================
  const convertToPointFeatures = (pinPointPayload) => {
    const featureArray = pinPointPayload.map((pinPoint, index) => {
      const featuresId = pinPoint.id;
      const featuresCoords = [pinPoint.lon, pinPoint.lat];
      const featureAdd = {
        type: "Feature",
        id: featuresId,
        properties: {
          name: pinPoint.name,
          text: pinPoint.text,
          image: pinPoint.image,
          pointNumber: index + 1,
        },
        geometry: { type: "Point", coordinates: featuresCoords },
      };
      console.log(featureAdd);
      return featureAdd;
    });
    setGeoJSONPoint(featureArray.reverse());
  };

  // Get TrackInfo Data ==================
  useEffect(() => {
    (async function () {
      const trackData = await getTrackInfo();
      const geoJSONData = await convertToGeoJSON();
      console.log(geoJSONData);
      const centralCoordinates = await centralCoordinate();
      setTrackInfoData(trackData);
      setGeoJSONLine(geoJSONData);
      setCentralCoordinate(centralCoordinates);
      setPrivacy(trackData.privacy);
      setTrackingTags(trackData.tags.split(","));
      convertToPointFeatures(trackData.pinPoints.pinPointArray);
    })();
  }, []);

  // Painting map Marker ==================
  const currentCoordinates = geoJSONPoint.map(
    (features) => features.geometry.coordinates
  );

  const pointMarkerFromApi = currentCoordinates.map((lngLat, index) => (
    <Marker key={index} longitude={lngLat[0]} latitude={lngLat[1]}>
      <TrackReviewPinPoint ids={index + 1} pinData={geoJSONPoint[index]} />
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
                  zoom={11.8}
                >
                  <Source id="route" type="geojson" data={geoJSONLine} />
                  <Layer {...LayerStyle1} />

                  {pointMarkerFromApi}
                  <NavigationControl />
                </MapGL>
              </div>
              <Stack className="pinInfoHeader">
                <h3>Pins</h3>
              </Stack>
              <div className="pin_list">
                <TrackReviewPinList data={geoJSONPoint} />
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
              />
              <TrackReviewController data={trackInfoData} privacy={privacy} />
            </Grid>
          </MetaInfoFormStyled>
        </Grid>
      </Container>
    </>
  );
}
