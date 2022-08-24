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