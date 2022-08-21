import React, { useState, useEffect, useRef } from "react";

export default function PinList(props) {
  return (
    <>
      <p>This is pin list</p>

      <ul>
        {props.data.features.map((lngLat, index) => (
          <li key={lngLat.id}>
            Pin: {index + 1}: {lngLat.id}
          </li>
        ))}
      </ul>
      {/* <pre>{JSON.stringify(props.data, null, 2)}</pre> */}
    </>
  );
}