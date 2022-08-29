import React, { useState, useEffect, useRef } from "react";

export default function PinList(props) {
  return (
    <>
      <ul>
        {props.data.features.map((lngLat, index) => (
          <li key={lngLat.id}>
            Pin {index + 1}: {lngLat.id.slice(-7)} :{" "}
            {lngLat.geometry.coordinates[1]}
          </li>
        ))}
      </ul>
      {/* <pre>{JSON.stringify(props.data, null, 2)}</pre> */}
    </>
  );
}
