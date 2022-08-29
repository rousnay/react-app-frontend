===================================
Object.keys(userData).map((key, idx) => <p key={idx}>{userData[key]}</p>);
===================================
const LoginRightContainer = {
  backgroundImage: `url( ${TreadmillBg} )`,
  height: "100%",
  width: "100%",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

====================================
paper: {
  margin: theme.spacing(8, 4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
},
avatar: {
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
},
form: {
  width: "100%",
  marginTop: theme.spacing(1),
},
submit: {
  margin: theme.spacing(3, 0, 2),
},
===================================
// get FormData values
  for (const pair of payloadData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  for (const value of payloadData.values()) {
    console.log(value);
  }
==================================\
swal("Success", response.message, "success", {
  title: "Sweet!",
  text: "Modal with a custom image.",
  imageUrl: "https://unsplash.it/400/200",
  imageWidth: 400,
  imageHeight: 200,
  imageAlt: "Custom image",
});


=========================

var Draw = new MapboxDraw();
map.addControl(Draw, 'bottom-left');


document.getElementById('button').onclick = function () {
  draw.changeMode('draw_polygon');

}

=========================
  (async () => {
    if (userData) {
      const { default: PrivetStyles } = await import(
        "../assets/PrivetStyles.css"
      );
    } else {
      const { default: PrivetStyles } = await import(
        "../assets/PublicStyles.css"
      );
    }
  })();

  =========================
  const getPointId = (pin) => {
    return geoJSONPoint.features[pin].id;
  };

  const pinSelector = (pin) => {
    const allPinItem = document.querySelectorAll(".newclass");
    allPinItem.forEach((box) => {
      box.classList.remove("myStyle");
    });

    document.querySelector(`.currentPin-${pin}`).classList.add("myStyle");
  };

  const getPinIndex = (lonLat) => {
    return geoJSONPoint.features.findIndex(
      (topic) => topic.geometry.coordinates === lonLat
    );
  };

  const markerClickHandler = (e, coords) => {
    const pinIndex = getPinIndex(coords);
    const pinId = getPointId(pinIndex);
    pinSelector(pinIndex + 1);
    console.log(pinIndex + 1, pinId);
  };

  ====================================


  console.log("__________s_________");
  getLocalGeoJSONPointData.features.forEach((box, i) => {
    console.log(i + 1, box.id.slice(-7), box.geometry.coordinates[1]);
  });
  console.log(pinNumber, pinId.slice(-7));
  console.log(newCurrentData);
  console.log(coords[1]);
  console.log(pinIndex);
  console.log(getLocalGeoJSONPointData.features[pinIndex].id.slice(-7));
  console.log(
    getLocalGeoJSONPointData.features[pinIndex].geometry.coordinates[1]
  );
  console.log("__________e_________");


  const initPointMarkerLocal = (
    <Marker
      longitude={theMiddleCoordinates[0]}
      latitude={theMiddleCoordinates[1]}
      onClick={(event) => markerClickHandler(event, theMiddleCoordinates)}
      // draggable
      // onDragEnd={onDragEnd}
    >
      <PinPoint ids={1} />
    </Marker>
  );

  const [pointMarkerLocal, setPointMarkerLocal] =
    useState(initPointMarkerLocal);

  useEffect(() => {
    // geoJSONPoint
    console.log("data update");
    setPointMarkerLocal(
      geoJSONPoint.features
        .map((features, i) => features.geometry.coordinates)
        .map((lngLat, index) => (
          <Marker
            key={index}
            longitude={lngLat[0]}
            latitude={lngLat[1]}
            onClick={(event) => markerClickHandler(event, lngLat)}
            // draggable
            // onDragEnd={onDragEnd}
          >
            <PinPoint ids={index + 1} />
          </Marker>
        ))
    );
  }, [geoJSONPoint]);