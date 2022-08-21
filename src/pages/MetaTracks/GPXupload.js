import React, { useState, useEffect, useRef } from "react";
// import { gpx, gpxGen } from "@tmcw/togeojson";
import toGeoJson from "@mapbox/togeojson";

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
    } else {
      console.log(response);
    }
  };

  return (
    <>
      <p>GPX Upload</p>
      <form className="" noValidate onSubmit={handleSubmit}>
        <button type="submit">Convert</button>
      </form>
    </>
  );
}
