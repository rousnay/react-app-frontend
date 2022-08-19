import React from "react";

// const pointStyle = {
//   hight: "25px",
//   width: "25px",
//   background: "red",
//   border: "2px solid #eee"
// };

export default function CityPin(props) {
  // const { ids, size = 20, onClick } = this.props;
  return (
    <>
      <div
        style={{
          height: "13.06px",
          width: "15.86px",
          background: "white",
          border: "1px solid #FF7A22",
          borderRadius: "3px",
          padding: "2px",
          color: "#fff",
          lineHeight: "1px",
          cursor: "pointer",
          textAlign: "center",
        }}
        // onClick={onClick}
      >
        <span
          style={{
            fontWeight: 700,
            textAlign: "center",
            color: "#FF7A22",
            fontSize: "10px",
            lineHeight: "13px",
          }}
        >
          {props.ids}
        </span>
      </div>
    </>
  );
}
