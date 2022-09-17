export default function MetaInfoPinPoint(props) {
  // const { ids, size = 20, onClick } = this.props;
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
        // onClick={onClick}
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
