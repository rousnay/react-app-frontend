export default function TrackReviewContent(props) {
  return (
    <>
      <div className="track_info_container">
        <h3>Track Information</h3>
        <h4>{props.data.name}</h4>
        <p>{props.data.description}</p>
        <ul>
          {props.trackingTags.map((tag, i) => {
            return <li key={i}>{tag}</li>;
          })}
        </ul>
        <img src={props.data.previewImage} alt="Track Preview" />
      </div>
    </>
  );
}
