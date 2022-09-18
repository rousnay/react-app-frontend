import * as turf from "@turf/turf";
import swal from "sweetalert";

export const onMapClick = (event, line, currentMode) => {
  let NewSelectedPoint = [event.lngLat.lng, event.lngLat.lat];
  let theDistance = JSON.stringify(
    turf.pointToLineDistance(NewSelectedPoint, line, { units: "meters" })
  );
  if (currentMode === "draw_point") {
    currentMode = "simple_select";
    if (theDistance < 25) {
      swal("Success", "New pin has been added", "success");
      console.info(`Success: ${theDistance}`);
    } else {
      swal("Error", "Pin is not on the line", "error");
      console.info(`Error: ${theDistance}`);
    }
  }
};

export const onDataDelete = (currentFeature) => {
  console.log(`Deleted feature ID: ${currentFeature.features[0].id}`);
};

export const onDataChange = (data, line, setData) => {
  let selectedPoint =
    data.features[data.features.length - 1].geometry.coordinates;
  let pointToLineDistance = JSON.stringify(
    turf.pointToLineDistance(selectedPoint, line, { units: "meters" })
  );
  if (pointToLineDistance < 25) {
    setData(data);
  } else {
  }
};

// const onMarkerClick = (event, lngLat) => {
//   event.stopPropagation();
//   let currentPoint = JSON.stringify(lngLat);
//   swal("Coordinates", currentPoint, "info");
// };
