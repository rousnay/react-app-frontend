import React from "react";

export default function MetaInfoPinList(props) {
  const updatedformValuesLocal =
    JSON.parse(localStorage.getItem("formValuesLocal")) ||
    props.localFormValues;

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

            {updatedformValuesLocal.findIndex((x) => x.id === lngLat.id) === -1
              ? `PIN ID:  ${lngLat.id}`
              : updatedformValuesLocal[
                  updatedformValuesLocal.findIndex((x) => x.id === lngLat.id)
                ].name}
          </li>
        ))}
      </ul>
    </>
  );
}
