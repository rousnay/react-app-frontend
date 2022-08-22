import React, { useState, useEffect, useRef } from "react";
// import { gpx, gpxGen } from "@tmcw/togeojson";
import toGeoJson from "@mapbox/togeojson";
import { FileUploader } from "./FileUploader";

async function loginUser() {
  return fetch("./SampleGPX.gpx").then((response) => {
    if (!response.ok) {
      return response
        .json()
        .catch(() => {
          // Couldn't parse the JSON
          throw new Error(response.status);
        })
        .then(({ message }) => {
          // Got valid JSON with error response, use it
          throw new Error(message || response.status);
        });
    }
    // Successful response, parse the JSON and return the data
    return response.text();
  });
}

export default function GPXupload() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser();
    if (response) {
      var geojson = toGeoJson.gpx(
        new DOMParser().parseFromString(response, "text/xml")
      );
      console.log(geojson);
      var trackName = geojson.features[0].properties.name;
      var trackLine = geojson.features[0].geometry.coordinates;
      console.log(trackName);
      console.log(trackLine);
    } else {
      console.log(response);
    }
  };
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const submitForm = () => {};
  return (
    <>
      <p>GPX Upload</p>
      <form className="" noValidate onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <FileUploader
          onFileSelectSuccess={(file) => setSelectedFile(file)}
          onFileSelectError={({ error }) => alert(error)}
        />
        <button type="submit">Convert</button>
      </form>
    </>
  );
}
