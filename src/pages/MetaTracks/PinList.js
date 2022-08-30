import React, { useState, useEffect, useRef } from "react";

export default function PinList(props) {
  return (
    <>
      <ul className="pin_items">
        {props.data.features.map((lngLat, index) => (
          <li
            className={`pin_item ${
              props.cuttentPinIndex === index ? "selected_pin" : ""
            }`}
            key={lngLat.id}
          >
            <span>
              <span> {index + 1} </span>
            </span>
            PIN ID: {lngLat.id}
          </li>
        ))}
      </ul>
      {/* <pre>{JSON.stringify(props.data, null, 2)}</pre> */}
    </>
  );
}
