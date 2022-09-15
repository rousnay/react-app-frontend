import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MapGL, {
  Source,
  Layer,
  Marker,
  NavigationControl,
} from "@urbica/react-map-gl";
import * as turf from "@turf/turf";
import toGeoJson from "@mapbox/togeojson";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { Container, Grid, Stack } from "@mui/material";
import { LayerStyle1 } from "./LayerStyle";
import { MetaInfoFormStyled } from "./MetaTracksStyles";
import PrivetSideBar from "../../components/PrivetSideBar";
import PrivetHeader from "../../components/PrivetHeader";
import TrackCreationNav from "./TrackCreationNav";
import TrackReviewPinList from "./TrackReviewPinList";
import TrackReviewPinPoint from "./TrackReviewPinPoint";
import TrackReviewContent from "./TrackReviewContent";
import TrackReviewController from "./TrackReviewController";

const userInfo = JSON.parse(localStorage.getItem("userData")) || null;
const localUserToken = localStorage.token;
const localCurrentTrackId = localStorage.currentTrackId;
//"9472a6ce-cd91-4828-8a66-91b3e7b30c1d";
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

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiZmludXRzcyIsImEiOiJja3BvdjJwdWYwcHQ3Mm9udXo4M3Nod3YzIn0.OMVZjImaogKth_ApsJTlNg";
const baseURL = "https://api.finutss.com";

export default function TrackReview() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localCurrentTrackId) navigate("/CreateTrack");
  });

  const [trackInfoData, setTrackInfoData] = useState({});
  const [trackingTags, setTrackingTags] = useState([]);
  const [privacy, setPrivacy] = useState("");
  const [geoJSONLine, setGeoJSON] = useState(initialLineData);
  const [pointFeatures, setPointFeatures] = useState([]);
  const [centralLineCoordinate, setCentralCoordinate] = useState([0, 0]);

  // GET TrackInfo ==================
  async function getTrackInfo() {
    try {
      const reqData = await fetch(
        `${baseURL}/track/${localCurrentTrackId}/info`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localUserToken,
          },
        }
      );
      const resData = await reqData.json();
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
    return geoJSONLineData;
  }

  // GET CentralCoordinate ==================
  async function centralCoordinate() {
    const trackAsyncGeoJson = await convertToGeoJSON();
    const allLineGeoCoordinates =
      trackAsyncGeoJson.features[0].geometry.coordinates;
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
      return featureAdd;
    });
    setPointFeatures(featureArray.reverse());
  };

  // Get TrackInfo Data ==================
  useEffect(() => {
    (async function () {
      const trackData = await getTrackInfo();
      const geoJSONData = await convertToGeoJSON();
      const centralCoordinates = await centralCoordinate();
      setTrackInfoData(trackData);
      setGeoJSON(geoJSONData);
      setCentralCoordinate(centralCoordinates);
      setPrivacy(trackData.privacy);
      setTrackingTags(trackData.tags.split(","));
      convertToPointFeatures(trackData.pinPoints.pinPointArray);
    })();
  }, []);

  // Painting map Marker ==================
  const currentCoordinates = pointFeatures.map(
    (features) => features.geometry.coordinates
  );

  const pointMarkerFromApi = currentCoordinates.map((lngLat, index) => (
    <Marker
      key={index}
      longitude={lngLat[0]}
      latitude={lngLat[1]}
      // onClick={(e) => markerClickHandler(e, index)}
      // draggable
      // onDragEnd={onDragEnd}
    >
      <TrackReviewPinPoint ids={index + 1} pinData={pointFeatures[index]} />
    </Marker>
  ));

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
          <MetaInfoFormStyled>
            <Grid item sm={12} md={8} className="gpxFileInfo">
              <div className="metaMapContainer">
                <h4>Track Name: {trackInfoData.name}</h4>

                <MapGL
                  style={{ width: "100%", height: "500px" }}
                  mapStyle="mapbox://styles/finutss/ckx8kko1c51of14obluquad77"
                  accessToken={MAPBOX_ACCESS_TOKEN}
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
                <TrackReviewPinList data={pointFeatures} />
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
