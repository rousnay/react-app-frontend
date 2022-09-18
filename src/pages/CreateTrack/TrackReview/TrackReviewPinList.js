export default function TrackReviewPinList(props) {
  return (
    <>
      <ul className="pin_items">
        {props.data.map((point, index) => (
          <li
            className={`pin_item ${
              props.cuttentPinIndex === index ? "selected_pin" : ""
            }`}
            key={point.id}
          >
            <span>
              <span> {index + 1} </span>
            </span>
            {point.properties.name}
            {/* {updatedformValuesLocal.findIndex((x) => x.id === lngLat.id) === -1
              ? `PIN ID:  ${lngLat.id}`
              : updatedformValuesLocal[
                  updatedformValuesLocal.findIndex((x) => x.id === lngLat.id)
                ].name} */}
          </li>
        ))}
      </ul>
    </>
  );
}
