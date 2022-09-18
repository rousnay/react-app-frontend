import swal from "sweetalert";

export default function TrackReviewPinPoint(props) {
  const pinOnClick = (e, data) => {
    e.preventDefault();
    swal({
      icon: data.properties.image,
      title: data.properties.name,
      text: data.properties.text,
      // buttons: false,
    }).then((value) => {});
  };

  return (
    <>
      <div
        className={`pin-list pin-number-${props.ids}`}
        style={{
          height: "15px",
          width: "20px",
          background: "white",
          border: "1px solid #FF7A22",
          borderRadius: "3px",
          color: "#fff",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={(e) => pinOnClick(e, props.pinData)}
      >
        <span
          style={{
            display: "block",
            fontWeight: 700,
            color: "#FF7A22",
            fontSize: "12px",
          }}
        >
          {props.ids}
        </span>
      </div>
    </>
  );
}
